export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'hr' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
  profile?: {
    phone?: string;
    location?: string;
    skills?: string[];
    experience?: string;
    education?: string;
  };
}

export interface ResumeAnalysis {
  id: string;
  userId: string;
  fileName: string;
  analysisDate: Date;
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  skills: string[];
  experience: string;
  education: string;
  summary: string;
}

export interface JobApplication {
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  resumeAnalysisId?: string;
}

export interface HRDashboardStats {
  totalStudents: number;
  totalApplications: number;
  pendingReviews: number;
  averageScore: number;
  topSkills: { skill: string; count: number }[];
}
