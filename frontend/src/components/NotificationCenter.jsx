import React, { useState, useEffect } from 'react';
import {
  Bell,
  X,
  Check,
  AlertCircle,
  Info,
  Award,
  BookOpen,
  Users,
  Calendar,
  MessageCircle,
  TrendingUp,
  Clock,
  Filter,
  MoreVertical,
  Archive,
  Trash2,
  Settings,
  Volume2,
  VolumeX,
  Zap,
  Star,
  Heart,
  Eye,
  EyeOff
} from 'lucide-react';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'assignment',
      title: 'New Assignment Posted',
      message: 'Machine Learning Assignment 3 has been posted. Due date: March 25, 2024',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false,
      priority: 'high',
      icon: BookOpen,
      color: 'blue',
      actionUrl: '/assignments/ml-assignment-3'
    },
    {
      id: 2,
      type: 'grade',
      title: 'Grade Published',
      message: 'Your grade for Database Systems Exam has been published: A+',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: false,
      priority: 'medium',
      icon: Award,
      color: 'green',
      actionUrl: '/grades'
    },
    {
      id: 3,
      type: 'announcement',
      title: 'Campus Event',
      message: 'Tech Fest 2024 registration is now open. Register before March 20th',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isRead: true,
      priority: 'low',
      icon: Users,
      color: 'purple',
      actionUrl: '/events/tech-fest-2024'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Class Reminder',
      message: 'Computer Networks class starts in 30 minutes - Room 204',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      isRead: false,
      priority: 'high',
      icon: Clock,
      color: 'orange',
      actionUrl: '/schedule'
    },
    {
      id: 5,
      type: 'message',
      title: 'New Message',
      message: 'Dr. Priya Sharma sent you a message regarding your project proposal',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      isRead: true,
      priority: 'medium',
      icon: MessageCircle,
      color: 'cyan',
      actionUrl: '/messages'
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Achievement Unlocked!',
      message: 'Congratulations! You\'ve earned the "Study Streak" badge for 30 consecutive days',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      isRead: false,
      priority: 'medium',
      icon: Star,
      color: 'yellow',
      actionUrl: '/achievements'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
  }, []);

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        type: 'system',
        title: 'System Update',
        message: 'Your profile has been automatically synced',
        timestamp: new Date(),
        isRead: false,
        priority: 'low',
        icon: Zap,
        color: 'indigo',
        actionUrl: '/profile'
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 9)]);
      setUnreadCount(prev => prev + 1);
      
      if (soundEnabled) {
        // Play notification sound (you would implement actual sound here)
        console.log('🔔 Notification sound played');
      }
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  }, [soundEnabled]);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === id);
      if (notification && !notification.isRead) {
        setUnreadCount(count => Math.max(0, count - 1));
      }
      return prev.filter(n => n.id !== id);
    });
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-400/50 bg-red-500/10';
      case 'medium': return 'border-yellow-400/50 bg-yellow-500/10';
      case 'low': return 'border-gray-400/50 bg-gray-500/10';
      default: return 'border-cyan-400/50 bg-cyan-500/10';
    }
  };

  return (
    <>
      {/* Notification Bell Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all hover:scale-105 group"
        >
          <Bell className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Notification Panel */}
          <div className="fixed top-20 right-6 w-96 max-h-[80vh] card-black neon-border z-50 animate-slide-up">
            {/* Header */}
            <div className="p-6 border-b border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center">
                  <Bell className="w-6 h-6 mr-3 text-cyan-400" />
                  Notifications
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-5 h-5 text-cyan-400" />
                    ) : (
                      <VolumeX className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: 'all', label: 'All', count: notifications.length },
                  { id: 'unread', label: 'Unread', count: unreadCount },
                  { id: 'assignment', label: 'Assignments', count: notifications.filter(n => n.type === 'assignment').length },
                  { id: 'grade', label: 'Grades', count: notifications.filter(n => n.type === 'grade').length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFilter(tab.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                      filter === tab.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-400/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span className="ml-2 bg-gray-700 text-xs px-2 py-1 rounded-full">
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Actions */}
              {unreadCount > 0 && (
                <div className="mt-4">
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Mark all as read
                  </button>
                </div>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">No notifications</p>
                  <p className="text-sm text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-800">
                  {filteredNotifications.map((notification) => {
                    const IconComponent = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-800/50 transition-all cursor-pointer group ${
                          !notification.isRead ? 'bg-cyan-500/5' : ''
                        }`}
                        onClick={() => !notification.isRead && markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className={`p-2 rounded-lg bg-${notification.color}-500/20 border border-${notification.color}-400/30 flex-shrink-0`}>
                            <IconComponent className={`w-5 h-5 text-${notification.color}-400`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className={`font-semibold ${!notification.isRead ? 'text-white' : 'text-gray-300'}`}>
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="text-xs text-gray-500">
                                    {formatTimeAgo(notification.timestamp)}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(notification.priority)}`}>
                                    {notification.priority}
                                  </span>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {!notification.isRead && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    className="p-1 rounded hover:bg-gray-700 transition-colors"
                                    title="Mark as read"
                                  >
                                    <Eye className="w-4 h-4 text-gray-400" />
                                  </button>
                                )}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 rounded hover:bg-gray-700 transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-gray-400" />
                                </button>
                              </div>
                            </div>

                            {/* Unread Indicator */}
                            {!notification.isRead && (
                              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-800">
              <button className="w-full text-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors font-medium">
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NotificationCenter;