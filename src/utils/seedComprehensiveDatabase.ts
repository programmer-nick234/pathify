// Enhanced database seeding utility with comprehensive leaderboard data
// Run this script to populate Firebase with realistic sample data for testing

import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const comprehensiveSampleUsers = [
  {
    id: 'user1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'student',
    createdAt: new Date('2024-01-15'),
    lastLoginAt: new Date('2024-01-20'),
    profile: {
      phone: '+1-555-0123',
      location: 'New York, NY',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git'],
      experience: '3 years',
      education: 'Bachelor in Computer Science'
    }
  },
  {
    id: 'user2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    role: 'student',
    createdAt: new Date('2024-01-10'),
    lastLoginAt: new Date('2024-01-19'),
    profile: {
      phone: '+1-555-0124',
      location: 'San Francisco, CA',
      skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'Microservices'],
      experience: '4 years',
      education: 'Master in Software Engineering'
    }
  },
  {
    id: 'user3',
    email: 'mike.johnson@example.com',
    name: 'Mike Johnson',
    role: 'student',
    createdAt: new Date('2024-01-08'),
    lastLoginAt: new Date('2024-01-18'),
    profile: {
      phone: '+1-555-0125',
      location: 'Austin, TX',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis', 'Linux'],
      experience: '2 years',
      education: 'Bachelor in Information Technology'
    }
  },
  {
    id: 'user4',
    email: 'sarah.wilson@example.com',
    name: 'Sarah Wilson',
    role: 'student',
    createdAt: new Date('2024-01-05'),
    lastLoginAt: new Date('2024-01-17'),
    profile: {
      phone: '+1-555-0126',
      location: 'Seattle, WA',
      skills: ['C#', '.NET', 'Azure', 'SQL Server', 'PowerShell', 'Entity Framework'],
      experience: '3 years',
      education: 'Bachelor in Computer Science'
    }
  },
  {
    id: 'user5',
    email: 'alex.brown@example.com',
    name: 'Alex Brown',
    role: 'student',
    createdAt: new Date('2024-01-03'),
    lastLoginAt: new Date('2024-01-16'),
    profile: {
      phone: '+1-555-0127',
      location: 'Boston, MA',
      skills: ['Go', 'Kubernetes', 'Microservices', 'Redis', 'Linux', 'Docker', 'gRPC'],
      experience: '2 years',
      education: 'Master in Computer Science'
    }
  },
  {
    id: 'user6',
    email: 'emma.davis@example.com',
    name: 'Emma Davis',
    role: 'student',
    createdAt: new Date('2024-01-12'),
    lastLoginAt: new Date('2024-01-21'),
    profile: {
      phone: '+1-555-0128',
      location: 'Chicago, IL',
      skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'MongoDB', 'Tailwind CSS'],
      experience: '2 years',
      education: 'Bachelor in Computer Science'
    }
  },
  {
    id: 'user7',
    email: 'david.miller@example.com',
    name: 'David Miller',
    role: 'student',
    createdAt: new Date('2024-01-07'),
    lastLoginAt: new Date('2024-01-15'),
    profile: {
      phone: '+1-555-0129',
      location: 'Denver, CO',
      skills: ['Python', 'Flask', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis'],
      experience: '1 year',
      education: 'Bachelor in Software Engineering'
    }
  },
  {
    id: 'user8',
    email: 'lisa.garcia@example.com',
    name: 'Lisa Garcia',
    role: 'student',
    createdAt: new Date('2024-01-14'),
    lastLoginAt: new Date('2024-01-22'),
    profile: {
      phone: '+1-555-0130',
      location: 'Miami, FL',
      skills: ['Vue.js', 'Nuxt.js', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      experience: '2 years',
      education: 'Bachelor in Information Technology'
    }
  }
];

export const comprehensiveSampleResumeAnalyses = [
  {
    id: 'analysis1',
    userId: 'user1',
    fileName: 'john_doe_resume.pdf',
    analysisDate: new Date('2024-01-20'),
    score: 95,
    strengths: [
      'Exceptional technical skills in modern web technologies',
      'Strong project experience with React and Node.js',
      'Excellent communication skills evident in resume',
      'Relevant internships and impressive side projects',
      'Good understanding of cloud platforms and DevOps'
    ],
    weaknesses: [
      'Could benefit from more leadership experience',
      'Missing some advanced certifications',
      'Limited experience with mobile development'
    ],
    suggestions: [
      'Consider getting AWS Solutions Architect certification',
      'Take on more leadership roles in projects',
      'Add mobile development skills (React Native)',
      'Include more details about specific achievements with metrics'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Git'],
    experience: '3 years of experience in web development with focus on React and Node.js',
    education: 'Bachelor of Science in Computer Science from State University',
    summary: 'Outstanding candidate with exceptional technical foundation and impressive project portfolio. Shows strong potential for senior-level positions.'
  },
  {
    id: 'analysis2',
    userId: 'user2',
    fileName: 'jane_smith_resume.pdf',
    analysisDate: new Date('2024-01-19'),
    score: 92,
    strengths: [
      'Excellent technical depth in Java ecosystem',
      'Strong experience with enterprise applications',
      'Good understanding of database design and optimization',
      'Relevant work experience and internships',
      'Strong knowledge of microservices architecture'
    ],
    weaknesses: [
      'Could show more frontend experience',
      'Limited experience with modern DevOps practices',
      'Missing some cloud-native technologies'
    ],
    suggestions: [
      'Add more frontend technologies to skill set',
      'Learn Docker and Kubernetes in depth',
      'Include more quantitative achievements',
      'Show leadership or mentoring experience'
    ],
    skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'Microservices'],
    experience: '4 years of experience in Java development with Spring framework',
    education: 'Master of Science in Software Engineering from Tech University',
    summary: 'Exceptional candidate with strong technical skills and relevant experience. Ready for senior-level positions.'
  },
  {
    id: 'analysis3',
    userId: 'user3',
    fileName: 'mike_johnson_resume.pdf',
    analysisDate: new Date('2024-01-18'),
    score: 88,
    strengths: [
      'Strong foundation in Python development',
      'Good experience with web frameworks',
      'Solid database knowledge',
      'Recent graduate with fresh perspective',
      'Good understanding of containerization'
    ],
    weaknesses: [
      'Limited professional experience',
      'Could benefit from more complex projects',
      'Missing some modern development practices'
    ],
    suggestions: [
      'Build more complex projects to showcase skills',
      'Learn about testing and CI/CD practices',
      'Add more details about specific achievements',
      'Consider contributing to open source projects'
    ],
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes', 'Redis', 'Linux'],
    experience: '2 years of experience including internships and personal projects',
    education: 'Bachelor of Science in Information Technology from Community College',
    summary: 'Promising junior candidate with good technical foundation. Shows potential with proper mentoring.'
  },
  {
    id: 'analysis4',
    userId: 'user4',
    fileName: 'sarah_wilson_resume.pdf',
    analysisDate: new Date('2024-01-17'),
    score: 85,
    strengths: [
      'Strong Microsoft technology stack expertise',
      'Good experience with cloud platforms',
      'Database administration skills',
      'Proven track record in enterprise environments',
      'Good understanding of .NET ecosystem'
    ],
    weaknesses: [
      'Limited experience with open source technologies',
      'Could benefit from more modern development practices',
      'Missing some cross-platform experience'
    ],
    suggestions: [
      'Learn about microservices architecture',
      'Explore containerization technologies',
      'Add more details about system design experience',
      'Consider learning cross-platform technologies'
    ],
    skills: ['C#', '.NET', 'Azure', 'SQL Server', 'PowerShell', 'Entity Framework'],
    experience: '3 years of experience in .NET development and database administration',
    education: 'Bachelor of Science in Computer Science from University of Washington',
    summary: 'Experienced candidate with strong enterprise development skills. Good fit for Microsoft-focused roles.'
  },
  {
    id: 'analysis5',
    userId: 'user5',
    fileName: 'alex_brown_resume.pdf',
    analysisDate: new Date('2024-01-16'),
    score: 82,
    strengths: [
      'Strong systems programming skills',
      'Good understanding of distributed systems',
      'Experience with containerization',
      'Modern development practices',
      'Good knowledge of Go ecosystem'
    ],
    weaknesses: [
      'Could benefit from more frontend experience',
      'Limited experience with traditional databases',
      'Missing some enterprise-level experience'
    ],
    suggestions: [
      'Add more frontend technologies',
      'Learn about relational databases',
      'Include more details about system architecture',
      'Show experience with monitoring and observability'
    ],
    skills: ['Go', 'Kubernetes', 'Microservices', 'Redis', 'Linux', 'Docker', 'gRPC'],
    experience: '2 years of experience in backend systems and microservices development',
    education: 'Master of Science in Computer Science from MIT',
    summary: 'Good candidate with strong systems knowledge and modern development practices. Suitable for challenging technical roles.'
  },
  {
    id: 'analysis6',
    userId: 'user6',
    fileName: 'emma_davis_resume.pdf',
    analysisDate: new Date('2024-01-21'),
    score: 90,
    strengths: [
      'Excellent frontend development skills',
      'Strong understanding of modern React ecosystem',
      'Good experience with TypeScript',
      'Knowledge of modern development tools',
      'Good understanding of API design'
    ],
    weaknesses: [
      'Limited backend experience',
      'Could benefit from more testing experience',
      'Missing some DevOps knowledge'
    ],
    suggestions: [
      'Learn backend technologies (Node.js, Python)',
      'Add comprehensive testing strategies',
      'Learn about CI/CD and deployment',
      'Include more performance optimization examples'
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'MongoDB', 'Tailwind CSS'],
    experience: '2 years of experience in frontend development with React and TypeScript',
    education: 'Bachelor of Science in Computer Science from University of Chicago',
    summary: 'Excellent frontend developer with strong technical skills and modern development practices.'
  },
  {
    id: 'analysis7',
    userId: 'user7',
    fileName: 'david_miller_resume.pdf',
    analysisDate: new Date('2024-01-15'),
    score: 78,
    strengths: [
      'Good foundation in Python development',
      'Experience with web frameworks',
      'Database knowledge',
      'Recent graduate with fresh perspective',
      'Good understanding of API development'
    ],
    weaknesses: [
      'Limited professional experience',
      'Could benefit from more complex projects',
      'Missing some modern development practices'
    ],
    suggestions: [
      'Build more complex projects to showcase skills',
      'Learn about testing and CI/CD practices',
      'Add more details about specific achievements',
      'Consider contributing to open source projects'
    ],
    skills: ['Python', 'Flask', 'FastAPI', 'PostgreSQL', 'Celery', 'Redis'],
    experience: '1 year of experience including internships and personal projects',
    education: 'Bachelor of Science in Software Engineering from University of Colorado',
    summary: 'Promising junior candidate with good technical foundation. Shows potential with proper mentoring.'
  },
  {
    id: 'analysis8',
    userId: 'user8',
    fileName: 'lisa_garcia_resume.pdf',
    analysisDate: new Date('2024-01-22'),
    score: 87,
    strengths: [
      'Strong Vue.js development skills',
      'Good understanding of modern frontend frameworks',
      'Experience with real-time applications',
      'Good database knowledge',
      'Recent graduate with fresh perspective'
    ],
    weaknesses: [
      'Limited professional experience',
      'Could benefit from more complex projects',
      'Missing some backend experience'
    ],
    suggestions: [
      'Learn backend technologies',
      'Build more complex full-stack projects',
      'Add more details about specific achievements',
      'Consider learning React or Angular for broader market appeal'
    ],
    skills: ['Vue.js', 'Nuxt.js', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
    experience: '2 years of experience in frontend development with Vue.js',
    education: 'Bachelor of Science in Information Technology from University of Miami',
    summary: 'Good frontend developer with strong Vue.js skills and potential for growth.'
  }
];

export const comprehensiveSampleJobApplications = [
  {
    id: 'app1',
    userId: 'user1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    appliedAt: new Date('2024-01-20'),
    status: 'shortlisted',
    resumeAnalysisId: 'analysis1'
  },
  {
    id: 'app2',
    userId: 'user1',
    jobTitle: 'Full Stack Developer',
    company: 'StartupXYZ',
    appliedAt: new Date('2024-01-18'),
    status: 'hired',
    resumeAnalysisId: 'analysis1'
  },
  {
    id: 'app3',
    userId: 'user2',
    jobTitle: 'Senior Java Developer',
    company: 'Enterprise Solutions',
    appliedAt: new Date('2024-01-19'),
    status: 'shortlisted',
    resumeAnalysisId: 'analysis2'
  },
  {
    id: 'app4',
    userId: 'user2',
    jobTitle: 'Backend Engineer',
    company: 'CloudTech',
    appliedAt: new Date('2024-01-17'),
    status: 'reviewed',
    resumeAnalysisId: 'analysis2'
  },
  {
    id: 'app5',
    userId: 'user3',
    jobTitle: 'Python Developer',
    company: 'DataCorp',
    appliedAt: new Date('2024-01-18'),
    status: 'pending',
    resumeAnalysisId: 'analysis3'
  },
  {
    id: 'app6',
    userId: 'user4',
    jobTitle: '.NET Developer',
    company: 'Microsoft Partner',
    appliedAt: new Date('2024-01-17'),
    status: 'hired',
    resumeAnalysisId: 'analysis4'
  },
  {
    id: 'app7',
    userId: 'user5',
    jobTitle: 'Backend Engineer',
    company: 'CloudTech',
    appliedAt: new Date('2024-01-16'),
    status: 'shortlisted',
    resumeAnalysisId: 'analysis5'
  },
  {
    id: 'app8',
    userId: 'user6',
    jobTitle: 'Frontend Developer',
    company: 'WebSolutions',
    appliedAt: new Date('2024-01-21'),
    status: 'pending',
    resumeAnalysisId: 'analysis6'
  },
  {
    id: 'app9',
    userId: 'user7',
    jobTitle: 'Python Developer',
    company: 'StartupABC',
    appliedAt: new Date('2024-01-15'),
    status: 'reviewed',
    resumeAnalysisId: 'analysis7'
  },
  {
    id: 'app10',
    userId: 'user8',
    jobTitle: 'Frontend Developer',
    company: 'Digital Agency',
    appliedAt: new Date('2024-01-22'),
    status: 'pending',
    resumeAnalysisId: 'analysis8'
  }
];

export async function seedComprehensiveDatabase() {
  try {
    console.log('Starting comprehensive database seeding...');
    
    if (!db) {
      console.error('❌ Firestore not initialized');
      return;
    }

    // Add comprehensive sample users
    console.log('Adding comprehensive sample users...');
    for (const user of comprehensiveSampleUsers) {
      await setDoc(doc(db, 'users', user.id), user);
      console.log(`Added user: ${user.name}`);
    }

    // Add comprehensive sample resume analyses
    console.log('Adding comprehensive sample resume analyses...');
    for (const analysis of comprehensiveSampleResumeAnalyses) {
      await setDoc(doc(db, 'resumeAnalysis', analysis.id), analysis);
      console.log(`Added analysis: ${analysis.fileName}`);
    }

    // Add comprehensive sample job applications
    console.log('Adding comprehensive sample job applications...');
    for (const application of comprehensiveSampleJobApplications) {
      await setDoc(doc(db, 'applications', application.id), application);
      console.log(`Added application: ${application.jobTitle} at ${application.company}`);
    }

    console.log('Comprehensive database seeding completed successfully!');
    console.log(`Added ${comprehensiveSampleUsers.length} users, ${comprehensiveSampleResumeAnalyses.length} analyses, and ${comprehensiveSampleJobApplications.length} applications.`);
  } catch (error) {
    console.error('Error seeding comprehensive database:', error);
  }
}

// Uncomment the line below to run the comprehensive seeding function
// seedComprehensiveDatabase();
