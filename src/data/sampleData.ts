// Sample data for testing the HR dashboard
// This file can be used to seed the Firebase database with test data

export const sampleUsers = [
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
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      experience: '2 years',
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
      skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
      experience: '3 years',
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
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      experience: '1 year',
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
      skills: ['C#', '.NET', 'Azure', 'SQL Server'],
      experience: '4 years',
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
      skills: ['Go', 'Kubernetes', 'Microservices', 'Redis'],
      experience: '2 years',
      education: 'Master in Computer Science'
    }
  }
];

export const sampleResumeAnalyses = [
  {
    id: 'analysis1',
    userId: 'user1',
    fileName: 'john_doe_resume.pdf',
    analysisDate: new Date('2024-01-20'),
    score: 85,
    strengths: [
      'Strong technical skills in modern web technologies',
      'Good project experience with React and Node.js',
      'Clear communication skills evident in resume',
      'Relevant internships and side projects'
    ],
    weaknesses: [
      'Limited experience with cloud platforms',
      'Could benefit from more leadership experience',
      'Missing certifications in key technologies'
    ],
    suggestions: [
      'Consider getting AWS or Azure certification',
      'Take on more leadership roles in projects',
      'Add more details about specific achievements',
      'Include links to GitHub or portfolio'
    ],
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'Git', 'HTML/CSS'],
    experience: '2 years of experience in web development with focus on React and Node.js',
    education: 'Bachelor of Science in Computer Science from State University',
    summary: 'Strong candidate with solid technical foundation and good project experience. Shows potential for growth and learning.'
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
      'Good understanding of database design',
      'Relevant work experience and internships'
    ],
    weaknesses: [
      'Could show more frontend experience',
      'Limited experience with modern DevOps practices'
    ],
    suggestions: [
      'Add more frontend technologies to skill set',
      'Learn Docker and Kubernetes',
      'Include more quantitative achievements',
      'Show leadership or mentoring experience'
    ],
    skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Maven', 'JUnit'],
    experience: '3 years of experience in Java development with Spring framework',
    education: 'Master of Science in Software Engineering from Tech University',
    summary: 'Exceptional candidate with strong technical skills and relevant experience. Ready for senior-level positions.'
  },
  {
    id: 'analysis3',
    userId: 'user3',
    fileName: 'mike_johnson_resume.pdf',
    analysisDate: new Date('2024-01-18'),
    score: 78,
    strengths: [
      'Good foundation in Python development',
      'Experience with web frameworks',
      'Database knowledge',
      'Recent graduate with fresh perspective'
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
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Git', 'Linux'],
    experience: '1 year of experience including internships and personal projects',
    education: 'Bachelor of Science in Information Technology from Community College',
    summary: 'Promising junior candidate with good technical foundation. Shows potential with proper mentoring.'
  },
  {
    id: 'analysis4',
    userId: 'user4',
    fileName: 'sarah_wilson_resume.pdf',
    analysisDate: new Date('2024-01-17'),
    score: 88,
    strengths: [
      'Strong Microsoft technology stack expertise',
      'Good experience with cloud platforms',
      'Database administration skills',
      'Proven track record in enterprise environments'
    ],
    weaknesses: [
      'Limited experience with open source technologies',
      'Could benefit from more modern development practices'
    ],
    suggestions: [
      'Learn about microservices architecture',
      'Explore containerization technologies',
      'Add more details about system design experience',
      'Consider learning cross-platform technologies'
    ],
    skills: ['C#', '.NET', 'Azure', 'SQL Server', 'PowerShell', 'Visual Studio'],
    experience: '4 years of experience in .NET development and database administration',
    education: 'Bachelor of Science in Computer Science from University of Washington',
    summary: 'Experienced candidate with strong enterprise development skills. Good fit for Microsoft-focused roles.'
  },
  {
    id: 'analysis5',
    userId: 'user5',
    fileName: 'alex_brown_resume.pdf',
    analysisDate: new Date('2024-01-16'),
    score: 90,
    strengths: [
      'Strong systems programming skills',
      'Good understanding of distributed systems',
      'Experience with containerization',
      'Modern development practices'
    ],
    weaknesses: [
      'Could benefit from more frontend experience',
      'Limited experience with traditional databases'
    ],
    suggestions: [
      'Add more frontend technologies',
      'Learn about relational databases',
      'Include more details about system architecture',
      'Show experience with monitoring and observability'
    ],
    skills: ['Go', 'Kubernetes', 'Microservices', 'Redis', 'Docker', 'Linux'],
    experience: '2 years of experience in backend systems and microservices development',
    education: 'Master of Science in Computer Science from MIT',
    summary: 'Excellent candidate with strong systems knowledge and modern development practices. Ready for challenging technical roles.'
  }
];

export const sampleJobApplications = [
  {
    id: 'app1',
    userId: 'user1',
    jobTitle: 'Frontend Developer',
    company: 'TechCorp Inc.',
    appliedAt: new Date('2024-01-20'),
    status: 'pending',
    resumeAnalysisId: 'analysis1'
  },
  {
    id: 'app2',
    userId: 'user2',
    jobTitle: 'Senior Java Developer',
    company: 'Enterprise Solutions',
    appliedAt: new Date('2024-01-19'),
    status: 'shortlisted',
    resumeAnalysisId: 'analysis2'
  },
  {
    id: 'app3',
    userId: 'user3',
    jobTitle: 'Python Developer',
    company: 'StartupXYZ',
    appliedAt: new Date('2024-01-18'),
    status: 'reviewed',
    resumeAnalysisId: 'analysis3'
  },
  {
    id: 'app4',
    userId: 'user4',
    jobTitle: '.NET Developer',
    company: 'Microsoft Partner',
    appliedAt: new Date('2024-01-17'),
    status: 'hired',
    resumeAnalysisId: 'analysis4'
  },
  {
    id: 'app5',
    userId: 'user5',
    jobTitle: 'Backend Engineer',
    company: 'CloudTech',
    appliedAt: new Date('2024-01-16'),
    status: 'shortlisted',
    resumeAnalysisId: 'analysis5'
  }
];
