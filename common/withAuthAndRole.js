import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchUserDetail } from '../pages/api/common';
import { redirectToDashboard } from './commonFunction';
import { generateAccessTokenWithRefreshToken } from '@/pages/api/loginApi';
import { diffCurrentTimeAndExpiryTime } from '@/component/common';

export const withAuthAndRole = (WrappedComponent, allowedRoles = []) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const [userDetail, setUserDetail] = useState(null);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token || token==undefined) {
        router.push('/logout');
      }
      const expiry = localStorage.getItem('currentTime');
      const timeResult =diffCurrentTimeAndExpiryTime(expiry, Date.now());
      if(timeResult > 90){
        const refreshToken = localStorage.getItem('refreshToken');
        generateAccessTokenWithRefreshToken(refreshToken).then((data)=>{
          data.data.token &&   localStorage.setItem('token', data.data.token);
          localStorage.setItem('currentTime', Date.now());
        })
      }

      const fetchUserDetails = async () => {
        try {
          const userDetailData = await fetchUserDetail();
          setUserDetail(userDetailData);
          if (userDetailData && userDetailData.user_detail && !allowedRoles.includes(userDetailData.user_detail.user_type)) {
            localStorage.setItem('userDetails', JSON.stringify(userDetailData.user_detail))
            router.push(redirectToDashboard(userDetailData.user_detail.user_type));
          }
        } catch (error) {
          console.error('Error fetching user detail:', error);
          setUserDetail(null);
        }
      };
      fetchUserDetails();
    }, []); 

    if (!userDetail) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
