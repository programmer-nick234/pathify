#!/bin/bash

# Production Build Script for Pathify HR Dashboard
# This script prepares the application for deployment

echo "🚀 Starting production build process..."
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for environment variables
echo "🔧 Checking environment configuration..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found. Using deployment.env..."
    if [ -f "deployment.env" ]; then
        cp deployment.env .env.local
        echo "✅ Environment variables copied from deployment.env"
    else
        echo "❌ Error: No environment configuration found!"
        echo "Please create .env.local or deployment.env with Firebase configuration."
        exit 1
    fi
fi

# Run linting
echo "🔍 Running code quality checks..."
npm run lint

# Build the application
echo "🏗️  Building application for production..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📊 Build Summary:"
    echo "- Application built for production"
    echo "- Static files generated in .next/ directory"
    echo "- Ready for deployment"
    echo ""
    echo "🚀 Deployment Options:"
    echo "1. Vercel: vercel --prod"
    echo "2. Netlify: netlify deploy --prod"
    echo "3. Static hosting: Copy .next/static and public/ to your server"
    echo ""
    echo "📝 Next Steps:"
    echo "1. Enable Firestore in Firebase Console"
    echo "2. Set up security rules"
    echo "3. Deploy to your chosen platform"
    echo "4. Configure environment variables in production"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

echo "🎉 Production build process completed!"

