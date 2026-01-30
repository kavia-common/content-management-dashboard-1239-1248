type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:4000";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

async function request<T>(
  path: string,
  method: HttpMethod = "GET",
  body?: unknown,
  init?: RequestInit
): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`;
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: method === "GET" ? "no-store" : "no-cache",
      ...init,
    });
    const status = res.status;
    const isJson = res.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await res.json() : null;

    if (!res.ok) {
      const message = (payload && (payload.error || payload.message)) || `HTTP ${status}`;
      return { data: null, error: message, status };
    }
    return { data: payload as T, error: null, status };
  } catch (err) {
    const message =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Network error";
    return { data: null, error: message, status: 0 };
  }
}

// PUBLIC_INTERFACE
export function apiGet<T>(path: string, init?: RequestInit) {
  /** Fetch JSON data from backend using GET. */
  return request<T>(path, "GET", undefined, init);
}

// PUBLIC_INTERFACE
export function apiPost<T>(path: string, body?: unknown, init?: RequestInit) {
  /** Send JSON data to backend using POST. */
  return request<T>(path, "POST", body, init);
}

// PUBLIC_INTERFACE
export function apiPut<T>(path: string, body?: unknown, init?: RequestInit) {
  /** Send JSON data to backend using PUT. */
  return request<T>(path, "PUT", body, init);
}

// PUBLIC_INTERFACE
export function apiPatch<T>(path: string, body?: unknown, init?: RequestInit) {
  /** Send JSON data to backend using PATCH. */
  return request<T>(path, "PATCH", body, init);
}

// PUBLIC_INTERFACE
export function apiDelete<T>(path: string, init?: RequestInit) {
  /** Delete a resource using DELETE. */
  return request<T>(path, "DELETE", undefined, init);
}
