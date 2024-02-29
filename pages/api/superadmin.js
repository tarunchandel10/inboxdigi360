import { API, configuration } from "./bulkUpload.js";

export const getAllAdmins = async (currentPage) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/all-admin-list?page=${currentPage}&limit=20`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};
export const filterAdminByDate = async (currentPage, date) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/date-filter-admin-list?page=${currentPage}&limit=20&filter_date=${date}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};

export const searchAdmin = async (currentPage, keyword) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/search-admin-list?page=${currentPage}&limit=20&keyword=${keyword}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};
export const filterWithStatus = async (currentPage, filter_status) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/status-filter-admin-list?page=${currentPage}&limit=20&filter_status=${filter_status}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};
export const createAdmin = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post("super-admin/create-admin-account", body, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during create Admin:", error);
    throw error;
  }
}

export const getAdminDetail = async (logged_in_user_id) => {

  try {
    const token = localStorage.getItem("token");
    const response = await API.get("user-profile-detail", {
      ...configuration(token),
      params: {
        login_user_id: logged_in_user_id
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};
export const updateeAdmin = async (body) => {//
  try {
    const token = localStorage.getItem('token');
    const response = await API.post("update-user-profile", body, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during create Admin:", error);
    throw error;
  }
}

export const getAllPanelUsers = async (currentPage) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/all-user-pannel-list?page=${currentPage}&limit=20`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllPanelUsers:", error);
    throw error;
  }
};
export const createUser = async (body) => {
  try {
    const token = localStorage.getItem('token');
    const response = await API.post("super-admin/create-user-pannel-account", body, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during create Admin:", error);
    throw error;
  }
}
export const getTotalAccountCount = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get("super-admin/admin-total-account-list", configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getting counts", error);
    throw error;
  }
};

export const getMonthltyBudgetCount = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get("super-admin/monthly-total-budget-list", configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getting counts", error);
    throw error;
  }
}

export const changeUserStaus = async (body) => {

  try {
    const token = localStorage.getItem("token");
    const response = await API.post("update-user-status", body, configuration(token));
    return response.data;
  } catch (error) {
    console.error("User Status Updated", error);
    throw error;
  }
};


//reports
export const getAllAdminListReport = async (currentPage) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/all-admin-list`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};
export const getAllAdvertiserListReport = async (admin_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/admin/all-advertiser-list?admin_id=${admin_id}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during getAllAdmins:", error);
    throw error;
  }
};

export const getAllCampaignsList = async (admin_id,advertiser_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/report/all-campaign-list?admin_id=${admin_id}&advertiser_id=${advertiser_id}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during get All users:", error);
    throw error;
  }
};

export const getInserstionList = async (campaign_ids,admin_id,advertiser_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/report/campaign-insertion-orders-list?admin_id=${admin_id}&advertiser_id=${advertiser_id}&campaign_ids=${campaign_ids}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during get All users:", error);
    throw error;
  }
};
export const getlineItemList = async (campaign_ids, insertion_order_ids,admin_id,advertiser_id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/report/campaign-insertion-orders-line-items-list?admin_id=${admin_id}&advertiser_id=${advertiser_id}&campaign_ids=${campaign_ids}&insertion_order_ids=${insertion_order_ids}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during get All users:", error);
    throw error;
  }
};
export const generateFinalReport = async (admin_id,advertiser_id,campaign_ids, insertion_order_ids, line_item_ids, type, start_date, end_date) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(`super-admin/report/filter-report-list?admin_id=${admin_id}&advertiser_id=${advertiser_id}&campaign_ids=${campaign_ids}&insertion_order_ids=${insertion_order_ids}&line_item_ids=${line_item_ids}&filter_date_type=${type}&start_date=${start_date}&end_date=${end_date}`, configuration(token));
    return response.data;
  } catch (error) {
    console.error("Error during get All users:", error);
    throw error;
  }
};