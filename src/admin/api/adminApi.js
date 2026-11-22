// Vite: set VITE_API_URL in .env  (CRA users: use process.env.REACT_APP_API_URL instead)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// The access token lives in memory only (never localStorage). The refresh token is an httpOnly cookie.
let accessToken = null;
let refreshPromise = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export class ApiError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const parse = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.message || "Something went wrong", data.errors);
  return data;
};

const call = (path, { method = "GET", body, auth = false } = {}) =>
  fetch(`${API_URL}${path}`, {
    method,
    credentials: "include", // sends / receives the refresh cookie
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...(auth && accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

// Only ONE refresh request may run at a time. Your backend rotates refresh tokens, so two
// parallel refreshes (e.g. React StrictMode in dev) would look like token theft and log you out.
export const refreshSession = () => {
  if (!refreshPromise) {
    refreshPromise = call("/auth/refresh", { method: "POST" })
      .then(parse)
      .then((data) => {
        accessToken = data.accessToken;
        return data;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
};

// Use for any request. With auth: true it retries once after refreshing an expired access token.
export const request = async (path, options = {}) => {
  let res = await call(path, options);
  if (res.status === 401 && options.auth) {
    try {
      await refreshSession();
    } catch {
      return parse(res);
    }
    res = await call(path, options);
  }
  return parse(res);
};

const withToken = (data) => {
  setAccessToken(data.accessToken);
  return data;
};

export const authApi = {
  signup: (body) => request("/auth/signup", { method: "POST", body }),
  verifySignup: (body) => request("/auth/signup/verify", { method: "POST", body }).then(withToken),
  login: (body) => request("/auth/login", { method: "POST", body }).then(withToken),
  logout: () => request("/auth/logout", { method: "POST" }),
};
