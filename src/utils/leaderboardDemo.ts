// Demo script to show leaderboard functionality
// This demonstrates how the leaderboard uses Firebase data

console.log('🏆 Pathify HR Leaderboard Demo');
console.log('==============================');

// Simulate Firebase data structure
const mockFirebaseData = {
  users: [
    {
      id: 'user1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'student',
      profile: {
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
        location: 'New York, NY',
        experience: '3 years',
        education: 'Bachelor in Computer Science'
      },
      lastLoginAt: new Date('2024-01-20')
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'student',
      profile: {
        skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
        location: 'San Francisco, CA',
        experience: '4 years',
        education: 'Master in Software Engineering'
      },
      lastLoginAt: new Date('2024-01-19')
    }
  ],
  resumeAnalyses: [
    {
      id: 'analysis1',
      userId: 'user1',
      score: 95,
      fileName: 'john_doe_resume.pdf',
      analysisDate: new Date('2024-01-20'),
      strengths: ['Exceptional technical skills', 'Strong project experience'],
      weaknesses: ['Could benefit from more leadership experience'],
      suggestions: ['Consider getting AWS certification'],
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      summary: 'Outstanding candidate with exceptional technical foundation'
    },
    {
      id: 'analysis2',
      userId: 'user2',
      score: 92,
      fileName: 'jane_smith_resume.pdf',
      analysisDate: new Date('2024-01-19'),
      strengths: ['Excellent Java skills', 'Strong experience'],
      weaknesses: ['Limited frontend experience'],
      suggestions: ['Learn React or Angular'],
      skills: ['Java', 'Spring Boot', 'MySQL', 'AWS'],
      summary: 'Exceptional candidate with strong technical skills'
    }
  ],
  applications: [
    {
      id: 'app1',
      userId: 'user1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      status: 'shortlisted',
      appliedAt: new Date('2024-01-20')
    },
    {
      id: 'app2',
      userId: 'user2',
      jobTitle: 'Senior Java Developer',
      company: 'Enterprise Solutions',
      status: 'hired',
      appliedAt: new Date('2024-01-19')
    }
  ]
};

// Simulate leaderboard calculation
function calculateLeaderboard(firebaseData: any) {
  const { users, resumeAnalyses, applications } = firebaseData;
  
  return users.map((user: any) => {
    const analysis = resumeAnalyses.find((a: any) => a.userId === user.id);
    const userApplications = applications.filter((app: any) => app.userId === user.id);
    
    const score = analysis?.score || 0;
    const achievements = [];
    
    if (score >= 90) achievements.push('Top Performer');
    if (userApplications.length >= 1) achievements.push('Active Applicant');
    if (score >= 85) achievements.push('High Score');
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      score,
      totalApplications: userApplications.length,
      skills: user.profile?.skills || [],
      achievements,
      trend: score >= 90 ? 'up' : score >= 80 ? 'stable' : 'down'
    };
  }).sort((a: any, b: any) => b.score - a.score)
    .map((entry: any, index: number) => ({ ...entry, rank: index + 1 }));
}

// Generate leaderboard
const leaderboard = calculateLeaderboard(mockFirebaseData);

console.log('\n📊 Generated Leaderboard:');
console.log('========================');

leaderboard.forEach((entry: any, index: number) => {
  const rankIcon = index === 0 ? '👑' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅';
  const trendIcon = entry.trend === 'up' ? '📈' : entry.trend === 'down' ? '📉' : '➡️';
  
  console.log(`${rankIcon} #${entry.rank} ${entry.name}`);
  console.log(`   📧 ${entry.email}`);
  console.log(`   🎯 Score: ${entry.score}% ${trendIcon}`);
  console.log(`   📝 Applications: ${entry.totalApplications}`);
  console.log(`   🛠️  Skills: ${entry.skills.slice(0, 3).join(', ')}${entry.skills.length > 3 ? '...' : ''}`);
  console.log(`   🏆 Achievements: ${entry.achievements.join(', ')}`);
  console.log('');
});

console.log('✅ Leaderboard successfully generated from Firebase data!');
console.log('\n🔗 Access the full leaderboard at: http://localhost:3001/hr');
console.log('📱 Navigate to "Leaderboard" in the sidebar to see the complete view');

export { calculateLeaderboard, mockFirebaseData };
