import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest } from '../api';

export interface UserProfile {
  id: string;
  userId: string;
  academicStage: string;
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

// Normalize backend snake_case user object → frontend camelCase User shape
function mapUser(raw: any): User {
  const fullName: string = raw?.full_name || raw?.fullName || '';
  const parts = fullName.trim().split(' ');
  const firstName = raw?.firstName || parts[0] || '';
  const lastName = raw?.lastName || parts.slice(1).join(' ') || '';

  const profile = raw?.profile;
  let mappedProfile: UserProfile | undefined;
  if (profile) {
    mappedProfile = {
      id: profile.id || '',
      userId: profile.user_id || profile.userId || raw?.id || '',
      academicStage: profile.academic_stage || profile.academicStage || 'COLLEGE_YEAR_1',
      institutionName: profile.institution || profile.institutionName,
      degree: profile.degree,
      branch: profile.department || profile.branch,
      graduationYear: profile.graduation_year || profile.graduationYear,
      cgpa: profile.cgpa,
      backlogs: profile.backlogs || 0,
      location: profile.location,
      bio: profile.bio,
      githubUrl: profile.github_url || profile.githubUrl,
      linkedinUrl: profile.linkedin_url || profile.linkedinUrl,
      portfolioUrl: profile.portfolio_url || profile.portfolioUrl,
      targetRole: profile.target_role || profile.targetRole,
      readinessScore: profile.readiness_score || profile.readinessScore || 0,
      onboardingCompleted: profile.is_onboarded || profile.onboardingCompleted || false,
    };
  }

  return {
    id: raw?.id || '',
    email: raw?.email || '',
    firstName,
    lastName,
    role: raw?.role || 'STUDENT',
    avatarUrl: raw?.avatar_url || raw?.avatarUrl,
    phone: raw?.phone,
    profile: mappedProfile,
  };
}

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
    // /auth/me returns a flat user object (not nested under .user)
    if (res.success && res.data?.id) {
      const mapped = mapUser(res.data);
      setUser(mapped);
      setViewRole(mapped.role);
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

    const authToken = res.data?.access_token || res.data?.token;
    if (res.success && authToken) {
      localStorage.setItem('nexgenai_token', authToken);
      setToken(authToken);
      // login returns { access_token, user: { id, email, role, full_name, ... } }
      const mapped = mapUser(res.data?.user || res.data);
      setUser(mapped);
      setViewRole(mapped.role);
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

    const authToken = res.data?.access_token || res.data?.token;
    if (res.success && authToken) {
      localStorage.setItem('nexgenai_token', authToken);
      setToken(authToken);
      // register returns { access_token, user: { id, email, role, full_name, ... } }
      const mapped = mapUser(res.data?.user || res.data);
      setUser(mapped);
      setViewRole(mapped.role);
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