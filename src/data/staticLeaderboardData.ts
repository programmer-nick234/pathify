// Static Leaderboard Data with Real Firebase Users
// This creates a leaderboard using the actual Firebase Auth users

export const staticLeaderboardData = [
  {
    id: 'HidDQMav16Oi06KGOQxDu0AgVJv1',
    email: 'wjvsbddu@gmail.com',
    name: 'William Johnson',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0101',
      location: 'New York, NY',
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      experience: '3 years',
      education: 'Bachelor in Computer Science'
    },
    score: 95,
    applicationsCount: 5,
    analysisId: 'analysis1',
    trend: 'up' as const,
    achievements: ['Top Performer', 'Most Applications', 'High Score'],
    resumeAnalysis: {
      id: 'analysis1',
      userId: 'HidDQMav16Oi06KGOQxDu0AgVJv1',
      fileName: 'william_johnson_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 95,
      strengths: ['Exceptional technical skills', 'Strong project experience', 'Leadership qualities'],
      weaknesses: ['Could benefit from more cloud certifications'],
      suggestions: ['Get AWS Solutions Architect certification', 'Lead more team projects'],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
      experience: '3 years as a Senior Developer at TechCorp, leading multiple projects and mentoring junior developers.',
      education: 'B.Sc. in Computer Science from State University (2022)',
      summary: 'Outstanding candidate with exceptional technical foundation and proven leadership abilities.'
    }
  },
  {
    id: 'LgFNQxCvsAcQdEKMHIrMcB99VuE2',
    email: 'nickinvesting50@gmail.com',
    name: 'Nick Investing',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0102',
      location: 'San Francisco, CA',
      skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
      experience: '4 years',
      education: 'Master in Software Engineering'
    },
    score: 92,
    applicationsCount: 4,
    analysisId: 'analysis2',
    trend: 'stable' as const,
    achievements: ['High Score', 'Consistent Performer'],
    resumeAnalysis: {
      id: 'analysis2',
      userId: 'LgFNQxCvsAcQdEKMHIrMcB99VuE2',
      fileName: 'nick_investing_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 92,
      strengths: ['Excellent Java skills', 'Strong backend experience', 'Cloud proficiency'],
      weaknesses: ['Limited frontend experience'],
      suggestions: ['Learn React or Angular', 'Contribute to open source projects'],
      skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker', 'Kubernetes'],
      experience: '4 years as a Backend Engineer at Enterprise Solutions, developing scalable microservices.',
      education: 'M.Sc. in Software Engineering from National University (2021)',
      summary: 'Experienced Java developer with expertise in enterprise application development and cloud infrastructure.'
    }
  },
  {
    id: 'bW0WSGrA5DTuzpqYO5ZH3eSzmKH3',
    email: 'hegeodb@gmail.com',
    name: 'Hegel Database',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0103',
      location: 'Austin, TX',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis'],
      experience: '2 years',
      education: 'Bachelor in Information Technology'
    },
    score: 88,
    applicationsCount: 3,
    analysisId: 'analysis3',
    trend: 'up' as const,
    achievements: ['Rising Star', 'Database Expert'],
    resumeAnalysis: {
      id: 'analysis3',
      userId: 'bW0WSGrA5DTuzpqYO5ZH3eSzmKH3',
      fileName: 'hegel_database_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 88,
      strengths: ['Strong Python skills', 'Database management expertise', 'DevOps understanding'],
      weaknesses: ['Less industry experience'],
      suggestions: ['Seek senior-level projects', 'Build a strong project portfolio'],
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Redis', 'Git'],
      experience: '2 years as a Python Developer at DataCorp, focusing on backend development and database optimization.',
      education: 'B.Sc. in Information Technology from City College (2023)',
      summary: 'Skilled Python developer with strong database management capabilities and growing DevOps expertise.'
    }
  },
  {
    id: 'uJ6hDdlV3DRXy1YMu37Br0TXWbc2',
    email: 'ehshdg@gmail.com',
    name: 'Emma Henderson',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0104',
      location: 'Seattle, WA',
      skills: ['C++', 'Data Structures', 'Algorithms', 'Linux', 'System Design'],
      experience: '1 year',
      education: 'Bachelor in Computer Engineering'
    },
    score: 85,
    applicationsCount: 2,
    analysisId: 'analysis4',
    trend: 'stable' as const,
    achievements: ['Algorithm Expert', 'System Designer'],
    resumeAnalysis: {
      id: 'analysis4',
      userId: 'uJ6hDdlV3DRXy1YMu37Br0TXWbc2',
      fileName: 'emma_henderson_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 85,
      strengths: ['Strong CS fundamentals', 'Problem-solving skills', 'C++ proficiency'],
      weaknesses: ['Limited project experience'],
      suggestions: ['Participate in coding competitions', 'Develop personal projects'],
      skills: ['C++', 'Data Structures', 'Algorithms', 'Linux', 'System Design', 'OOP'],
      experience: '1 year as a Software Engineer at SystemCorp, working on core algorithms and system optimization.',
      education: 'B.Eng. in Computer Engineering from University Tech (2024)',
      summary: 'Dedicated computer engineering graduate with strong grasp of algorithms and system design principles.'
    }
  },
  {
    id: 'WWO4nPxILsVCwqB8SBVUz7NAZff1',
    email: 'nikhilbajantritb@gmail.com',
    name: 'Nikhil Bajantri',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0105',
      location: 'Boston, MA',
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'UI/UX Design'],
      experience: '1 year',
      education: 'Associate in Web Development'
    },
    score: 82,
    applicationsCount: 3,
    analysisId: 'analysis5',
    trend: 'up' as const,
    achievements: ['UI/UX Specialist', 'Frontend Expert'],
    resumeAnalysis: {
      id: 'analysis5',
      userId: 'WWO4nPxILsVCwqB8SBVUz7NAZff1',
      fileName: 'nikhil_bajantri_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 82,
      strengths: ['Strong UI/UX skills', 'Frontend development', 'Responsive design'],
      weaknesses: ['Limited backend knowledge'],
      suggestions: ['Learn a backend framework', 'Collaborate on full-stack projects'],
      skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Figma', 'Responsive Design'],
      experience: '1 year as a Frontend Developer at WebCorp, creating engaging user interfaces.',
      education: 'A.A.S. in Web Development from Community College (2024)',
      summary: 'Creative frontend developer with a passion for crafting intuitive and visually appealing user experiences.'
    }
  },
  {
    id: '7kJuG8zzUgQ3J6NFX6PgVUftWCn2',
    email: 'nikhilbajantri86@gmail.com',
    name: 'Nikhil Bajantri (Senior)',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0106',
      location: 'Chicago, IL',
      skills: ['Java', 'Spring', 'Microservices', 'Kubernetes', 'AWS'],
      experience: '5 years',
      education: 'Master in Computer Science'
    },
    score: 90,
    applicationsCount: 6,
    analysisId: 'analysis6',
    trend: 'stable' as const,
    achievements: ['Senior Developer', 'Microservices Expert', 'High Score'],
    resumeAnalysis: {
      id: 'analysis6',
      userId: '7kJuG8zzUgQ3J6NFX6PgVUftWCn2',
      fileName: 'nikhil_bajantri_senior_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 90,
      strengths: ['Extensive Java experience', 'Microservices architecture', 'Cloud expertise'],
      weaknesses: ['Could improve documentation skills'],
      suggestions: ['Mentor junior developers', 'Write technical blogs'],
      skills: ['Java', 'Spring', 'Microservices', 'Kubernetes', 'AWS', 'Docker'],
      experience: '5 years as a Senior Software Engineer at EnterpriseCorp, architecting microservices solutions.',
      education: 'M.Sc. in Computer Science from University of Technology (2020)',
      summary: 'Senior Java developer with extensive experience in microservices architecture and cloud technologies.'
    }
  },
  {
    id: 'rbcrpqQmnXgAZvPx09On1d5qYxr2',
    email: 'nikhilbajantriitb@gmail.com',
    name: 'Nikhil Bajantri (ITB)',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0107',
      location: 'Denver, CO',
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'Scikit-learn'],
      experience: '2 years',
      education: 'Bachelor in Data Science'
    },
    score: 87,
    applicationsCount: 4,
    analysisId: 'analysis7',
    trend: 'up' as const,
    achievements: ['ML Specialist', 'Data Scientist'],
    resumeAnalysis: {
      id: 'analysis7',
      userId: 'rbcrpqQmnXgAZvPx09On1d5qYxr2',
      fileName: 'nikhil_bajantri_itb_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 87,
      strengths: ['Strong ML skills', 'Data analysis expertise', 'Python proficiency'],
      weaknesses: ['Limited production ML experience'],
      suggestions: ['Deploy ML models to production', 'Work on real-world datasets'],
      skills: ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'Scikit-learn', 'SQL'],
      experience: '2 years as a Data Scientist at DataCorp, developing ML models and analyzing large datasets.',
      education: 'B.Sc. in Data Science from Institute of Technology (2023)',
      summary: 'Passionate data scientist with strong machine learning skills and analytical capabilities.'
    }
  },
  {
    id: '2kYEcDQEnkZQiLiQAB3s76MUcwY2',
    email: 'nikhilbajantriiitb@gmail.com',
    name: 'Nikhil Bajantri (IITB)',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0108',
      location: 'Miami, FL',
      skills: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'TypeScript'],
      experience: '3 years',
      education: 'Bachelor in Computer Science'
    },
    score: 89,
    applicationsCount: 5,
    analysisId: 'analysis8',
    trend: 'up' as const,
    achievements: ['Full-Stack Developer', 'TypeScript Expert'],
    resumeAnalysis: {
      id: 'analysis8',
      userId: '2kYEcDQEnkZQiLiQAB3s76MUcwY2',
      fileName: 'nikhil_bajantri_iitb_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 89,
      strengths: ['Full-stack development', 'TypeScript expertise', 'Modern frameworks'],
      weaknesses: ['Could improve testing practices'],
      suggestions: ['Learn advanced testing strategies', 'Contribute to open source'],
      skills: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'TypeScript', 'Jest'],
      experience: '3 years as a Full-Stack Developer at StartupCorp, building modern web applications.',
      education: 'B.Sc. in Computer Science from IIT Bombay (2022)',
      summary: 'Skilled full-stack developer with expertise in modern JavaScript frameworks and TypeScript.'
    }
  },
  {
    id: 'Yiyp31f0iUQgSQQR0c8yBf0anp92',
    email: 'vvick8406@gmail.com',
    name: 'Victor Vick',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0109',
      location: 'Portland, OR',
      skills: ['Vue.js', 'Laravel', 'MySQL', 'Docker', 'Redis'],
      experience: '2 years',
      education: 'Bachelor in Software Engineering'
    },
    score: 84,
    applicationsCount: 3,
    analysisId: 'analysis9',
    trend: 'stable' as const,
    achievements: ['Vue.js Expert', 'PHP Developer'],
    resumeAnalysis: {
      id: 'analysis9',
      userId: 'Yiyp31f0iUQgSQQR0c8yBf0anp92',
      fileName: 'victor_vick_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 84,
      strengths: ['Strong Vue.js skills', 'Laravel expertise', 'Database management'],
      weaknesses: ['Limited React experience'],
      suggestions: ['Learn React for broader opportunities', 'Explore microservices'],
      skills: ['Vue.js', 'Laravel', 'MySQL', 'Docker', 'Redis', 'PHP'],
      experience: '2 years as a Web Developer at WebCorp, specializing in Vue.js and Laravel applications.',
      education: 'B.Sc. in Software Engineering from State University (2023)',
      summary: 'Experienced web developer with strong Vue.js and Laravel skills, focused on modern web applications.'
    }
  },
  {
    id: 'JT8Lucv5QvenknRuiHVTlAEanlA2',
    email: 'eeye6710@gmail.com',
    name: 'Ethan Eye',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0110',
      location: 'Phoenix, AZ',
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Jest'],
      experience: '2 years',
      education: 'Bachelor in Computer Science'
    },
    score: 86,
    applicationsCount: 4,
    analysisId: 'analysis10',
    trend: 'up' as const,
    achievements: ['Angular Specialist', 'TypeScript Expert'],
    resumeAnalysis: {
      id: 'analysis10',
      userId: 'JT8Lucv5QvenknRuiHVTlAEanlA2',
      fileName: 'ethan_eye_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 86,
      strengths: ['Angular expertise', 'TypeScript proficiency', 'State management'],
      weaknesses: ['Limited backend experience'],
      suggestions: ['Learn Node.js or Python', 'Explore full-stack development'],
      skills: ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Jest', 'HTML/CSS'],
      experience: '2 years as a Frontend Developer at AngularCorp, building complex single-page applications.',
      education: 'B.Sc. in Computer Science from University of Arizona (2023)',
      summary: 'Dedicated Angular developer with strong TypeScript skills and expertise in state management.'
    }
  },
  {
    id: 'q0JBx8ybv4fVK77E3w9UScoDVjv1',
    email: 'amanrao099@gmail.com',
    name: 'Aman Rao',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0111',
      location: 'Las Vegas, NV',
      skills: ['React Native', 'Flutter', 'Mobile Development', 'Firebase', 'Redux'],
      experience: '3 years',
      education: 'Bachelor in Mobile Development'
    },
    score: 88,
    applicationsCount: 5,
    analysisId: 'analysis11',
    trend: 'up' as const,
    achievements: ['Mobile Expert', 'Cross-Platform Developer'],
    resumeAnalysis: {
      id: 'analysis11',
      userId: 'q0JBx8ybv4fVK77E3w9UScoDVjv1',
      fileName: 'aman_rao_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 88,
      strengths: ['Mobile development expertise', 'Cross-platform skills', 'Firebase integration'],
      weaknesses: ['Could improve UI/UX design'],
      suggestions: ['Learn design principles', 'Study user experience'],
      skills: ['React Native', 'Flutter', 'Mobile Development', 'Firebase', 'Redux', 'JavaScript'],
      experience: '3 years as a Mobile Developer at MobileCorp, creating cross-platform applications.',
      education: 'B.Sc. in Mobile Development from Tech University (2022)',
      summary: 'Experienced mobile developer with expertise in React Native and Flutter for cross-platform development.'
    }
  },
  {
    id: 'er0mBo7bKZeewzCRgAo73RaQ7cf1',
    email: 'test@example.com',
    name: 'Test User',
    role: 'student' as const,
    createdAt: new Date('2025-10-08'),
    lastLoginAt: new Date('2025-10-08'),
    profile: {
      phone: '+1-555-0112',
      location: 'Test City, TC',
      skills: ['Testing', 'QA', 'Automation', 'Selenium', 'Jest'],
      experience: '1 year',
      education: 'Bachelor in Software Testing'
    },
    score: 80,
    applicationsCount: 2,
    analysisId: 'analysis12',
    trend: 'stable' as const,
    achievements: ['QA Specialist', 'Test Automation'],
    resumeAnalysis: {
      id: 'analysis12',
      userId: 'er0mBo7bKZeewzCRgAo73RaQ7cf1',
      fileName: 'test_user_resume.pdf',
      analysisDate: new Date('2025-10-08'),
      score: 80,
      strengths: ['Testing expertise', 'Automation skills', 'Quality assurance'],
      weaknesses: ['Limited development experience'],
      suggestions: ['Learn programming languages', 'Explore DevOps practices'],
      skills: ['Testing', 'QA', 'Automation', 'Selenium', 'Jest', 'Cypress'],
      experience: '1 year as a QA Engineer at TestCorp, focusing on test automation and quality assurance.',
      education: 'B.Sc. in Software Testing from Test University (2024)',
      summary: 'Dedicated QA engineer with strong testing skills and automation expertise.'
    }
  }
];

// Sort by score in descending order
export const sortedLeaderboardData = staticLeaderboardData.sort((a, b) => b.score - a.score);

// Get top 3 performers
export const topPerformers = sortedLeaderboardData.slice(0, 3);

// Get statistics
export const leaderboardStats = {
  totalStudents: staticLeaderboardData.length,
  averageScore: Math.round(staticLeaderboardData.reduce((sum, student) => sum + student.score, 0) / staticLeaderboardData.length),
  topScore: Math.max(...staticLeaderboardData.map(s => s.score)),
  totalApplications: staticLeaderboardData.reduce((sum, student) => sum + student.applicationsCount, 0),
  skillsDistribution: staticLeaderboardData.reduce((acc, student) => {
    student.profile.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>)
};
