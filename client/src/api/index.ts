const BASE_URL = '/api';

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

    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401 && !endpoint.includes('/auth/login') && !endpoint.includes('/auth/register')) {
        localStorage.removeItem('nexgenai_token');
        localStorage.removeItem('nexgenai_user');
      }
      return { success: false, error: data.error || `Request failed with status ${res.status}` };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network connectivity error' };
  }
}