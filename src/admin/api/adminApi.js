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

const call = (path, { method = "GET", body, auth = false } = {}) => {
  const isForm = body instanceof FormData; // multipart: the browser must set Content-Type (with the boundary) itself
  return fetch(`${API_URL}${path}`, {
    method,
    credentials: "include", // sends / receives the refresh cookie
    headers: {
      ...(body && !isForm && { "Content-Type": "application/json" }),
      ...(auth && accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });
};

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

// Authenticated file download (the CV route needs the Bearer token, so a plain <a href> won't work).
// Same silent refresh-on-401 as request(). Returns a Blob.
export const requestBlob = async (path) => {
  let res = await call(path, { auth: true });
  if (res.status === 401) {
    try {
      await refreshSession();
      res = await call(path, { auth: true });
    } catch {
      /* fall through to the error below */
    }
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new ApiError(res.status, data.message || "Download failed");
  }
  return res.blob();
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