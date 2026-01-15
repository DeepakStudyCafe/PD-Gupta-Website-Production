// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Validate required environment variables
const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required Firebase environment variables:', missingVars);
  if (typeof window === 'undefined') {
    // Server-side: throw error only in production
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing Firebase configuration: ${missingVars.join(', ')}`);
    }
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
};

// Initialize Firebase only if we have valid config
let app;
let db = null;
let auth = null;

try {
  if (!getApps().length && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
  } else if (getApps().length) {
    app = getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
  } else {
    console.warn('Firebase not initialized: Missing configuration');
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  if (process.env.NODE_ENV === 'production') {
    throw error;
  }
}

export { db, auth };
export default app;
