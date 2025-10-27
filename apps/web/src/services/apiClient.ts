import { API_BASE_URL } from '@/providers/wagmi';

export interface ApiClientOptions extends RequestInit {
  authenticated?: boolean;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const error = new Error(body.message ?? response.statusText);
    throw Object.assign(error, { status: response.status, body });
  }

  if (response.status === 204) {
    return {} as T;
  }

  return (await response.json()) as T;
}

export async function apiClient<T = unknown>(path: string, options: ApiClientOptions = {}) {
  const headers = new Headers(options.headers ?? {});
  headers.set('Content-Type', 'application/json');

  const request = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });

  return handleResponse<T>(request);
}
