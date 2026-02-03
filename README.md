# CA Firm Website - PD Gupta & CO

A fully responsive, SEO-optimized, and dynamically updatable website for a Chartered Accountant firm. Built with Next.js 14 and Firebase Firestore for content management.

## 🚀 Features

- **Fully Responsive Design** - Works seamlessly on all devices
- **Firebase Integration** - Content managed via Firestore database
- **Admin Dashboard** - Edit content without redeployment
- **SEO Optimized** - Server-side rendering with metadata
- **Professional Design** - Corporate color scheme with smooth animations
- **Blog System** - Dynamic blog with individual post pages
- **Contact Form** - Messages stored in Firestore
- **Secure Authentication** - Firebase Auth for admin access

## 📋 Pages

### Public Pages
- **Home (/)** - Hero section, featured services, testimonials
- **Services (/services)** - Detailed service offerings
- **About (/about)** - Company info, vision, mission, team profiles
- **Contact (/contact)** - Contact form and office details
- **Blog (/blog)** - Blog listing and individual posts

### Admin Pages
- **Admin Login (/admin/login)** - Secure authentication
- **Dashboard (/admin)** - Overview and quick actions
- **Home Editor (/admin/home)** - Edit homepage content
- **Services Editor (/admin/services)** - Manage services
- **About Editor (/admin/about)** - Update company info
- **Blog Manager (/admin/blog)** - Create and edit blog posts
- **Contact Messages (/admin/contacts)** - View form submissions

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Deployment:** Vercel-ready

## 📦 Installation

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Set up Firebase:**
   - Create a Firebase project at [https://firebase.google.com](https://firebase.google.com)
   - Enable Firestore Database
   - Enable Authentication (Email/Password)
   - Copy your Firebase config

3. **Configure environment variables:**
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@sharmaassociates.in
```

4. **Run development server:**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 🔐 Firebase Setup

### 1. Create Admin User
In Firebase Console > Authentication > Users, add a user with email/password.

### 2. Firestore Collections Structure

```
siteContent/
  ├── home
  ├── about
  ├── services
  ├── testimonials
  └── footer

blogs/
  └── {slug}
      ├── title
      ├── content
      ├── summary
      ├── image
      ├── author
      └── createdAt

contacts/
  └── {auto-id}
      ├── name
      ├── email
      ├── phone
      ├── message
      ├── status
      └── createdAt
```

### 3. Security Rules

Add these Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access
    match /{document=**} {
      allow read: if true;
    }
    
    // Admin write access only
    match /siteContent/{doc} {
      allow write: if request.auth != null && 
        request.auth.token.email == "admin@sharmaassociates.in";
    }
    
    match /blogs/{doc} {
      allow write: if request.auth != null && 
        request.auth.token.email == "admin@sharmaassociates.in";
    }
    
    // Anyone can write to contacts (form submissions)
    match /contacts/{doc} {
      allow create: if true;
      allow update, delete: if request.auth != null && 
        request.auth.token.email == "admin@sharmaassociates.in";
    }
  }
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
- Primary colors (navy blue)
- Gold accent colors
- Gradient combinations

### Content
All content has fallback defaults in `lib/defaultContent.js`. Update Firestore or edit this file for initial content.

### Images
- Replace logo placeholder in Navbar component
- Update team member images in Firestore
- Use Unsplash or upload to Firebase Storage

## 🚀 Deployment

### Deploy to Vercel (Easiest)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy to Hostinger VPS (Production)

**Complete deployment guide available in:** [HOSTINGER_VPS_DEPLOYMENT.md](./HOSTINGER_VPS_DEPLOYMENT.md)

#### Quick Deploy Steps:

1. **Get Firebase Credentials:**
   - See [GET_FIREBASE_CREDENTIALS.md](./GET_FIREBASE_CREDENTIALS.md) for detailed instructions

2. **Connect to VPS:**
   ```bash
   ssh root@your-server-ip
   cd /var/www/pd_gupta/pd_gupta
   ```

3. **Setup Environment:**
   ```bash
   cp .env.production.example .env.production
   nano .env.production  # Add your Firebase credentials
   chmod 600 .env.production
   ```

4. **Build and Deploy:**
   ```bash
   npm install
   npm run build
   pm2 start ecosystem.config.js
   pm2 save
   ```

5. **Verify:**
   ```bash
   pm2 status
   pm2 logs pd-gupta-website
   ```

#### Deploy Documentation:
- 📘 [Complete VPS Deployment Guide](./HOSTINGER_VPS_DEPLOYMENT.md)
- 📋 [Pre-Deployment Checklist](./PRE_DEPLOYMENT_CHECKLIST.md)
- ⚡ [Quick Reference Commands](./DEPLOY_QUICK_REFERENCE.md)
- 📝 [Deployment Summary](./DEPLOYMENT_SUMMARY.md)
- 🔑 [Get Firebase Credentials](./GET_FIREBASE_CREDENTIALS.md)

#### Build Commands:
```bash
npm run build  # Build for production
npm start      # Start production server (requires build)
npm run dev    # Development server (NOT for production)
```

### Common Deployment Issues

**Firebase Invalid API Key Error:**
- Ensure `.env.production` exists with valid Firebase credentials
- Rebuild after adding credentials: `npm run build`
- Restart: `pm2 restart pd-gupta-website`

**Missing Build Error:**
- Always run `npm run build` before starting production server
- Use PM2 for production (not `npm run dev`)

**Port Already in Use:**
```bash
lsof -ti:3000 | xargs kill -9  # Kill process on port 3000
pm2 restart pd-gupta-website
```

## 📝 Usage

### Admin Access
1. Navigate to `/admin/login`
2. Login with admin credentials
3. Edit content from dashboard
4. Changes reflect immediately (60s revalidation)

### Adding Blog Posts
1. Go to `/admin/blog`
2. Click "New Post"
3. Fill in title, slug, content (HTML)
4. Save and view on `/blog`

### Managing Contact Messages
1. View submissions at `/admin/contacts`
2. Mark as read when addressed
3. Contact details visible with timestamps

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is created for PD Gupta & CO. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: gupta.k.deepak@gmail.com
- Phone: +91 7303082229

---

**© 2026 PD Gupta & CO. All rights reserved.**
# pd_gupta
