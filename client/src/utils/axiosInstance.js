import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
});

// Request interceptor: attach token if it exists and route is not public
axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    // Define public (unauthenticated) routes
    const publicRoutes = ["/auth/login", "/auth/register"];

    // Only attach token if it's NOT a public route
    const isPublicRoute = publicRoutes.some(route => config.url.includes(route));

    if (token && !isPublicRoute) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
