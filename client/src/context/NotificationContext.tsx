import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api';
import { useAuth } from './AuthContext';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  category: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  toast: (title: string, message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  activeToast: { title: string; message: string; type: string } | null;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [activeToast, setActiveToast] = useState<{ title: string; message: string; type: string } | null>(null);

  const refreshNotifications = async () => {
    if (!user) return;
    const res = await apiRequest('/notifications');
    if (res.success && res.data) {
      setNotifications(res.data.notifications || []);
      setUnreadCount(res.data.unreadCount || 0);
    }
  };

  useEffect(() => {
    if (user) {
      refreshNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  const markAsRead = async (id: string) => {
    await apiRequest(`/notifications/${id}/read`, { method: 'POST' });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const toast = (title: string, message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    setActiveToast({ title, message, type });
    setTimeout(() => {
      setActiveToast(null);
    }, 4000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        refreshNotifications,
        toast,
        activeToast,
      }}
    >
      {children}
      {activeToast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-dark-850 border border-slate-700/60 shadow-2xl rounded-xl p-4 flex items-start space-x-3 transition-all transform translate-y-0">
          <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
            activeToast.type === 'success' ? 'bg-emerald-400' : (activeToast.type === 'error' ? 'bg-rose-500' : 'bg-brand-400')
          }`} />
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-white">{activeToast.title}</h4>
            <p className="text-xs text-slate-300 mt-0.5">{activeToast.message}</p>
          </div>
          <button
            onClick={() => setActiveToast(null)}
            className="text-slate-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationProvider');
  return context;
};