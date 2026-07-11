// Simulated token storage
let accessToken: string | null = null;

const getAccessToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem("deepvision_access_token");
  }
  return accessToken;
};

const setAccessToken = (token: string) => {
  accessToken = token;
  localStorage.setItem("deepvision_access_token", token);
};

export const clearTokens = () => {
  accessToken = null;
  localStorage.removeItem("deepvision_access_token");
  localStorage.removeItem("deepvision_refresh_token");
};

type FetchOptions = RequestInit & {
  requiresAuth?: boolean;
};

// Custom fetch wrapper simulating Axios interceptors
export const api = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const { requiresAuth = true, headers, ...restOptions } = options;
  
  const mergedHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...headers,
  };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      mergedHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    // Intercept specific URLs and return dummy data
    return mockBackendRouter(url, options) as Promise<T>;
  } catch (error: any) {
    if (error.status === 401) {
      // Simulate refresh token flow
      console.warn("401 Unauthorized, attempting to refresh token...");
      try {
        const newToken = await simulateRefreshToken();
        setAccessToken(newToken);
        // Retry original request
        mergedHeaders["Authorization"] = `Bearer ${newToken}`;
        return mockBackendRouter(url, { ...options, headers: mergedHeaders }) as Promise<T>;
      } catch (refreshError) {
        clearTokens();
        window.location.href = "/auth/login";
        throw new Error("Session expired. Please log in again.");
      }
    }
    throw error;
  }
};

// Mock Backend Router
async function mockBackendRouter(url: string, options: FetchOptions) {
  const method = options.method || "GET";
  
  if (url.includes("/api/auth/login") && method === "POST") {
    return { token: "mock_jwt_token_123", user: { name: "Test User" } };
  }
  
  if (url.includes("/api/scans") && method === "GET") {
    return {
      scans: [
        { id: 1, name: "image1.jpg", status: "Real", conf: "99%" },
      ]
    };
  }

  // Fallback 404
  throw { status: 404, message: "Not Found" };
}

async function simulateRefreshToken() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  const refreshToken = localStorage.getItem("deepvision_refresh_token");
  if (!refreshToken) throw new Error("No refresh token");
  return "mock_new_jwt_token_456";
}

export const authService = {
  login: (data: any) => api("/api/auth/login", { method: "POST", body: JSON.stringify(data), requiresAuth: false }),
  logout: () => {
    clearTokens();
    window.location.href = "/auth/login";
  }
};
