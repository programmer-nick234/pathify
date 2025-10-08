# 🚀 Pathify HR Dashboard

A comprehensive AI-powered HR platform for student recruitment and resume analysis, built with Next.js 15, React 19, TypeScript, and Firebase.

## ✨ Features

### 🎯 **Core Features**
- **📊 HR Dashboard**: Complete overview with real-time metrics
- **👥 Student Management**: View and manage student profiles
- **🏆 Leaderboard**: AI-powered rankings with Firebase data
- **📄 Resume Analysis**: Detailed AI insights and scoring
- **📈 Analytics**: Performance trends and statistics
- **🔍 Search & Filter**: Advanced search capabilities

### 🔥 **Technical Features**
- **⚡ Real-time Data**: Live updates from Firebase Firestore
- **🛡️ Error Handling**: Graceful fallbacks for offline mode
- **📱 Responsive Design**: Works perfectly on all devices
- **🎨 Modern UI**: Beautiful interface with Tailwind CSS
- **🔒 Type Safety**: Full TypeScript implementation
- **⚡ Performance**: Optimized for fast loading

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Deployment**: Vercel/Netlify Ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/programmer-nick234/pathify.git
   cd pathify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp deployment.env .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000/hr
   ```

## 🔥 Firebase Setup

### 1. Enable Firestore Database
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select project: `pathify-6619e`
3. Go to **Firestore Database**
4. Click **Create database**
5. Choose **Start in test mode**

### 2. Set Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // For development
    }
  }
}
```

## 📁 Project Structure

```
pathify/
├── src/
│   ├── app/
│   │   ├── hr/                 # HR Dashboard pages
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── Dashboard.tsx       # Main dashboard
│   │   ├── Students.tsx       # Student management
│   │   ├── Leaderboard.tsx    # Rankings
│   │   ├── ResumeAnalysis.tsx # AI analysis
│   │   ├── Sidebar.tsx        # Navigation
│   │   └── ConnectionStatus.tsx # Status indicator
│   ├── lib/
│   │   └── firebase.ts         # Firebase configuration
│   ├── types/
│   │   └── index.ts            # TypeScript types
│   ├── data/
│   │   └── sampleData.ts       # Sample data
│   └── utils/
│       ├── firebaseConnectionTest.ts
│       ├── seedDatabase.ts
│       └── leaderboardDemo.ts
├── public/                     # Static assets
├── .env.local                 # Environment variables
├── build-production.sh        # Production build script
└── README.md                  # This file
```

## 🚀 Deployment

### Production Build
```bash
./build-production.sh
```

### Deploy to Vercel
```bash
npx vercel --prod
```

### Deploy to Netlify
```bash
npx netlify deploy --prod
```

## 📊 Features Overview

### 🎯 HR Dashboard
- Real-time metrics and statistics
- Top performers showcase
- Recent activity feed
- Quick action buttons

### 👥 Student Management
- Complete student profiles
- Search and filter capabilities
- Role-based access control
- Activity tracking

### 🏆 Leaderboard
- AI-powered rankings
- Real-time score updates
- Detailed student profiles
- Achievement tracking

### 📄 Resume Analysis
- AI-powered scoring system
- Detailed insights and suggestions
- Strengths and weaknesses analysis
- Improvement recommendations

### 📈 Analytics
- Performance trends
- Skill distribution
- Application statistics
- Interactive charts

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🐛 Troubleshooting

### Common Issues

#### Firebase Connection Issues
- Ensure Firestore is enabled in Firebase Console
- Check security rules allow read/write access
- Verify environment variables are correct

#### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors with `npm run build`
- Verify all imports are correct

#### Infinite Loop Errors
- Fixed with `useCallback` hooks in filter functions
- Ensure proper dependency arrays in `useEffect`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Built with Next.js and React
- Powered by Firebase
- Styled with Tailwind CSS
- Icons by Lucide React

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the documentation
- Review the troubleshooting guide

---

**🚀 Ready to revolutionize HR management? Deploy Pathify HR Dashboard today!**