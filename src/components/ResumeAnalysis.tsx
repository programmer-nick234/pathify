'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ResumeAnalysis, User } from '@/types';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  TrendingUp,
  TrendingDown,
  FileText,
  Calendar,
  Award,
  Target,
  Lightbulb,
  X
} from 'lucide-react';

export default function ResumeAnalysisView() {
  const [analyses, setAnalyses] = useState<ResumeAnalysis[]>([]);
  const [filteredAnalyses, setFilteredAnalyses] = useState<ResumeAnalysis[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState('all');
  const [sortBy, setSortBy] = useState('score');
  const [selectedAnalysis, setSelectedAnalysis] = useState<ResumeAnalysis | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!db) {
      console.warn('Firebase not initialized, using sample data');
      const sampleAnalyses = [
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
        },
        {
          id: '2',
          userId: '2',
          fileName: 'jane_smith_resume.pdf',
          analysisDate: new Date('2024-01-19'),
          score: 92,
          strengths: ['Excellent Java skills', 'Strong experience'],
          weaknesses: ['Limited frontend experience'],
          suggestions: ['Learn React or Angular'],
          skills: ['Java', 'Spring Boot', 'MySQL'],
          experience: '3 years Java development',
          education: 'Master in Software Engineering',
          summary: 'Exceptional candidate with strong technical skills'
        }
      ];

      const sampleStudents = [
        {
          id: '1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          role: 'student' as const,
          createdAt: new Date('2024-01-15'),
          lastLoginAt: new Date('2024-01-20'),
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          role: 'student' as const,
          createdAt: new Date('2024-01-10'),
          lastLoginAt: new Date('2024-01-19'),
        }
      ];

      setAnalyses(sampleAnalyses);
      setStudents(sampleStudents);
      setLoading(false);
      return;
    }

    try {
      // Fetch resume analyses
      const analysesQuery = query(collection(db, 'resumeAnalysis'), orderBy('analysisDate', 'desc'));
      const analysesSnapshot = await getDocs(analysesQuery);
      const analysesData = analysesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        analysisDate: doc.data().analysisDate?.toDate(),
      })) as ResumeAnalysis[];

      // Fetch students
      const studentsQuery = query(collection(db, 'users'), where('role', '==', 'student'));
      const studentsSnapshot = await getDocs(studentsQuery);
      const studentsData = studentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastLoginAt: doc.data().lastLoginAt?.toDate(),
      })) as User[];

      setAnalyses(analysesData);
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortAnalyses = useCallback(() => {
    const filtered = analyses.filter(analysis => {
      const student = students.find(s => s.id === analysis.userId);
      const matchesSearch = !searchTerm || 
        analysis.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student && student.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesScore = filterScore === 'all' || 
        (filterScore === 'high' && analysis.score >= 80) ||
        (filterScore === 'medium' && analysis.score >= 60 && analysis.score < 80) ||
        (filterScore === 'low' && analysis.score < 60);
      
      return matchesSearch && matchesScore;
    });

    // Sort analyses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.score - a.score;
        case 'date':
          return b.analysisDate.getTime() - a.analysisDate.getTime();
        case 'name':
          const studentA = students.find(s => s.id === a.userId);
          const studentB = students.find(s => s.id === b.userId);
          return (studentA?.name || '').localeCompare(studentB?.name || '');
        default:
          return 0;
      }
    });

    setFilteredAnalyses(filtered);
  }, [analyses, students, searchTerm, filterScore, sortBy]);

  useEffect(() => {
    filterAndSortAnalyses();
  }, [analyses, searchTerm, filterScore, sortBy, filterAndSortAnalyses]);

  const getStudentName = (userId: string) => {
    const student = students.find(s => s.id === userId);
    return student?.name || 'Unknown Student';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="w-4 h-4" />;
    if (score >= 60) return <Target className="w-4 h-4" />;
    return <TrendingDown className="w-4 h-4" />;
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
          <h2 className="text-2xl font-bold text-gray-900">Resume Analysis</h2>
          <p className="text-gray-600 mt-1">AI-powered resume analysis and insights</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Reports
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterScore}
            onChange={(e) => setFilterScore(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Scores</option>
            <option value="high">High (80%+)</option>
            <option value="medium">Medium (60-79%)</option>
            <option value="low">Low (&lt;60%)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="score">Sort by Score</option>
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Student</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnalyses.map((analysis) => (
          <div key={analysis.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{getStudentName(analysis.userId)}</h3>
                  <p className="text-sm text-gray-600">{analysis.fileName}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getScoreColor(analysis.score)}`}>
                {getScoreIcon(analysis.score)}
                <span>{analysis.score}%</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                {analysis.analysisDate.toLocaleDateString()}
              </div>
              
              {analysis.skills && analysis.skills.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {analysis.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {analysis.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{analysis.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-start space-x-2">
                <Award className="w-4 h-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Strengths</p>
                  <p className="text-xs text-gray-600">{analysis.strengths.slice(0, 2).join(', ')}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Target className="w-4 h-4 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Areas to Improve</p>
                  <p className="text-xs text-gray-600">{analysis.weaknesses.slice(0, 2).join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedAnalysis(analysis)}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Eye className="w-4 h-4 mr-1" />
                View Details
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAnalyses.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Analysis Detail Modal */}
      {selectedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Resume Analysis Details</h3>
                <button 
                  onClick={() => setSelectedAnalysis(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Score and Overview */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Overall Score</h4>
                    <div className="flex items-center space-x-3">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold ${getScoreColor(selectedAnalysis.score)}`}>
                        {selectedAnalysis.score}%
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{getStudentName(selectedAnalysis.userId)}</p>
                        <p className="text-sm text-gray-600">{selectedAnalysis.fileName}</p>
                        <p className="text-sm text-gray-500">{selectedAnalysis.analysisDate.toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Summary</h4>
                    <p className="text-gray-700">{selectedAnalysis.summary}</p>
                  </div>
                </div>

                {/* Skills and Experience */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Skills Identified</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAnalysis.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
                    <p className="text-gray-700">{selectedAnalysis.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
                    <p className="text-gray-700">{selectedAnalysis.education}</p>
                  </div>
                </div>
              </div>

              {/* Strengths and Weaknesses */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Award className="w-5 h-5 text-green-500 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {selectedAnalysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Target className="w-5 h-5 text-yellow-500 mr-2" />
                    Areas to Improve
                  </h4>
                  <ul className="space-y-2">
                    {selectedAnalysis.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <span className="text-gray-700">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Suggestions */}
              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Lightbulb className="w-5 h-5 text-blue-500 mr-2" />
                  Suggestions
                </h4>
                <ul className="space-y-2">
                  {selectedAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setSelectedAnalysis(null)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
