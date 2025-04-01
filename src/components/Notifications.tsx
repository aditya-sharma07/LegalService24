import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Calendar, Gavel, FileText, MessageSquare, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  type: 'appointment' | 'case_update' | 'document' | 'message' | 'legal_update';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

const Notifications: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'appointment',
      title: 'Upcoming Consultation',
      description: 'Your consultation with Sarah Johnson is scheduled for tomorrow at 2:00 PM.',
      timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000),
      read: false,
      priority: 'high',
      actionUrl: '/appointments'
    },
    {
      id: '2',
      type: 'case_update',
      title: 'Case Status Update',
      description: 'New documents have been filed in your property dispute case.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: 'high',
      actionUrl: '/case-tracking'
    },
    {
      id: '3',
      type: 'document',
      title: 'Document Review Complete',
      description: 'Your contract has been reviewed. Click to view comments.',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: true,
      priority: 'medium',
      actionUrl: '/documents'
    },
    {
      id: '4',
      type: 'message',
      title: 'New Message from Lawyer',
      description: 'Michael Chen has sent you a message regarding your case.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: false,
      priority: 'medium',
      actionUrl: '/messages'
    },
    {
      id: '5',
      type: 'legal_update',
      title: 'Important Legal Update',
      description: 'New regulations affecting your business sector have been announced.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: true,
      priority: 'low',
      actionUrl: '/legal-updates'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className="w-6 h-6 text-blue-600" />;
      case 'case_update':
        return <Gavel className="w-6 h-6 text-purple-600" />;
      case 'document':
        return <FileText className="w-6 h-6 text-green-600" />;
      case 'message':
        return <MessageSquare className="w-6 h-6 text-orange-600" />;
      case 'legal_update':
        return <Bell className="w-6 h-6 text-red-600" />;
      default:
        return <Bell className="w-6 h-6 text-gray-600" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (hours >= 24) {
      return format(timestamp, 'MMM d, yyyy');
    } else if (hours >= 1) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes >= 1) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
      return 'Just now';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    filter === 'all' || (filter === 'unread' && !notification.read)
  );

  const handleNotificationClick = (actionUrl: string | undefined) => {
    if (actionUrl) {
      navigate(actionUrl);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <XCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Notifications</h1>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in to view your notifications.
            </p>
            <button 
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Notifications</h1>
              <div className="flex items-center space-x-4">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'unread')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread Only</option>
                </select>
                <button
                  onClick={() => {/* Mark all as read */}}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No notifications to display
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleNotificationClick(notification.actionUrl)}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h2 className="text-lg font-semibold text-gray-900">
                            {notification.title}
                          </h2>
                          {!notification.read && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              New
                            </span>
                          )}
                          <div className="ml-2">
                            {getPriorityIcon(notification.priority)}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-600">{notification.description}</p>
                      {notification.actionUrl && (
                        <div className="mt-3">
                          <button
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            View Details →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;