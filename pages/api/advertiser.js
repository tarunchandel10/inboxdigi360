import { API, configuration } from "./bulkUpload";

export const getAllPanelUsersAdvertiser = async (currentPage) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`advertiser/all-user-pannel-list?page=${currentPage}&limit=20`, configuration(token));
      return response.data;
    } catch (error) {
      console.error("Error during get All users:", error);
      throw error;
    }
  };
  
  export const createUser = async (body) => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.post("advertiser/create-user-pannel-account", body, configuration(token));
      return response.data;
    } catch (error) {
      console.error("Error during create Advertiser:", error);
      throw error;
    }
  }
  export const filterWithStatus  = async (currentPage,campaign_status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`advertiser/campaign-status-filter-list?page=${currentPage}&limit=20&campaign_status=${campaign_status}`, configuration(token));
      https://sempitern.com/global-backend/api/advertiser/campaign-status-filter-list?campaign_status=Active&page=2&limit=10
      return response.data;
    } catch (error) {
      console.error("Error during getAllAdmins:", error);
      throw error;
    }
  };

  export const getAllCampaignsList = async (currentPage) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`advertiser/report/all-campaign-list`, configuration(token));
      return response.data;
    } catch (error) {
      console.error("Error during get All users:", error);
      throw error;
    }
  };

  export const getInserstionList = async (campaign_ids) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`advertiser/report/campaign-insertion-orders-list?campaign_ids=${campaign_ids}`, configuration(token));
      return response.data;
    } catch (error) {
      console.error("Error during get All users:", error);
      throw error;
    }
  };
  export const getlineItemList = async (campaign_ids,insertion_order_ids) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`advertiser/report/campaign-insertion-orders-line-items-list?campaign_ids=${campaign_ids}&insertion_order_ids=${insertion_order_ids}`, configuration(token));
      return response.data;
    } catch (error) {
      console.error("Error during get All users:", error);
      throw error;
    }
  };
  export const generateFinalReport = async (campaign_ids,insertion_order_ids,line_item_ids,type,start_date,end_date) => {
    try {
      const token = localStorage.getItem("token");
      const response = await API.get(`advertiser/report/filter-report-list?campaign_ids=${campaign_ids}&insertion_order_ids=${insertion_order_ids}&line_item_ids=${line_item_ids}&filter_date_type=${type}&start_date=${start_date}&end_date=${end_date}`, configuration(token));
      return response.data;
    } catch (error) {
      console.error("Error during get All users:", error);
      throw error;
    }
  };