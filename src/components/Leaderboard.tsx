'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, ResumeAnalysis, JobApplication } from '@/types';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star,
  TrendingUp,
  Users,
  Target,
  Calendar,
  MapPin,
  GraduationCap,
  Briefcase,
  Zap,
  Crown,
  Flame
} from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  name: string;
  email: string;
  score: number;
  rank: number;
  totalApplications: number;
  skills: string[];
  experience: string;
  education: string;
  lastActivity: Date;
  profile?: {
    location?: string;
    phone?: string;
  };
  achievements: string[];
  trend: 'up' | 'down' | 'stable';
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [filterCategory, setFilterCategory] = useState('overall');

  useEffect(() => {
    fetchLeaderboardData();
  }, [filterPeriod, filterCategory]);

  const fetchLeaderboardData = async () => {
    if (!db) {
      console.warn('Firebase not initialized, using sample leaderboard data');
      const sampleData = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          score: 95,
          rank: 1,
          totalApplications: 8,
          skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
          experience: '3 years',
          education: 'Bachelor in Computer Science',
          lastActivity: new Date('2024-01-20'),
          profile: { location: 'New York, NY' },
          achievements: ['Top Performer', 'Most Applications', 'High Score'],
          trend: 'up' as const
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          score: 92,
          rank: 2,
          totalApplications: 6,
          skills: ['Java', 'Spring Boot', 'MySQL', 'AWS', 'Docker'],
          experience: '4 years',
          education: 'Master in Software Engineering',
          lastActivity: new Date('2024-01-19'),
          profile: { location: 'San Francisco, CA' },
          achievements: ['Excellent Skills', 'Strong Experience'],
          trend: 'up' as const
        },
        {
          id: '3',
          name: 'Mike Johnson',
          email: 'mike.johnson@example.com',
          score: 88,
          rank: 3,
          totalApplications: 5,
          skills: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Kubernetes'],
          experience: '2 years',
          education: 'Bachelor in Information Technology',
          lastActivity: new Date('2024-01-18'),
          profile: { location: 'Austin, TX' },
          achievements: ['Rising Star', 'Fast Learner'],
          trend: 'up' as const
        },
        {
          id: '4',
          name: 'Sarah Wilson',
          email: 'sarah.wilson@example.com',
          score: 85,
          rank: 4,
          totalApplications: 7,
          skills: ['C#', '.NET', 'Azure', 'SQL Server', 'PowerShell'],
          experience: '3 years',
          education: 'Bachelor in Computer Science',
          lastActivity: new Date('2024-01-17'),
          profile: { location: 'Seattle, WA' },
          achievements: ['Consistent Performer'],
          trend: 'stable' as const
        },
        {
          id: '5',
          name: 'Alex Brown',
          email: 'alex.brown@example.com',
          score: 82,
          rank: 5,
          totalApplications: 4,
          skills: ['Go', 'Kubernetes', 'Microservices', 'Redis', 'Linux'],
          experience: '2 years',
          education: 'Master in Computer Science',
          lastActivity: new Date('2024-01-16'),
          profile: { location: 'Boston, MA' },
          achievements: ['Technical Expert'],
          trend: 'down' as const
        }
      ];
      setLeaderboardData(sampleData);
      setLoading(false);
      return;
    }

    try {
      // Fetch users and their resume analyses
      const usersQuery = query(collection(db, 'users'), where('role', '==', 'student'));
      const usersSnapshot = await getDocs(usersQuery);
      
      const analysesQuery = query(collection(db, 'resumeAnalysis'), orderBy('score', 'desc'));
      const analysesSnapshot = await getDocs(analysesQuery);
      
      const applicationsQuery = query(collection(db, 'applications'));
      const applicationsSnapshot = await getDocs(applicationsQuery);

      // Process the data
      const users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastLoginAt: doc.data().lastLoginAt?.toDate(),
      })) as User[];

      const analyses = analysesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        analysisDate: doc.data().analysisDate?.toDate(),
      })) as ResumeAnalysis[];

      const applications = applicationsSnapshot.docs.map(doc => ({
        id: doc.id,
        userId: doc.data().userId,
        jobTitle: doc.data().jobTitle,
        company: doc.data().company,
        appliedAt: doc.data().appliedAt?.toDate(),
        status: doc.data().status,
        resumeAnalysisId: doc.data().resumeAnalysisId,
      })) as JobApplication[];

      // Create leaderboard entries
      const leaderboardEntries: LeaderboardEntry[] = users.map((user, index) => {
        const userAnalysis = analyses.find(analysis => analysis.userId === user.id);
        const userApplications = applications.filter(app => app.userId === user.id);
        
        const score = userAnalysis?.score || 0;
        const achievements = [];
        
        if (score >= 90) achievements.push('Top Performer');
        if (userApplications.length >= 5) achievements.push('Most Applications');
        if (score >= 85) achievements.push('High Score');
        if (user.profile?.skills && user.profile.skills.length >= 5) achievements.push('Skill Master');
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          score,
          rank: index + 1,
          totalApplications: userApplications.length,
          skills: user.profile?.skills || [],
          experience: user.profile?.experience || 'Not specified',
          education: user.profile?.education || 'Not specified',
          lastActivity: user.lastLoginAt,
          profile: user.profile,
          achievements,
          trend: score >= 85 ? 'up' : score >= 70 ? 'stable' : 'down'
        };
      });

      // Sort by score and assign ranks
      leaderboardEntries.sort((a, b) => b.score - a.score);
      leaderboardEntries.forEach((entry, index) => {
        entry.rank = index + 1;
      });

      setLeaderboardData(leaderboardEntries);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold">{rank}</span>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            Student Leaderboard
          </h2>
          <p className="text-gray-600 mt-1">Top performing students based on AI analysis scores</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="overall">Overall Score</option>
            <option value="applications">Most Applications</option>
            <option value="skills">Most Skills</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">🏆 Top Performers</h3>
        <div className="flex justify-center items-end space-x-8">
          {leaderboardData.slice(0, 3).map((student, index) => (
            <div key={student.id} className={`text-center ${index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3'}`}>
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                index === 0 ? 'bg-yellow-100' : index === 1 ? 'bg-gray-100' : 'bg-amber-100'
              }`}>
                {getRankIcon(student.rank)}
              </div>
              <div className={`px-4 py-2 rounded-lg ${
                index === 0 ? 'bg-yellow-50 border-2 border-yellow-200' : 
                index === 1 ? 'bg-gray-50 border-2 border-gray-200' : 
                'bg-amber-50 border-2 border-amber-200'
              }`}>
                <h4 className="font-semibold text-gray-900">{student.name}</h4>
                <p className="text-sm text-gray-600">{student.email}</p>
                <div className={`mt-2 px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(student.score)}`}>
                  {student.score}%
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  {student.totalApplications} applications
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Complete Rankings</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {leaderboardData.map((student, index) => (
            <div key={student.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                {/* Rank */}
                <div className="flex-shrink-0">
                  {getRankIcon(student.rank)}
                </div>

                {/* Student Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-lg">
                        {student.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      {student.profile?.location && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {student.profile.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Score and Stats */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(student.score)}`}>
                      {student.score}%
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Score</p>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{student.totalApplications}</div>
                    <p className="text-xs text-gray-500">Applications</p>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-900">{student.skills.length}</div>
                    <p className="text-xs text-gray-500">Skills</p>
                  </div>

                  <div className="flex items-center">
                    {getTrendIcon(student.trend)}
                  </div>
                </div>
              </div>

              {/* Skills and Achievements */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {student.skills.slice(0, 5).map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                  {student.skills.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      +{student.skills.length - 5} more
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-1">
                  {student.achievements.slice(0, 2).map((achievement, achievementIndex) => (
                    <span key={achievementIndex} className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      {achievement}
                    </span>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <GraduationCap className="w-4 h-4 mr-1" />
                    {student.education}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {student.experience}
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last active: {student.lastActivity.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-2xl font-bold text-gray-900">{leaderboardData.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(leaderboardData.reduce((sum, student) => sum + student.score, 0) / leaderboardData.length)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Top Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {leaderboardData.length > 0 ? leaderboardData[0].score : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
