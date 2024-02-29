import { API, configuration } from "@/pages/api/bulkUpload";

export const fetchUserDetail = async () => {
  try {
    const token = localStorage.getItem("token");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const logged_in_user_id = userDetails.id ?? null;
    const response = await API.get("user-profile-detail", {
      ...configuration(token),
      params: {
        login_user_id: logged_in_user_id
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error during get user details:", error);
    throw error;
  }
};
