import {API} from "../api/bulkUpload.js"

export const login = async (email, password) => {
  try {
    const response = await API.post("login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const generateAccessTokenWithRefreshToken = async (refreshToken) =>{
    try {
        const response = await API.post("refresh-token", { "refresh_token":refreshToken });
        return response.data;
      } catch (error) {
        console.error("Error during login:", error);
        throw error;
      }
}