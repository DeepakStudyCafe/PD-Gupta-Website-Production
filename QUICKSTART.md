# Quick Start Guide

Get your CA firm website running in minutes!

## 📦 Step 1: Install Dependencies

Open terminal in project folder and run:

```bash
npm install
```

## 🔥 Step 2: Set Up Firebase

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add Project"
3. Name it: "Sharma Associates" (or your firm name)
4. Follow the setup wizard

### Enable Services

#### Firestore Database
1. In Firebase Console, go to **Firestore Database**
2. Click "Create Database"
3. Start in **Production Mode**
4. Choose your location (closest to your users)

#### Authentication
1. Go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
3. Click "Save"

### Get Firebase Config

1. In Project Settings (gear icon) > Project settings
2. Scroll to "Your apps" section
3. Click Web icon (</>) to register a web app
4. Copy the firebaseConfig object

## 🔐 Step 3: Configure Environment

1. Copy `.env.local.example` to `.env.local`:
```bash
Copy-Item .env.local.example .env.local
```

2. Edit `.env.local` and paste your Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
NEXT_PUBLIC_ADMIN_EMAIL=admin@sharmaassociates.in
```

## 👤 Step 4: Create Admin User

1. In Firebase Console > **Authentication** > **Users**
2. Click "Add User"
3. Email: `admin@sharmaassociates.in` (must match .env.local)
4. Password: Choose a secure password
5. Click "Add User"

## 🔒 Step 5: Set Security Rules

1. In Firebase Console > **Firestore Database** > **Rules**
2. Copy content from `firestore.rules` file
3. Paste and click "Publish"

## ▶️ Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser!

## ✅ Step 7: Test Everything

### Test Public Website
- Visit homepage: http://localhost:3000
- Check all pages: Services, About, Contact, Blog
- Submit contact form

### Test Admin Dashboard
1. Go to http://localhost:3000/admin/login
2. Login with admin credentials
3. Edit home page content
4. Create a test blog post
5. Check contact messages

## 🎨 Step 8: Customize Content

### Via Admin Dashboard (Recommended)
1. Login to `/admin`
2. Edit each section through the UI
3. Changes save to Firestore automatically

### Via Code (Optional)
Edit `lib/defaultContent.js` for fallback content

## 🚀 Step 9: Deploy to Vercel

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy:
```bash
npm i -g vercel
vercel
```

## 📝 Common Issues

### "Firebase not configured"
- Check `.env.local` file exists
- Verify all Firebase variables are set
- Restart dev server after changing .env.local

### "Login failed"
- Verify admin user created in Firebase Auth
- Check email matches NEXT_PUBLIC_ADMIN_EMAIL
- Ensure Email/Password auth is enabled

### "Permission denied" in Firestore
- Deploy security rules from firestore.rules
- Check admin email in rules matches your config

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

## 🆘 Need Help?

Check these files:
- [README.md](README.md) - Complete documentation
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase data structure
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide

## 🎉 You're Ready!

Your CA firm website is now running with:
- ✅ Responsive design
- ✅ Dynamic content from Firebase
- ✅ Secure admin dashboard
- ✅ Blog system
- ✅ Contact forms
- ✅ SEO optimization

Start customizing and make it yours! 🚀
