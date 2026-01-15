# How to Get Your Firebase Credentials

Follow these steps to get your Firebase credentials for the `.env.production` file.

## Step 1: Go to Firebase Console

Open your browser and navigate to:
👉 **https://console.firebase.google.com/**

## Step 2: Select Your Project

- Click on your project (e.g., "ca-portfolio-e7592" or your project name)
- If you don't have a project, click **"Add project"** to create one

## Step 3: Access Project Settings

1. Click the **⚙️ (gear icon)** next to "Project Overview" in the left sidebar
2. Click **"Project settings"**

## Step 4: Get Your Credentials

### Find Your Credentials:

Scroll down to **"Your apps"** section, you should see a web app icon `</>`.

If you don't see any app:
1. Click **"Add app"** button
2. Select the **Web** icon `</>`
3. Give it a nickname (e.g., "PD Gupta Website")
4. Click **"Register app"**

### Copy the Configuration:

You'll see something like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDOkwfpDOKQBOqrU7XBLRKCZNhAiQkCpCg",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

## Step 5: Fill Your .env.production File

Take each value from Firebase and add it to your `.env.production` file:

```env
# Copy the apiKey value
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDOkwfpDOKQBOqrU7XBLRKCZNhAiQkCpCg

# Copy the authDomain value
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com

# Copy the projectId value
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# Copy the storageBucket value
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com

# Copy the messagingSenderId value
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012

# Copy the appId value
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

# Add your admin email
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com

# Environment
NODE_ENV=production
```

## Step 6: Verify Your Setup

### Check Firestore:
1. In Firebase Console, click **"Firestore Database"** in left sidebar
2. Make sure you have created a database
3. If not, click **"Create database"**
   - Select **"Start in production mode"** or **"Start in test mode"**
   - Choose a location close to your server
   - Click **"Enable"**

### Check Authentication:
1. Click **"Authentication"** in left sidebar
2. Go to **"Sign-in method"** tab
3. Enable **"Email/Password"** provider
4. Click **"Save"**

### Check Security Rules:
1. In **"Firestore Database"**, click the **"Rules"** tab
2. Make sure you have proper rules set (see `firestore.rules` file in project)
3. Click **"Publish"** if you made changes

## Important Notes

⚠️ **Security:**
- Never share your Firebase credentials publicly
- Never commit `.env.production` to Git
- Keep your API keys secure

✅ **What's Safe to Share:**
- The `NEXT_PUBLIC_` prefixed variables are safe to expose in client-side code
- These are meant to be public (they identify your Firebase project)
- Real security comes from Firebase Security Rules, not hiding these keys

🔒 **Real Security:**
- Configure proper Firestore Security Rules
- Enable Firebase App Check (optional, but recommended for production)
- Restrict API key usage in Firebase Console (optional)

## Troubleshooting

### "Invalid API Key" Error:
- Double-check you copied the entire API key (no spaces or missing characters)
- Make sure you're using credentials from the correct Firebase project
- Verify the API key is enabled in Firebase Console

### Can't Find Configuration:
- Make sure you've created a web app in Firebase Console
- Go to Project Settings > Your apps
- If no apps exist, click "Add app" and select Web

### Authentication Not Working:
- Enable Email/Password authentication in Firebase Console
- Check that your Security Rules allow the operations you need
- Verify the authDomain matches your Firebase project

## Quick Check

Your credentials are correct if:
- ✅ `apiKey` starts with "AIza..."
- ✅ `authDomain` ends with ".firebaseapp.com"
- ✅ `projectId` matches your Firebase project name
- ✅ `storageBucket` ends with ".appspot.com"
- ✅ `messagingSenderId` is a number
- ✅ `appId` starts with "1:" and contains ":web:"

## Example Valid Credentials

Here's what valid credentials look like (NOT for actual use):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDOkwfpDOKQBOqrU7XBLRKCZNhAiQkCpCg
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-project-abc123.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-project-abc123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-project-abc123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:a1b2c3d4e5f6g7h8i9j0
NEXT_PUBLIC_ADMIN_EMAIL=admin@mydomain.com
NODE_ENV=production
```

---

**After getting your credentials, add them to `.env.production` on your VPS and rebuild your application!**

```bash
nano .env.production  # Paste your credentials
chmod 600 .env.production  # Secure the file
npm run build  # Rebuild with new credentials
pm2 restart pd-gupta-website  # Restart application
```
