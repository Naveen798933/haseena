# A Little World Called Haseena ❤️

A cinematic, luxury romantic proposal website and digital love letter dedicated to **Haseena**.

Crafted with deep emotional care, poetic storytelling, editorial typography, golden particle physics, interactive rose petals, custom romantic piano music, and a full-stack Firebase backend with an admin dashboard.

---

## ✨ Features & Cinematic Journey

### 1. Introduction Experience (The Gateway)
- Fullscreen cinematic opening screen with deep burgundy vignette and glowing center aura.
- Floating golden dust and rose petals.
- Pulsing romantic heart emblem.
- Gentle quote reveals:
  > *"Some people enter our lives unexpectedly..."*  
  > *"Somehow, they make ordinary moments feel extraordinary."*
- Golden glowing CTA: **"ENTER MY LITTLE WORLD"**.
- Unlocks the romantic background audio and smoothly dissolves into the main experience.

### 2. Hero Section
- Monumental typography: **HASEENA** with gold foil shimmer and staggered letter animations.
- Subtitle: *"Six moments. One beautiful soul."*
- Ambient lighting effects, delicate filigree divider, and custom luxury scroll indicator.

### 3. Six Personal Photographs Gallery
- Six dedicated photograph slots with individual emotional captions:
  - `01 — A beautiful smile.`
  - `02 — A moment worth remembering.`
  - `03 — A little piece of happiness.`
  - `04 — An unforgettable feeling.`
  - `05 — Something truly special.`
  - `06 — Simply, Haseena.`
- Interactive 3D tilt physics on desktop hover.
- Golden filigree frame accents and smooth zoom animations.
- Click-to-expand fullscreen Lightbox with previous/next navigation, keyboard arrow support (`←`, `→`, `ESC`), and zoom toggle.
- Pre-populated with romantic aesthetic placeholders until real photographs are uploaded via the Admin Dashboard.

### 4. Our Little Story (Scrolling Storyline)
- Vertical illuminated golden timeline spine with Roman numeral nodes (`I` through `VII`).
- Seven scroll-triggered emotional sentence reveals:
  1. *"Sometimes, you meet someone without planning to."*
  2. *"And slowly, without even realizing it..."*
  3. *"Ordinary moments begin to feel extraordinary."*
  4. *"A simple smile can make your entire day better."*
  5. *"Some people have a beautiful way of making the world feel different."*
  6. *"Maybe I don't have perfect words to explain it..."*
  7. *"But I wanted you to know that you've become someone special to me."*

### 5. The Secret Letter
- Royal wax-sealed digital burgundy envelope engraved with the golden initial **"H"**.
- Click to break the seal: smooth envelope unfolding animation.
- Parchment paper texture (`#FFF8F0`) with ornate gold borders, corner flourishes (`❧`), and calligraphic handwriting typography.
- Heartfelt message crafted to bring a genuine smile to Haseena's face without pressure.
- Option to re-fold back into the sealed envelope.

### 6. The Final Surprise (The Proposal Reveal)
- Deep burgundy background with radiant champagne light halos and 3D glowing heart animation.
- Prelude: *"Haseena, there's something I've been meaning to tell you..."*
- Question Reveal: *"Would you be open to making a few beautiful memories together?"*
- Two choices:
  - ❤️ **"I'd love to"**: triggers a golden & rose petal confetti burst, revealing *"Maybe this is the beginning of something beautiful. ❤️"* and automatically logs her answer to the Admin Dashboard!
  - 🤍 **"I'd like some time"**: gentle, caring response *"Of course. Take all the time you need. Your happiness matters."* with zero guilt or pressure.
- Replay option to experience the moment again.

### 7. Background Music & Piano Synthesizer
- Built-in Web Audio API romantic piano synthesizer playing an ethereal, delicate Chopin-inspired piano nocturne in loop.
- Supports uploading custom MP3 romantic audio files via the Admin Dashboard.
- Floating glassmorphism music pill with play/pause, volume slider popover, and animated equalizer bars.
- Honors browser autoplay policies (starts softly when she clicks "ENTER MY LITTLE WORLD").

### 8. Full Admin Dashboard (`/admin`)
- Accessible by clicking the subtle lock icon in the navbar/footer or navigating to `/admin`.
- Overview: View Haseena's proposal responses with timestamp and choice!
- Photo Gallery Manager: Replace any of the 6 photos, edit captions & subtitles, and reorder slots with "Move Up" / "Move Down" controls.
- Content Editor: Edit all website text (Titles, Quotes, 7 Story sentences, Secret Letter, Proposal questions & responses).
- Music & Audio Manager: Toggle music, edit song title/artist, and upload MP3 files with progress bar.
- Theme Customizer: Customize Burgundy, Wine, Champagne, Blush, and Ivory colors, and adjust falling petal density.
- Firebase Setup Guide: Built-in instructions and copyable security rules.

---

## 🎨 Color Palette & Typography

| Color | Hex | Role |
| :--- | :--- | :--- |
| **Deep Burgundy** | `#3B0A1E` | Primary atmospheric background |
| **Wine Red** | `#64152D` | Romantic buttons, accents & envelope |
| **Champagne Gold** | `#D6B779` | Luxury headings, borders & particles |
| **Soft Blush Pink** | `#F4DCE2` | Delicate petal highlights & glows |
| **Warm Ivory** | `#FFF8F0` | Letter parchment paper & readable text |

- **Headings & Name:** *Cormorant Garamond* & *Cinzel*
- **Digital Love Letter:** *Great Vibes* (Calligraphic cursive)
- **Body & Captions:** *Montserrat* / *Inter*

---

## 🚀 Getting Started

### 1. Local Development
```bash
# Clone or navigate into the repository
cd Haseena

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Firebase Configuration (Optional but Recommended)

The website works immediately out of the box in **Local Storage Mode** if Firebase is not yet configured. All edits and photo uploads are cached locally.

When you are ready to connect your live Firebase project:

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** &rarr; **Email/Password**.
3. Create your admin user under the **Users** tab (e.g. `admin@haseena.love`).
4. Enable **Cloud Firestore** and paste the rules from `firestore.rules`.
5. Enable **Firebase Storage** and paste the rules from `storage.rules`.
6. Copy your Firebase Web App configuration keys into `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

7. Rebuild or restart the server (`npm run dev`). The Admin Dashboard will instantly show **"Firebase Active"**!

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. In **Environment Variables**, add the `VITE_FIREBASE_*` variables from your `.env` file (if using Firebase).
5. Click **Deploy**. Vercel will build and launch the site with full client-side routing configured via `vercel.json`!

---

## ❤️ Dedicated to Haseena
Crafted with tenderness, elegance, and pure romantic emotion.
