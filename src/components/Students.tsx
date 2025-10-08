'use client';

import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User } from '@/types';
import { 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Mail, 
  Phone,
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  User as UserIcon
} from 'lucide-react';

export default function Students() {
  const [students, setStudents] = useState<User[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    if (!db) {
      console.warn('Firebase not initialized, using sample data');
      const sampleStudents = [
        {
          id: '1',
          email: 'john.doe@example.com',
          name: 'John Doe',
          role: 'student' as const,
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
          id: '2',
          email: 'jane.smith@example.com',
          name: 'Jane Smith',
          role: 'student' as const,
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
          id: '3',
          email: 'mike.johnson@example.com',
          name: 'Mike Johnson',
          role: 'student' as const,
          createdAt: new Date('2024-01-08'),
          lastLoginAt: new Date('2024-01-18'),
          profile: {
            phone: '+1-555-0125',
            location: 'Austin, TX',
            skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
            experience: '1 year',
            education: 'Bachelor in Information Technology'
          }
        }
      ];
      setStudents(sampleStudents);
      setLoading(false);
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('role', '==', 'student'));
      const snapshot = await getDocs(q);
      const studentsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        lastLoginAt: doc.data().lastLoginAt?.toDate(),
      })) as User[];
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortStudents = useCallback(() => {
    const filtered = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'all' || student.role === filterRole;
      return matchesSearch && matchesRole;
    });

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'email':
          return a.email.localeCompare(b.email);
        case 'createdAt':
          return b.createdAt.getTime() - a.createdAt.getTime();
        case 'lastLogin':
          return b.lastLoginAt.getTime() - a.lastLoginAt.getTime();
        default:
          return 0;
      }
    });

    setFilteredStudents(filtered);
  }, [students, searchTerm, filterRole, sortBy]);

  useEffect(() => {
    filterAndSortStudents();
  }, [students, searchTerm, filterRole, sortBy, filterAndSortStudents]);

  const getStatusColor = (lastLogin: Date) => {
    const daysSinceLogin = Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceLogin <= 7) return 'bg-green-100 text-green-800';
    if (daysSinceLogin <= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusText = (lastLogin: Date) => {
    const daysSinceLogin = Math.floor((Date.now() - lastLogin.getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceLogin <= 7) return 'Active';
    if (daysSinceLogin <= 30) return 'Inactive';
    return 'Offline';
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
          <h2 className="text-2xl font-bold text-gray-900">Students</h2>
          <p className="text-gray-600 mt-1">Manage and monitor student profiles</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Add Student
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
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="email">Sort by Email</option>
            <option value="createdAt">Sort by Registration</option>
            <option value="lastLogin">Sort by Last Login</option>
          </select>

          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(student.lastLoginAt)}`}>
                {getStatusText(student.lastLoginAt)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              {student.profile?.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {student.profile.phone}
                </div>
              )}
              {student.profile?.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {student.profile.location}
                </div>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {student.createdAt.toLocaleDateString()}
              </div>
            </div>

            {student.profile?.skills && student.profile.skills.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {student.profile.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                  {student.profile.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{student.profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Eye className="w-4 h-4 mr-1" />
                View Profile
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}
