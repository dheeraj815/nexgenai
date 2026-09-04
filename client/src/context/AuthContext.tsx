import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api';

export interface UserProfile {
  id: string;
  userId: string;
  academicStage: string; // CLASS_11, CLASS_12, YEAR_1, YEAR_2, YEAR_3, YEAR_4, INTERNSHIP, PLACEMENT, CAREER
  institutionName?: string;
  degree?: string;
  branch?: string;
  graduationYear?: number;
  cgpa?: number;
  backlogs: number;
  location?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  targetRole?: string;
  readinessScore: number;
  onboardingCompleted: boolean;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'STUDENT' | 'COLLEGE_ADMIN' | 'TPO' | 'FACULTY' | 'RECRUITER' | 'SUPER_ADMIN';
  avatarUrl?: string;
  phone?: string;
  profile?: UserProfile;
  portfolioProfile?: { isPublic: boolean; theme: string };
  recruiterProfile?: { organizationId: string; organization: { name: string } };
  skillsCount?: number;
  projectsCount?: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: any) => Promise<boolean>;
  refreshUser: () => Promise<void>;
  viewRole: string;
  setViewRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('nexgenai_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewRole, setViewRole] = useState<string>('STUDENT');

  const refreshUser = async () => {
    const savedToken = localStorage.getItem('nexgenai_token');
    if (!savedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const res = await apiRequest('/auth/me');
    if (res.success && res.data?.user) {
      setUser(res.data.user);
      setViewRole(res.data.user.role);
    } else {
      setUser(null);
      localStorage.removeItem('nexgenai_token');
      localStorage.removeItem('nexgenai_user');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    const res = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password: pass }),
    });

    if (res.success && res.data?.token) {
      localStorage.setItem('nexgenai_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setViewRole(res.data.user.role);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: res.error || 'Invalid credentials' };
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    const res = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.success && res.data?.token) {
      localStorage.setItem('nexgenai_token', res.data.token);
      setToken(res.data.token);
      setUser(res.data.user);
      setViewRole(res.data.user.role);
      setIsLoading(false);
      return { success: true };
    } else {
      setIsLoading(false);
      return { success: false, error: res.error || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('nexgenai_token');
    localStorage.removeItem('nexgenai_user');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    const res = await apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (res.success && res.data?.user) {
      setUser(res.data.user);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
        viewRole,
        setViewRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};