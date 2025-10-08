'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HRDashboardStats } from '@/types';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import Students from '@/components/Students';
import ResumeAnalysis from '@/components/ResumeAnalysis';
import Leaderboard from '@/components/Leaderboard';
import ConnectionStatus from '@/components/ConnectionStatus';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText,
  Activity,
  Clock,
  Target,
  Award
} from 'lucide-react';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<HRDashboardStats>({
    totalStudents: 0,
    totalApplications: 0,
    pendingReviews: 0,
    averageScore: 0,
    topSkills: []
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    if (!db) {
      console.warn('Firebase not initialized, using sample stats');
      setStats({
        totalStudents: 5,
        totalApplications: 8,
        pendingReviews: 3,
        averageScore: 87,
        topSkills: [
          { skill: 'JavaScript', count: 4 },
          { skill: 'React', count: 3 },
          { skill: 'Python', count: 3 },
          { skill: 'Java', count: 2 },
          { skill: 'Node.js', count: 2 }
        ]
      });
      return;
    }

    try {
      // Fetch students count
      const studentsQuery = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsCount = studentsSnapshot.docs.length;

      // Fetch applications count
      const applicationsQuery = query(collection(db, 'applications'), orderBy('appliedAt', 'desc'));
      const applicationsSnapshot = await getDocs(applicationsQuery);
      const applicationsCount = applicationsSnapshot.docs.length;

      // Calculate pending reviews
      const pendingApplications = applicationsSnapshot.docs.filter(
        doc => doc.data().status === 'pending'
      ).length;

      // Fetch resume analyses for average score
      const analysesQuery = query(collection(db, 'resumeAnalysis'), orderBy('score', 'desc'));
      const analysesSnapshot = await getDocs(analysesQuery);
      const analyses = analysesSnapshot.docs.map(doc => doc.data());
      
      const averageScore = analyses.length > 0 
        ? Math.round(analyses.reduce((sum, analysis) => sum + analysis.score, 0) / analyses.length)
        : 0;

      // Calculate top skills
      const skillCounts: { [key: string]: number } = {};
      analyses.forEach(analysis => {
        if (analysis.skills) {
          analysis.skills.forEach((skill: string) => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
          });
        }
      });

      const topSkills = Object.entries(skillCounts)
        .map(([skill, count]) => ({ skill, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        totalStudents: studentsCount,
        totalApplications: applicationsCount,
        pendingReviews: pendingApplications,
        averageScore,
        topSkills
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'students':
        return <Students />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'applications':
        return <ResumeAnalysis />;
      case 'analytics':
        return <Analytics stats={stats} />;
      case 'search':
        return <SearchAndFilter />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 overflow-y-auto lg:ml-64">
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
      <ConnectionStatus />
    </div>
  );
}

// Analytics Component
function Analytics({ stats }: { stats: HRDashboardStats }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>
          <p className="text-gray-600 mt-1">Performance insights and trends</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalStudents}</p>
              <p className="text-green-600 text-sm mt-1">+12% from last month</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Applications</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalApplications}</p>
              <p className="text-green-600 text-sm mt-1">+8% from last month</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Avg. Score</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.averageScore}%</p>
              <p className="text-green-600 text-sm mt-1">+3% from last month</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingReviews}</p>
              <p className="text-red-600 text-sm mt-1">-5% from last month</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Skills */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Skills</h3>
        <div className="space-y-3">
          {stats.topSkills.map((skill, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <span className="font-medium text-gray-900">{skill.skill}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(skill.count / stats.topSkills[0]?.count) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{skill.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trends</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Chart visualization would go here</p>
            <p className="text-sm text-gray-500">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Search and Filter Component
function SearchAndFilter() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Search & Filter</h2>
          <p className="text-gray-600 mt-1">Advanced search and filtering options</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Search</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search Term</label>
            <input
              type="text"
              placeholder="Enter search term..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Categories</option>
              <option>Students</option>
              <option>Applications</option>
              <option>Resume Analysis</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Search
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
}

// Settings Component
function Settings() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Configure your HR dashboard preferences</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Email Notifications</p>
              <p className="text-sm text-gray-600">Receive email updates for new applications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Auto-refresh Data</p>
              <p className="text-sm text-gray-600">Automatically refresh dashboard data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
