import axios from "axios";

// Custom instance banana zaroori hai
const api = axios.create({
  baseURL: `https://ecommerce-app-dty0.onrender.com`,
});

// Request Interceptor: Jo har request mein token jodegan
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if 401 and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const storedRefreshToken = localStorage.getItem("refreshToken");
      console.log("🔄 Interceptor active! Storage se mila Refresh Token:", storedRefreshToken);

      if (!storedRefreshToken) {
        console.log("❌ No refresh token found in storage.");
        return Promise.reject(error);
      }

      try {
        const res = await axios.post("http://localhost:8080/auth/refresh", {
          token: storedRefreshToken  // Sahi se object payload bheja
        });



        // Backend response check karo: res.data.jwtToken hai ya res.data.accessToken?
        const newAccessToken = res.data.jwtToken || res.data.accessToken; 
        
        if (newAccessToken) {
          localStorage.setItem("accessToken", newAccessToken);
          
          // Original request ka header update karo naye token ke sath
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          
          console.log("🔁 Retrying the original request with new token!");
          return api(originalRequest); // Retry original request
        }

      } catch (refreshError) {
        console.error("💥 Refresh token API itself failed or returned null:", refreshError);
        // Agar refresh token hi expired ho chuka hai, tabhi logout karo
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;