import axiosInstance from "../utils/axiosInstance";


export const register = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}
export const userLogin = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}