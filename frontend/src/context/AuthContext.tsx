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

  // Migrate cached localStorage: strip dummy institution names and fake cgpa that may have been stored from old code
  const migrateDummyData = () => {
    try {
      const DUMMY_INSTITUTIONS = ['Delhi Public School', 'National Institute of Technology'];
      const DUMMY_DEPARTMENTS = ['Science & Computing', 'Computer Science & Engineering'];

      const raw = localStorage.getItem('nexgenai_user');
      if (!raw) return;
      const u = JSON.parse(raw);
      let changed = false;

      if (u?.profile) {
        if (DUMMY_INSTITUTIONS.includes(u.profile.institution)) { u.profile.institution = ''; changed = true; }
        if (DUMMY_INSTITUTIONS.includes(u.profile.institutionName)) { u.profile.institutionName = ''; changed = true; }
        if (DUMMY_DEPARTMENTS.includes(u.profile.department)) { u.profile.department = ''; changed = true; }
        if (DUMMY_DEPARTMENTS.includes(u.profile.branch)) { u.profile.branch = ''; changed = true; }
        // If cgpa was set to exactly 8.5 or 9.0 (the old auto-seed values), reset to 0
        if (u.profile.cgpa === 9.0 || u.profile.cgpa === 8.5) { u.profile.cgpa = 0.0; changed = true; }
        if (u.profile.target_role === 'Software Engineering & AI') { u.profile.target_role = ''; changed = true; }
        if (u.profile.targetRole === 'Software Engineering & AI') { u.profile.targetRole = ''; changed = true; }
      }

      if (changed) {
        localStorage.setItem('nexgenai_user', JSON.stringify(u));
        // Also fix registered_users store
        const regRaw = localStorage.getItem('nexgenai_registered_users');
        if (regRaw) {
          const users = JSON.parse(regRaw);
          if (Array.isArray(users)) {
            const updated = users.map((ru: any) => {
              if (DUMMY_INSTITUTIONS.includes(ru.institution)) ru.institution = '';
              if (DUMMY_DEPARTMENTS.includes(ru.department)) ru.department = '';
              if (ru.cgpa === 9.0 || ru.cgpa === 8.5) ru.cgpa = 0.0;
              if (ru.target_role === 'Software Engineering & AI') ru.target_role = '';
              return ru;
            });
            localStorage.setItem('nexgenai_registered_users', JSON.stringify(updated));
          }
        }
      }
    } catch { /* silent */ }
  };

  const refreshUser = async () => {
    migrateDummyData(); // Always run migration first
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

    if (res.success) {
      const updated = mapUser(res.data?.user || res.data);
      setUser(updated);
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