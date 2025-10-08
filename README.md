# Pathify HR Dashboard

An AI-powered HR platform for student recruitment and resume analysis. This platform allows HR professionals to identify, monitor, and analyze student profiles with AI-powered resume analysis capabilities.

## Features

### 🎯 Core Features
- **Student Management**: View and manage student profiles with detailed information
- **AI Resume Analysis**: Analyze student resumes with AI-powered insights
- **Application Tracking**: Monitor job applications and their status
- **Analytics Dashboard**: Comprehensive analytics and performance metrics
- **Search & Filter**: Advanced search and filtering capabilities
- **Real-time Monitoring**: Live updates and notifications

### 📊 Dashboard Components
- **Overview Dashboard**: Key metrics and recent activity
- **Student Profiles**: Detailed student information and skills
- **Resume Analysis**: AI-powered resume scoring and insights
- **Analytics**: Performance trends and statistics
- **Search & Filter**: Advanced search functionality
- **Settings**: Configuration and preferences

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Prerequisites
- Node.js 18+ installed
- Firebase project created
- Git installed

### 2. Installation

```bash
# Clone the repository
git clone <repository-url>
cd pathify

# Install dependencies
npm install
```

### 3. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Enable Authentication (optional)
4. Get your Firebase configuration from Project Settings > General > Your apps

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Optional: Google Auth Configuration
NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_google_client_id
```

### 5. Database Setup

The application expects the following Firestore collections:

- `users`: Student and user profiles
- `resumeAnalysis`: AI resume analysis results
- `applications`: Job applications and status

#### Sample Data Structure

**Users Collection:**
```typescript
{
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
```

**Resume Analysis Collection:**
```typescript
{
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
```

**Applications Collection:**
```typescript
{
  id: string;
  userId: string;
  jobTitle: string;
  company: string;
  appliedAt: Date;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  resumeAnalysisId?: string;
}
```

### 6. Running the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## Usage

### HR Dashboard Access
- Navigate to `/hr` to access the HR dashboard
- The main page redirects to the HR dashboard by default

### Key Features Usage

1. **Student Management**
   - View all registered students
   - Filter by role, skills, or location
   - Sort by various criteria
   - Export student data

2. **Resume Analysis**
   - View AI-powered resume analysis
   - See detailed scoring and insights
   - Review strengths and weaknesses
   - Access improvement suggestions

3. **Analytics**
   - Monitor key performance metrics
   - View trends and statistics
   - Track top skills and performers
   - Generate reports

4. **Search & Filter**
   - Advanced search across all data
   - Filter by multiple criteria
   - Save search preferences
   - Export filtered results

## Development

### Project Structure
```
src/
├── app/
│   ├── hr/
│   │   └── page.tsx          # Main HR dashboard
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (redirects to HR)
├── components/
│   ├── Dashboard.tsx         # Dashboard overview
│   ├── Students.tsx          # Student management
│   ├── ResumeAnalysis.tsx    # Resume analysis view
│   └── Sidebar.tsx           # Navigation sidebar
├── lib/
│   └── firebase.ts           # Firebase configuration
├── types/
│   └── index.ts              # TypeScript type definitions
├── data/
│   └── sampleData.ts         # Sample data for testing
└── utils/
    └── seedDatabase.ts       # Database seeding utility
```

### Adding New Features

1. Create new components in `src/components/`
2. Add types to `src/types/index.ts`
3. Update the main dashboard in `src/app/hr/page.tsx`
4. Add navigation items to `src/components/Sidebar.tsx`

### Database Seeding

To populate the database with sample data:

1. Uncomment the seeding function call in `src/utils/seedDatabase.ts`
2. Run the application
3. The sample data will be automatically added to Firestore

## Deployment

### Vercel Deployment (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

### Upcoming Features
- [ ] Real-time notifications
- [ ] Advanced analytics charts
- [ ] Bulk operations
- [ ] Email integration
- [ ] Mobile app
- [ ] API endpoints
- [ ] Advanced AI features
- [ ] Multi-language support

---

**Note**: This is a demo application. For production use, ensure proper security measures, authentication, and data validation are implemented.