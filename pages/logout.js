// pages/logout.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentTime');
    localStorage.removeItem('userDetails');
    router.push('/login');
  }, []);
  return (
    <div>
      <div className='bg_page_white'>
        <span className="loader"></span>
      </div>
    </div>
  );
};

export default Logout;
