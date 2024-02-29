import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { generateAccessTokenWithRefreshToken } from '@/pages/api/loginApi'
import { diffCurrentTimeAndExpiryTime } from '@/component/common'
const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const expiry = localStorage.getItem('currentTime');
      const timeResult = diffCurrentTimeAndExpiryTime(expiry, Date.now());
      if (timeResult > 90) {
        const refreshToken = localStorage.getItem('refreshToken');
        generateAccessTokenWithRefreshToken(refreshToken).then((data) => {
          data.data.token && localStorage.setItem('token', data.data.token);
          localStorage.setItem('currentTime', Date.now());
        })
      }
      if (!token) {
        router.push('/login'); // Redirect to login if token is not present
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
