'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, WifiOff, Database, CheckCircle } from 'lucide-react';

interface ConnectionStatusProps {
  onRetry?: () => void;
}

export default function ConnectionStatus({ onRetry }: ConnectionStatusProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [firebaseStatus, setFirebaseStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check Firebase connection
    checkFirebaseConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkFirebaseConnection = async () => {
    try {
      setFirebaseStatus('checking');
      
      // Import Firebase dynamically to avoid SSR issues
      const { isFirebaseConnected, getFirebaseError } = await import('@/lib/firebase');
      
      if (isFirebaseConnected()) {
        setFirebaseStatus('connected');
        setErrorMessage('');
      } else {
        setFirebaseStatus('error');
        setErrorMessage(getFirebaseError() || 'Firebase connection failed');
      }
    } catch (error) {
      setFirebaseStatus('error');
      setErrorMessage('Failed to check Firebase connection');
    }
  };

  const getStatusIcon = () => {
    if (!isOnline) return <WifiOff className="w-5 h-5 text-red-500" />;
    if (firebaseStatus === 'connected') return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (firebaseStatus === 'error') return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    return <Database className="w-5 h-5 text-blue-500 animate-spin" />;
  };

  const getStatusText = () => {
    if (!isOnline) return 'Offline - Check your internet connection';
    if (firebaseStatus === 'connected') return 'All systems connected';
    if (firebaseStatus === 'error') return 'Using offline mode with sample data';
    return 'Checking connection...';
  };

  const getStatusColor = () => {
    if (!isOnline) return 'bg-red-50 border-red-200 text-red-800';
    if (firebaseStatus === 'connected') return 'bg-green-50 border-green-200 text-green-800';
    if (firebaseStatus === 'error') return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    return 'bg-blue-50 border-blue-200 text-blue-800';
  };

  if (isOnline && firebaseStatus === 'connected') {
    return null; // Don't show status when everything is working
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg border-2 shadow-lg ${getStatusColor()}`}>
      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <div className="flex-1">
          <p className="font-medium">{getStatusText()}</p>
          {errorMessage && (
            <p className="text-sm opacity-75 mt-1">{errorMessage}</p>
          )}
        </div>
        {onRetry && firebaseStatus === 'error' && (
          <button
            onClick={onRetry}
            className="px-3 py-1 bg-white bg-opacity-50 rounded text-sm font-medium hover:bg-opacity-75 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
