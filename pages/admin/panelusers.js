import React, { useEffect, useState } from 'react';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import SideBar from '@/component/SideBar';
import { getAllAdvertiser, getAllPanelUsersAdmin } from '../api/admin';
import { getAllAdmins, getAllPanelUsers } from '../api/superadmin';
import { getLocalUserProfile } from '../../common/commonFunction';
import { withAuthAndRole } from '../../common/withAuthAndRole';
import { ADMIN, SUPER_ADMIN } from '../../common/constants';
import PanelTable from '@/component/panelusertable';
import PaginationComp from '@/component/PaginationComp';

function PanelUsers() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userProfile = getLocalUserProfile();
        setLoggedInUser(userProfile);
        if (userProfile.user_type === ADMIN) {
          const data = await getAllPanelUsersAdmin(currentPage);
          if (data.status) {
            setUsers(data.data);
            const totalPagesCount = Math.ceil(data.total_records / 20);
            console.log(data.total_records, "data.total_records")
            setTotalPages(totalPagesCount)
          }
        } else if (userProfile.user_type === SUPER_ADMIN) {
          const data = await getAllPanelUsers();
          if (data.status) {
            setUsers(data.data);
          } 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentPage]);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // react-paginate starts page numbering from 0
};

  return (
    <>
      <Header />
      <SideBar role={loggedInUser.user_type ?? ''} />
      <PanelTable users={users} role={loggedInUser.user_type ?? ''} />
      <div className="container-fluid">
                <PaginationComp pageCount={totalPages} onPageChange={handlePageChange} />
            </div>
      {/* <AdminDasboard users={users} role={loggedInUser.user_type ?? ''} /> */}
      <Footer />
    </>
  );
}

export default withAuthAndRole(PanelUsers, [ADMIN]);
