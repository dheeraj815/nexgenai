const API_BASE = (import.meta as any).env?.VITE_API_URL || '';
const BASE_URL = `${API_BASE}/api/v1`;

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  const token = localStorage.getItem('nexgenai_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const contentType = res.headers.get('content-type') || '';
    let data: any = null;

    if (contentType.includes('application/json')) {
      try {
        data = await res.json();
      } catch {
        data = null;
      }
    }

    if (!data) {
      const text = await res.text().catch(() => '');
      if (!res.ok) {
        if (text.includes('The page could not be found') || text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
          return {
            success: false,
            error: 'Backend API is currently offline or unreachable. Please start the local backend server (npm run dev) or configure VITE_API_URL.'
          };
        }
        return { success: false, error: `Server returned error (${res.status})` };
      }
      return { success: true, data: text as any };
    }

    if (!res.ok) {
      if (res.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/signup') && !endpoint.includes('/auth/register')) {
        localStorage.removeItem('nexgenai_token');
        localStorage.removeItem('nexgenai_user');
      }
      return { success: false, error: data.detail || data.error || `Request failed with status ${res.status}` };
    }

    return { success: true, data };
  } catch (err: any) {
    return {
      success: false,
      error: err.message?.includes('JSON')
        ? 'Backend API returned a non-JSON response. Please ensure the backend is running.'
        : (err.message || 'Network connectivity error')
    };
  }
}