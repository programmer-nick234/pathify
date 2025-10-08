import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAz0VpCs-yPNzdPTOofMvrsDU-Q8YX-UiA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "pathify-6619e.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "pathify-6619e",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "pathify-6619e.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "225023326555",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:225023326555:web:794ecf3b4c30a02d43827e",
};

// Initialize Firebase
let app: FirebaseApp | null;
let auth: Auth | null;
let db: Firestore | null;
let storage: FirebaseStorage | null;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  console.log('🔥 Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
  // Provide fallback values for development
  app = null;
  auth = null;
  db = null;
  storage = null;
}

// Production-ready error handling
export const isFirebaseConnected = () => {
  return app !== null && db !== null;
};

export const getFirebaseError = () => {
  if (!app) return 'Firebase app not initialized';
  if (!db) return 'Firestore not available';
  return null;
};

export { auth, db, storage };
export default app;
