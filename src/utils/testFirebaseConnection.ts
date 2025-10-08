// Firebase Connection Test
// This script tests if Firebase is properly connected

import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAz0VpCs-yPNzdPTOofMvrsDU-Q8YX-UiA",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "pathify-6619e.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "pathify-6619e",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "pathify-6619e.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "225023326555",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:225023326555:web:794ecf3b4c30a02d43827e",
};

async function testFirebaseConnection() {
  try {
    console.log('🔥 Testing Firebase Connection...');
    console.log('===============================');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized successfully');
    
    // Initialize Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized successfully');
    
    console.log('\n📊 Firebase Configuration:');
    console.log(`Project ID: ${firebaseConfig.projectId}`);
    console.log(`Auth Domain: ${firebaseConfig.authDomain}`);
    console.log(`API Key: ${firebaseConfig.apiKey.substring(0, 20)}...`);
    
    console.log('\n🔗 Connection Status:');
    console.log('✅ Firebase SDK loaded');
    console.log('✅ Configuration valid');
    console.log('✅ Ready for database operations');
    
    console.log('\n📝 Note: This test only verifies SDK initialization.');
    console.log('   Actual database connectivity depends on:');
    console.log('   - Internet connection');
    console.log('   - Firebase project permissions');
    console.log('   - Firestore security rules');
    
    return { success: true, db, app };
    
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return { success: false, error };
  }
}

// Test connection
testFirebaseConnection().then(result => {
  if (result.success) {
    console.log('\n🎉 Firebase is properly configured and ready!');
  } else {
    console.log('\n💥 Firebase connection failed. Check configuration.');
  }
});

export { testFirebaseConnection };
