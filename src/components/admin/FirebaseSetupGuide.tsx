import React from 'react';
import { isFirebaseConfigured } from '../../firebase/config';
import { Shield, Key, Database, HardDrive, CheckCircle2, AlertTriangle, ExternalLink, Copy } from 'lucide-react';

export const FirebaseSetupGuide: React.FC = () => {
  const [copied, setCopied] = React.useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Current Connection Status Box */}
      <div className={`p-6 rounded-2xl border ${
        isFirebaseConfigured
          ? 'bg-emerald-950/40 border-emerald-500/40'
          : 'bg-amber-950/40 border-amber-500/40'
      }`}>
        <div className="flex items-start gap-4">
          {isFirebaseConfigured ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
          )}

          <div>
            <h4 className="font-serif text-xl text-ivory">
              {isFirebaseConfigured
                ? 'Firebase Backend is Active and Connected'
                : 'Running in Local / Offline Preview Mode'}
            </h4>
            <p className="text-xs text-ivory/70 mt-1 leading-relaxed">
              {isFirebaseConfigured
                ? 'All website content edits, photos, and music are stored directly in your Firebase Cloud Firestore and Firebase Storage.'
                : 'Real Firebase credentials have not been detected in your .env file yet. The website is currently storing edits locally in browser storage so you can test all features immediately without any setup! Follow the steps below whenever you wish to hook up your real Firebase project.'}
            </p>
          </div>
        </div>
      </div>

      {/* Setup Steps Card */}
      <div className="p-6 rounded-2xl bg-burgundy-900/60 border border-champagne/30 shadow-xl space-y-6">
        <div className="flex items-center gap-2 text-champagne border-b border-champagne/20 pb-4">
          <Shield className="w-5 h-5" />
          <h4 className="font-serif text-xl text-ivory">Step-by-Step Firebase Setup Instructions</h4>
        </div>

        <div className="space-y-6 text-xs sm:text-sm text-ivory/80 leading-relaxed font-light">
          {/* Step 1 */}
          <div className="flex gap-4">
            <span className="w-7 h-7 rounded-full bg-wine border border-champagne/40 flex items-center justify-center text-champagne font-mono font-bold shrink-0">
              1
            </span>
            <div className="space-y-2 flex-1">
              <h5 className="font-medium text-ivory text-base font-serif">
                Create a Firebase Project
              </h5>
              <p>
                Visit the <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-champagne underline inline-flex items-center gap-1">Firebase Console <ExternalLink className="w-3 h-3" /></a> and click <strong>&quot;Add project&quot;</strong>. Name it <em>&quot;A Little World Called Haseena&quot;</em>.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <span className="w-7 h-7 rounded-full bg-wine border border-champagne/40 flex items-center justify-center text-champagne font-mono font-bold shrink-0">
              2
            </span>
            <div className="space-y-2 flex-1">
              <h5 className="font-medium text-ivory text-base font-serif">
                Enable Authentication
              </h5>
              <p>
                In the Firebase Console sidebar, go to <strong>Build &rarr; Authentication</strong>. Click <strong>Get Started</strong>, choose the <strong>Email/Password</strong> sign-in provider, and toggle <strong>Enable</strong>.
              </p>
              <p>
                Under the <strong>Users</strong> tab, click <strong>Add user</strong> to create your master admin account with an email (e.g. <code>admin@haseena.love</code>) and a secure password.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <span className="w-7 h-7 rounded-full bg-wine border border-champagne/40 flex items-center justify-center text-champagne font-mono font-bold shrink-0">
              3
            </span>
            <div className="space-y-2 flex-1">
              <h5 className="font-medium text-ivory text-base font-serif">
                Enable Cloud Firestore & Apply Rules
              </h5>
              <p>
                Go to <strong>Build &rarr; Firestore Database</strong> &rarr; <strong>Create Database</strong>. Choose your nearest region (e.g. <code>us-central1</code> or <code>asia-south1</code>).
              </p>
              <p>
                In the <strong>Rules</strong> tab, paste the rules from <code>firestore.rules</code>:
              </p>
              <div className="relative p-3 rounded-xl bg-burgundy-950 font-mono text-[11px] text-champagne/90 overflow-x-auto">
                <button
                  onClick={() => handleCopy(`rules_version = '2';\nservice cloud.firestore {\n  match /databases/{database}/documents {\n    match /content/{docId} {\n      allow read: if true;\n      allow write: if request.auth != null;\n    }\n    match /proposalResponses/{responseId} {\n      allow create: if true;\n      allow read, delete: if request.auth != null;\n    }\n    match /{document=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}`, 'firestore')}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-burgundy-900 border border-champagne/30 text-champagne hover:bg-wine text-xs flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copied === 'firestore' ? 'Copied!' : 'Copy Rules'}
                </button>
                <pre>{`match /content/{docId} {
  allow read: if true;
  allow write: if request.auth != null;
}`}</pre>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <span className="w-7 h-7 rounded-full bg-wine border border-champagne/40 flex items-center justify-center text-champagne font-mono font-bold shrink-0">
              4
            </span>
            <div className="space-y-2 flex-1">
              <h5 className="font-medium text-ivory text-base font-serif">
                Enable Firebase Storage & Apply Rules
              </h5>
              <p>
                Go to <strong>Build &rarr; Storage</strong> &rarr; <strong>Get Started</strong>. Under the <strong>Rules</strong> tab, paste the rules from <code>storage.rules</code>.
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4">
            <span className="w-7 h-7 rounded-full bg-wine border border-champagne/40 flex items-center justify-center text-champagne font-mono font-bold shrink-0">
              5
            </span>
            <div className="space-y-2 flex-1">
              <h5 className="font-medium text-ivory text-base font-serif">
                Add Credentials to .env
              </h5>
              <p>
                In <strong>Project Settings &rarr; General</strong>, scroll down to <strong>Your apps</strong>, click <strong>&lt;/&gt; (Web)</strong>, register your app, and copy the config values into your local <code>.env</code> file:
              </p>
              <div className="p-3 rounded-xl bg-burgundy-950 font-mono text-[11px] text-champagne/90">
                <pre>{`VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-app
VITE_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456...
VITE_FIREBASE_APP_ID=1:123456...`}</pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
