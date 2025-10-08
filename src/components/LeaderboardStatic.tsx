'use client';

import { useState, useEffect } from 'react';
import { sortedLeaderboardData, leaderboardStats } from '@/data/staticLeaderboardData';
import { 
  Trophy, 
  Medal, 
  Award, 
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Lightbulb,
  X,
  Crown
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
  const [selectedStudent, setSelectedStudent] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    setLoading(true);
    
    try {
      console.log('Using static leaderboard data with real Firebase users');
      
      // Convert static data to LeaderboardEntry format
      const leaderboardEntries: LeaderboardEntry[] = sortedLeaderboardData.map((student, index) => ({
        id: student.id,
        name: student.name,
        email: student.email,
        score: student.score,
        rank: index + 1,
        totalApplications: student.applicationsCount,
        skills: student.profile.skills,
        experience: student.profile.experience,
        education: student.profile.education,
        lastActivity: student.lastLoginAt,
        profile: {
          location: student.profile.location,
          phone: student.profile.phone
        },
        achievements: student.achievements,
        trend: student.trend
      }));
      
      setLeaderboardData(leaderboardEntries);
    } catch (err) {
      console.error('Error loading leaderboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500 fill-current" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400 fill-current" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600 fill-current" />;
      default:
        return <span className="text-xl font-bold text-gray-700">{rank}</span>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Trophy className="w-7 h-7 text-yellow-500 mr-3" />
        Student Leaderboard
      </h2>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{leaderboardStats.totalStudents}</div>
          <div className="text-sm text-blue-800">Total Students</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-green-600">{leaderboardStats.averageScore}%</div>
          <div className="text-sm text-green-800">Average Score</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-yellow-600">{leaderboardStats.topScore}%</div>
          <div className="text-sm text-yellow-800">Top Score</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="text-2xl font-bold text-purple-600">{leaderboardStats.totalApplications}</div>
          <div className="text-sm text-purple-800">Total Applications</div>
        </div>
      </div>

      {loading && <div className="text-center text-gray-600">Loading leaderboard...</div>}

      {!loading && leaderboardData.length > 0 && (
        <>
          {/* Top 3 Podium */}
          <div className="flex justify-center items-end mb-8 space-x-4">
            {leaderboardData[1] && (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-semibold mb-2">
                  {getRankIcon(2)}
                </div>
                <p className="font-semibold text-gray-800">{leaderboardData[1].name}</p>
                <p className="text-sm text-gray-600">{leaderboardData[1].email}</p>
                <p className={`text-xl font-bold ${getScoreColor(leaderboardData[1].score)}`}>{leaderboardData[1].score}%</p>
              </div>
            )}
            {leaderboardData[0] && (
              <div className="flex flex-col items-center relative -top-4">
                <div className="w-32 h-32 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-700 text-2xl font-bold mb-2 border-4 border-yellow-500">
                  {getRankIcon(1)}
                </div>
                <p className="font-bold text-xl text-gray-900">{leaderboardData[0].name}</p>
                <p className="text-md text-gray-700">{leaderboardData[0].email}</p>
                <p className={`text-2xl font-extrabold ${getScoreColor(leaderboardData[0].score)}`}>{leaderboardData[0].score}%</p>
              </div>
            )}
            {leaderboardData[2] && (
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center text-amber-700 text-lg font-semibold mb-2">
                  {getRankIcon(3)}
                </div>
                <p className="font-semibold text-gray-800">{leaderboardData[2].name}</p>
                <p className="text-sm text-gray-600">{leaderboardData[2].email}</p>
                <p className={`text-xl font-bold ${getScoreColor(leaderboardData[2].score)}`}>{leaderboardData[2].score}%</p>
              </div>
            )}
          </div>

          {/* Full Leaderboard List */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">All Rankings</h3>
            <div className="space-y-4">
              {leaderboardData.map((student) => (
                <div
                  key={student.id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="w-10 text-center mr-4">
                    {getRankIcon(student.rank)}
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                    <div>
                      <p className="font-medium text-gray-900">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className={`text-sm font-bold ${getScoreColor(student.score)}`}>{student.score}%</span>
                      {getTrendIcon(student.trend)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Applications: {student.totalApplications}
                    </div>
                  </div>
                  <button
                    className="ml-4 p-2 rounded-full hover:bg-blue-100 text-blue-600"
                    onClick={(e) => { e.stopPropagation(); setSelectedStudent(student); }}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="text-2xl font-bold text-gray-900">Student Profile: {selectedStudent.name}</h3>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-700 mb-2"><Mail className="inline-block w-4 h-4 mr-2 text-blue-500" /> <span className="font-semibold">Email:</span> {selectedStudent.email}</p>
                {selectedStudent.profile?.phone && <p className="text-gray-700 mb-2"><Phone className="inline-block w-4 h-4 mr-2 text-blue-500" /> <span className="font-semibold">Phone:</span> {selectedStudent.profile.phone}</p>}
                {selectedStudent.profile?.location && <p className="text-gray-700 mb-2"><MapPin className="inline-block w-4 h-4 mr-2 text-blue-500" /> <span className="font-semibold">Location:</span> {selectedStudent.profile.location}</p>}
                <p className="text-gray-700 mb-2"><Star className="inline-block w-4 h-4 mr-2 text-yellow-500" /> <span className="font-semibold">AI Score:</span> <span className={`font-bold ${getScoreColor(selectedStudent.score)}`}>{selectedStudent.score}%</span></p>
                <p className="text-gray-700 mb-2"><Briefcase className="inline-block w-4 h-4 mr-2 text-green-500" /> <span className="font-semibold">Applications:</span> {selectedStudent.totalApplications}</p>
              </div>
              <div>
                <p className="text-gray-700 mb-2"><Briefcase className="inline-block w-4 h-4 mr-2 text-purple-500" /> <span className="font-semibold">Experience:</span> {selectedStudent.experience}</p>
                <p className="text-gray-700 mb-2"><GraduationCap className="inline-block w-4 h-4 mr-2 text-purple-500" /> <span className="font-semibold">Education:</span> {selectedStudent.education}</p>
                {selectedStudent.skills && selectedStudent.skills.length > 0 && (
                  <p className="text-gray-700 mb-2"><Lightbulb className="inline-block w-4 h-4 mr-2 text-orange-500" /> <span className="font-semibold">Skills:</span> {selectedStudent.skills.join(', ')}</p>
                )}
              </div>
            </div>

            <div className="mt-4 border-t pt-4">
              <h4 className="text-xl font-semibold text-gray-800 mb-3">Achievements</h4>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.achievements.map((achievement, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
