'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, ResumeAnalysis, JobApplication, HRDashboardStats } from '@/types';
import { 
  Users, 
  FileText, 
  Clock, 
  TrendingUp,
  Award,
  Eye,
  Download,
  Star,
  Trophy,
  Crown,
  Medal
} from 'lucide-react';

interface DashboardProps {
  stats: HRDashboardStats;
}

export default function Dashboard({ stats }: DashboardProps) {
  const [recentStudents, setRecentStudents] = useState<User[]>([]);
  const [recentApplications, setRecentApplications] = useState<JobApplication[]>([]);
  const [topPerformers, setTopPerformers] = useState<ResumeAnalysis[]>([]);

  useEffect(() => {
    // Fetch recent students
    const fetchRecentStudents = async () => {
      if (!db) {
        console.warn('Firebase not initialized, using sample data');
        // Use sample data for demonstration
        setRecentStudents([
          {
            id: '1',
            email: 'john.doe@example.com',
            name: 'John Doe',
            role: 'student',
            createdAt: new Date('2024-01-15'),
            lastLoginAt: new Date('2024-01-20'),
          },
          {
            id: '2',
            email: 'jane.smith@example.com',
            name: 'Jane Smith',
            role: 'student',
            createdAt: new Date('2024-01-10'),
            lastLoginAt: new Date('2024-01-19'),
          }
        ]);
        return;
      }

      try {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const students = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          lastLoginAt: doc.data().lastLoginAt?.toDate(),
        })) as User[];
        setRecentStudents(students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    // Fetch recent applications
    const fetchRecentApplications = async () => {
      if (!db) {
        setRecentApplications([
          {
            id: '1',
            userId: '1',
            jobTitle: 'Frontend Developer',
            company: 'TechCorp Inc.',
            appliedAt: new Date('2024-01-20'),
            status: 'pending',
          },
          {
            id: '2',
            userId: '2',
            jobTitle: 'Senior Java Developer',
            company: 'Enterprise Solutions',
            appliedAt: new Date('2024-01-19'),
            status: 'shortlisted',
          }
        ]);
        return;
      }

      try {
        const q = query(collection(db, 'applications'), orderBy('appliedAt', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const applications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          appliedAt: doc.data().appliedAt?.toDate(),
        })) as JobApplication[];
        setRecentApplications(applications);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    // Fetch top performers
    const fetchTopPerformers = async () => {
      if (!db) {
        setTopPerformers([
          {
            id: '1',
            userId: '1',
            fileName: 'john_doe_resume.pdf',
            analysisDate: new Date('2024-01-20'),
            score: 85,
            strengths: ['Strong technical skills', 'Good communication'],
            weaknesses: ['Limited cloud experience'],
            suggestions: ['Get AWS certification'],
            skills: ['JavaScript', 'React', 'Node.js'],
            experience: '2 years web development',
            education: 'Bachelor in Computer Science',
            summary: 'Strong candidate with solid technical foundation'
          }
        ]);
        return;
      }

      try {
        const q = query(collection(db, 'resumeAnalysis'), orderBy('score', 'desc'), limit(5));
        const snapshot = await getDocs(q);
        const analyses = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          analysisDate: doc.data().analysisDate?.toDate(),
        })) as ResumeAnalysis[];
        setTopPerformers(analyses);
      } catch (error) {
        console.error('Error fetching top performers:', error);
      }
    };

    fetchRecentStudents();
    fetchRecentApplications();
    fetchTopPerformers();
  }, []);

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Pending Reviews',
      value: stats.pendingReviews,
      icon: Clock,
      color: 'bg-yellow-500',
      change: '-5%',
      changeType: 'negative'
    },
    {
      title: 'Avg. Score',
      value: `${stats.averageScore}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+3%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className={`text-sm mt-1 ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Students */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Students</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentStudents.map((student) => (
              <div key={student.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {student.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {student.createdAt?.toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentApplications.map((application) => (
              <div key={application.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{application.jobTitle}</p>
                  <p className="text-sm text-gray-600">{application.company}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {application.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
            Top Performers
          </h3>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Leaderboard
          </button>
        </div>
        <div className="space-y-3">
          {topPerformers.map((analysis, index) => {
            const getRankIcon = (rank: number) => {
              switch (rank) {
                case 1:
                  return <Crown className="w-4 h-4 text-yellow-500" />;
                case 2:
                  return <Medal className="w-4 h-4 text-gray-400" />;
                case 3:
                  return <Award className="w-4 h-4 text-amber-600" />;
                default:
                  return <span className="w-4 h-4 flex items-center justify-center text-gray-600 font-bold text-xs">{index + 1}</span>;
              }
            };

            return (
              <div key={analysis.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                  {getRankIcon(index + 1)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Resume Analysis #{analysis.id.slice(-6)}</p>
                  <p className="text-sm text-gray-600">{analysis.summary}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{analysis.score}%</span>
                  </div>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
