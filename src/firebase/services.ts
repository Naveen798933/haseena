import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  serverTimestamp
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { auth, db, storage, isFirebaseConfigured } from './config';
import { SiteContent, AdminUser } from '../types';
import { DEFAULT_CONTENT } from '../data/defaultContent';

const STORAGE_KEY = 'haseena_site_content_v1';
const RESPONSES_KEY = 'haseena_proposal_responses_v1';
const LOCAL_ADMIN_KEY = 'haseena_local_admin_session';

/**
 * Load the website content from Firestore or LocalStorage or Default
 */
export async function getSiteContent(): Promise<SiteContent> {
  // If Firebase is configured, attempt to read from Firestore
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'content', 'current');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteContent;
        // Merge with defaults to ensure all fields are present
        return { ...DEFAULT_CONTENT, ...data };
      }
    } catch (err) {
      console.warn("Could not load from Firestore, falling back to local storage:", err);
    }
  }

  // Fallback to localStorage
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    if (local) {
      const parsed = JSON.parse(local);
      return { ...DEFAULT_CONTENT, ...parsed };
    }
  } catch (e) {
    console.error("Error reading localStorage:", e);
  }

  return DEFAULT_CONTENT;
}

/**
 * Save site content to Firestore and/or LocalStorage
 */
export async function saveSiteContent(content: SiteContent): Promise<void> {
  // Always update local cache
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch (e) {
    console.error("Error saving to localStorage:", e);
  }

  // If Firebase is configured, update Firestore
  if (isFirebaseConfigured && db) {
    const docRef = doc(db, 'content', 'current');
    await setDoc(docRef, {
      ...content,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }
}

/**
 * Upload a photo file to Firebase Storage (or convert to base64 DataURL if offline)
 */
export async function uploadPhoto(
  file: File,
  photoId: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  if (isFirebaseConfigured && storage) {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storageRef = ref(storage, `photos/${photoId}_${timestamp}_${cleanName}`);
    
    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          console.error("Storage upload error:", error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  }

  // Local fallback: Convert to Data URL
  return new Promise((resolve, reject) => {
    if (onProgress) onProgress(30);
    const reader = new FileReader();
    reader.onload = () => {
      if (onProgress) onProgress(100);
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload custom music file to Firebase Storage (or Data URL fallback)
 */
export async function uploadMusic(
  file: File,
  onProgress?: (progress: number) => void
): Promise<string> {
  if (isFirebaseConfigured && storage) {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const storageRef = ref(storage, `audio/music_${timestamp}_${cleanName}`);

    return new Promise((resolve, reject) => {
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(Math.round(progress));
        },
        (error) => {
          console.error("Music upload error:", error);
          reject(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        }
      );
    });
  }

  // Local fallback: Convert to Data URL
  return new Promise((resolve, reject) => {
    if (onProgress) onProgress(30);
    const reader = new FileReader();
    reader.onload = () => {
      if (onProgress) onProgress(100);
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Record Haseena's response to the proposal
 */
export async function recordProposalResponse(choice: 'yes' | 'need_time'): Promise<void> {
  const record = {
    choice,
    timestamp: new Date().toISOString(),
    formattedDate: new Date().toLocaleString()
  };

  // Save to local storage
  try {
    const existing = JSON.parse(localStorage.getItem(RESPONSES_KEY) || '[]');
    existing.unshift(record);
    localStorage.setItem(RESPONSES_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error("Error saving local response:", e);
  }

  // If Firebase is configured, record to Firestore
  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, 'proposalResponses'), {
        ...record,
        createdAt: serverTimestamp()
      });
    } catch (e) {
      console.warn("Could not write proposal response to Firestore:", e);
    }
  }
}

/**
 * Get logged proposal responses for the Admin Dashboard
 */
export async function getProposalResponses(): Promise<{ choice: 'yes' | 'need_time'; timestamp: string; formattedDate?: string }[]> {
  try {
    const existing = localStorage.getItem(RESPONSES_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch {
    return [];
  }
}

/**
 * Admin Authentication
 */
export async function loginAdmin(email: string, pass: string): Promise<AdminUser> {
  if (isFirebaseConfigured && auth) {
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    return {
      email: cred.user.email || email,
      uid: cred.user.uid
    };
  }

  // Local Admin Demo mode: Accept default admin credentials
  // Allows testing out of the box when Firebase credentials have not been configured yet
  if ((email === 'admin@haseena.love' || email === 'admin@gmail.com' || email.includes('@')) && pass.length >= 6) {
    const mockUser: AdminUser = { email, uid: 'local-admin-uid' };
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(mockUser));
    return mockUser;
  }

  throw new Error("Invalid admin credentials. (In local preview mode, enter any valid email and a 6+ character password)");
}

export async function logoutAdmin(): Promise<void> {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(LOCAL_ADMIN_KEY);
}

export function subscribeToAuthState(callback: (user: AdminUser | null) => void) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        callback({
          email: firebaseUser.email || '',
          uid: firebaseUser.uid
        });
      } else {
        callback(null);
      }
    });
  }

  // Local fallback
  const checkLocal = () => {
    try {
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      callback(stored ? JSON.parse(stored) : null);
    } catch {
      callback(null);
    }
  };
  checkLocal();

  window.addEventListener('storage', checkLocal);
  return () => window.removeEventListener('storage', checkLocal);
}
