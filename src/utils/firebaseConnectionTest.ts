// Firebase Connection Test and Setup
// This script will test and establish Firebase connection

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAz0VpCs-yPNzdPTOofMvrsDU-Q8YX-UiA",
  authDomain: "pathify-6619e.firebaseapp.com",
  projectId: "pathify-6619e",
  storageBucket: "pathify-6619e.firebasestorage.app",
  messagingSenderId: "225023326555",
  appId: "1:225023326555:web:794ecf3b4c30a02d43827e",
};

let app: FirebaseApp | null;
let db: Firestore | null;
let auth: Auth | null;

async function initializeFirebase() {
  try {
    console.log('🔥 Initializing Firebase...');
    
    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase app initialized');
    
    // Initialize Firestore
    db = getFirestore(app);
    console.log('✅ Firestore initialized');
    
    // Initialize Auth
    auth = getAuth(app);
    console.log('✅ Auth initialized');
    
    return { app, db, auth };
  } catch (error) {
    console.error('❌ Firebase initialization failed:', error);
    throw error;
  }
}

async function testFirestoreConnection() {
  try {
    console.log('\n📊 Testing Firestore connection...');
    
    if (!db) {
      console.error('❌ Firestore not initialized');
      return false;
    }
    
    // Test reading from a collection
    const testCollection = collection(db, 'test');
    const snapshot = await getDocs(testCollection);
    console.log('✅ Firestore read test successful');
    console.log(`📄 Found ${snapshot.docs.length} documents in test collection`);
    
    return true;
  } catch (error) {
    console.error('❌ Firestore connection test failed:', error);
    return false;
  }
}

async function createTestData() {
  try {
    console.log('\n📝 Creating test data...');
    
    if (!db) {
      console.error('❌ Firestore not initialized');
      throw new Error('Firestore not initialized');
    }
    
    // Create a test document
    const testDoc = {
      message: 'Firebase connection test',
      timestamp: new Date(),
      status: 'connected'
    };
    
    const docRef = await addDoc(collection(db, 'test'), testDoc);
    console.log('✅ Test document created with ID:', docRef.id);
    
    return docRef.id;
  } catch (error) {
    console.error('❌ Failed to create test data:', error);
    throw error;
  }
}

async function seedSampleData() {
  try {
    console.log('\n🌱 Seeding sample data...');
    
    if (!db) {
      console.error('❌ Firestore not initialized');
      throw new Error('Firestore not initialized');
    }
    
    // Sample users
    const users = [
      {
        id: 'user1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        role: 'student',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        profile: {
          phone: '+1-555-0123',
          location: 'New York, NY',
          skills: ['JavaScript', 'React', 'Node.js', 'Python'],
          experience: '3 years',
          education: 'Bachelor in Computer Science'
        }
      },
      {
        id: 'user2',
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        role: 'student',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        profile: {
          phone: '+1-555-0124',
          location: 'San Francisco, CA',
          skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
          experience: '4 years',
          education: 'Master in Software Engineering'
        }
      }
    ];
    
    // Sample resume analyses
    const analyses = [
      {
        id: 'analysis1',
        userId: 'user1',
        fileName: 'john_doe_resume.pdf',
        analysisDate: new Date(),
        score: 95,
        strengths: ['Exceptional technical skills', 'Strong project experience'],
        weaknesses: ['Could benefit from more leadership experience'],
        suggestions: ['Consider getting AWS certification'],
        skills: ['JavaScript', 'React', 'Node.js', 'Python'],
        experience: '3 years web development',
        education: 'Bachelor in Computer Science',
        summary: 'Outstanding candidate with exceptional technical foundation'
      },
      {
        id: 'analysis2',
        userId: 'user2',
        fileName: 'jane_smith_resume.pdf',
        analysisDate: new Date(),
        score: 92,
        strengths: ['Excellent Java skills', 'Strong experience'],
        weaknesses: ['Limited frontend experience'],
        suggestions: ['Learn React or Angular'],
        skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
        experience: '4 years Java development',
        education: 'Master in Software Engineering',
        summary: 'Exceptional candidate with strong technical skills'
      }
    ];
    
    // Sample applications
    const applications = [
      {
        id: 'app1',
        userId: 'user1',
        jobTitle: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        appliedAt: new Date(),
        status: 'shortlisted',
        resumeAnalysisId: 'analysis1'
      },
      {
        id: 'app2',
        userId: 'user2',
        jobTitle: 'Senior Java Developer',
        company: 'Enterprise Solutions',
        appliedAt: new Date(),
        status: 'hired',
        resumeAnalysisId: 'analysis2'
      }
    ];
    
    // Add users
    for (const user of users) {
      await setDoc(doc(db, 'users', user.id), user);
      console.log(`✅ Added user: ${user.name}`);
    }
    
    // Add analyses
    for (const analysis of analyses) {
      await setDoc(doc(db, 'resumeAnalysis', analysis.id), analysis);
      console.log(`✅ Added analysis: ${analysis.fileName}`);
    }
    
    // Add applications
    for (const application of applications) {
      await setDoc(doc(db, 'applications', application.id), application);
      console.log(`✅ Added application: ${application.jobTitle}`);
    }
    
    console.log('🎉 Sample data seeded successfully!');
    return true;
  } catch (error) {
    console.error('❌ Failed to seed sample data:', error);
    throw error;
  }
}

async function testCompleteConnection() {
  try {
    console.log('🚀 Starting complete Firebase connection test...');
    console.log('================================================');
    
    // Initialize Firebase
    await initializeFirebase();
    
    // Test Firestore connection
    const connectionTest = await testFirestoreConnection();
    if (!connectionTest) {
      throw new Error('Firestore connection failed');
    }
    
    // Create test data
    const testDocId = await createTestData();
    
    // Seed sample data
    await seedSampleData();
    
    console.log('\n🎉 Firebase connection established successfully!');
    console.log('================================================');
    console.log('✅ Firebase SDK initialized');
    console.log('✅ Firestore connected');
    console.log('✅ Auth initialized');
    console.log('✅ Test data created');
    console.log('✅ Sample data seeded');
    console.log('\n🔗 Your application should now show real data!');
    
    return true;
  } catch (error) {
    console.error('\n💥 Firebase connection failed:', error);
    console.log('\n🔧 Troubleshooting steps:');
    console.log('1. Check internet connection');
    console.log('2. Verify Firebase project exists');
    console.log('3. Enable Firestore in Firebase Console');
    console.log('4. Check security rules');
    console.log('5. Verify API keys');
    
    return false;
  }
}

// Run the connection test
testCompleteConnection().then(success => {
  if (success) {
    console.log('\n🎊 Firebase is now connected and ready!');
  } else {
    console.log('\n⚠️  Firebase connection failed. Check the errors above.');
  }
});

export { initializeFirebase, testFirestoreConnection, createTestData, seedSampleData };
