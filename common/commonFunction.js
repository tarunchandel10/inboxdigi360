import { ADMIN, ADVERTISER, SUPER_ADMIN } from "./constants";

export const saveUserData = (data) => {
  data.data.token &&  localStorage.setItem('token', data.data.token);
  localStorage.setItem('refreshToken', data.data.refresh_token);
  localStorage.setItem('currentTime', Date.now());
  localStorage.setItem('userDetails', JSON.stringify(data.data.user_detail));
};

export const redirectToDashboard = (userType) => {
  switch (userType) {
      case SUPER_ADMIN:
          window.location.href = '/superadmin/dashboard';
          break;
      case ADMIN:
          window.location.href = '/admin/dashboard';
          break;
      case ADVERTISER:
          window.location.href = '/advertiser/dashboard';
          break;
      default:
          window.location.href = '/customer/dashboard';
  }
};

export const getLocalUserProfile = () => {
  return JSON.parse(localStorage.getItem('userDetails'))  
}