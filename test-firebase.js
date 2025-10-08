// Simple Firebase Connection Test
// Run this to test Firebase connection

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAz0VpCs-yPNzdPTOofMvrsDU-Q8YX-UiA",
  authDomain: "pathify-6619e.firebaseapp.com",
  projectId: "pathify-6619e",
  storageBucket: "pathify-6619e.firebasestorage.app",
  messagingSenderId: "225023326555",
  appId: "1:225023326555:web:794ecf3b4c30a02d43827e",
};

async function testConnection() {
  try {
    console.log('🔥 Testing Firebase Connection...');
    console.log('================================');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized');
    
    // Initialize Firestore
    const db = getFirestore(app);
    console.log('✅ Firestore initialized');
    
    // Test connection by reading from a collection
    console.log('📊 Testing database connection...');
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log(`✅ Connection successful! Found ${snapshot.docs.length} documents`);
    
    // Create a test document
    console.log('📝 Creating test document...');
    const testDoc = {
      message: 'Firebase connection test',
      timestamp: new Date().toISOString(),
      status: 'connected'
    };
    
    const docRef = await addDoc(testCollection, testDoc);
    console.log(`✅ Test document created with ID: ${docRef.id}`);
    
    console.log('\n🎉 Firebase is connected and working!');
    console.log('=====================================');
    console.log('✅ SDK initialized');
    console.log('✅ Database connected');
    console.log('✅ Read operation successful');
    console.log('✅ Write operation successful');
    
    return true;
  } catch (error) {
    console.error('\n❌ Firebase connection failed:', error.message);
    console.log('\n🔧 Possible solutions:');
    console.log('1. Check internet connection');
    console.log('2. Verify Firebase project exists');
    console.log('3. Enable Firestore in Firebase Console');
    console.log('4. Check security rules');
    console.log('5. Verify API keys');
    
    return false;
  }
}

// Run the test
testConnection();
