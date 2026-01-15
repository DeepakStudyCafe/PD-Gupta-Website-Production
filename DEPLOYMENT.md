# Deployment Guide - Vercel

## Prerequisites
- GitHub/GitLab/Bitbucket account
- Vercel account (sign up at vercel.com)
- Firebase project configured

## Step-by-Step Deployment

### 1. Push Code to Git Repository

```bash
cd "c:\Users\SAGAR GUPTA\OneDrive\Desktop\New folder"
git init
git add .
git commit -m "Initial commit: CA firm website"
git branch -M main
git remote add origin <your-git-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next

#### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel login
vercel
```

### 3. Configure Environment Variables

In Vercel Dashboard > Project Settings > Environment Variables, add:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_ADMIN_EMAIL=admin@sharmaassociates.in
```

**Important:** Add these for all environments (Production, Preview, Development)

### 4. Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click on latest deployment
3. Click "Redeploy" button

### 5. Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain (e.g., sharmaassociates.in)
3. Configure DNS records as instructed:
   - Type: A or CNAME
   - Value: Provided by Vercel
4. Wait for DNS propagation (can take 24-48 hours)

### 6. Verify Deployment

Visit your deployed URL and verify:
- ✅ Homepage loads correctly
- ✅ All pages accessible
- ✅ Firebase connection working
- ✅ Admin login functional
- ✅ Content editing saves to Firestore

## Firebase Configuration for Production

### Update Firebase Console

1. **Authentication > Settings > Authorized Domains**
   - Add your Vercel domain: `your-project.vercel.app`
   - Add custom domain if configured

2. **Firestore Database > Rules**
   - Deploy production rules from `firestore.rules`

## Performance Optimization

Vercel automatically provides:
- ✅ CDN distribution
- ✅ Automatic HTTPS
- ✅ Edge functions
- ✅ Image optimization
- ✅ ISR (Incremental Static Regeneration)

## Monitoring

Access analytics in Vercel Dashboard:
- Page views and traffic
- Function execution times
- Build logs and errors
- Performance insights

## Continuous Deployment

Automatic deployment on:
- Push to `main` branch → Production
- Pull requests → Preview deployments
- Other branches → Preview deployments

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies in package.json
- Ensure environment variables are set

### Firebase Connection Issues
- Verify environment variables are correct
- Check Firebase authorized domains
- Review Firestore security rules

### Admin Login Not Working
- Confirm admin user created in Firebase Auth
- Verify NEXT_PUBLIC_ADMIN_EMAIL matches user email
- Check browser console for errors

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Firebase Documentation: https://firebase.google.com/docs

---

**Your website will be live at:** `https://your-project.vercel.app`
