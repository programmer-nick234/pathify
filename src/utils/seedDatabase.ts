// Database seeding utility
// Run this script to populate Firebase with sample data for testing

import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sampleUsers, sampleResumeAnalyses, sampleJobApplications } from '@/data/sampleData';

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    if (!db) {
      console.error('❌ Firestore not initialized');
      return;
    }

    // Add sample users
    console.log('Adding sample users...');
    for (const user of sampleUsers) {
      await setDoc(doc(db, 'users', user.id), user);
      console.log(`Added user: ${user.name}`);
    }

    // Add sample resume analyses
    console.log('Adding sample resume analyses...');
    for (const analysis of sampleResumeAnalyses) {
      await setDoc(doc(db, 'resumeAnalysis', analysis.id), analysis);
      console.log(`Added analysis: ${analysis.fileName}`);
    }

    // Add sample job applications
    console.log('Adding sample job applications...');
    for (const application of sampleJobApplications) {
      await setDoc(doc(db, 'applications', application.id), application);
      console.log(`Added application: ${application.jobTitle} at ${application.company}`);
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Uncomment the line below to run the seeding function
// seedDatabase();
