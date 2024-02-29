import React, { useEffect, useState } from 'react';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import SideBar from '@/component/SideBar';
import AdminDasboard from '@/component/adminDashboard';
import { getAllAdvertiser } from '../api/admin';
import { filterAdminByDate, filterWithStatus, getAllAdmins, getMonthltyBudgetCount, getTotalAccountCount, searchAdmin } from '../api/superadmin';
import { getLocalUserProfile } from '../../common/commonFunction';
import { withAuthAndRole } from '../../common/withAuthAndRole';
import { ADMIN, SUPER_ADMIN } from '../../common/constants';
import PaginationComp from '@/component/PaginationComp';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [accountCount, setAccountCount] = useState({});
  const [budgetCount, setBudgetCount] = useState(0);
  const [chartCount, setChartCount] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [timer, setTimer] = useState(null)

  useEffect(() => {

    getTotalAccount();
    getMonthltyCount();
  }, []);
  const fetchUserData = async () => {
    try {
      const userProfile = getLocalUserProfile();
      setLoggedInUser(userProfile);
      if (userProfile.user_type === ADMIN) {
        const data = await getAllAdvertiser();
        if (data.status) {
          setUsers(data.data);
        }
      } else if (userProfile.user_type === SUPER_ADMIN) {
        const data = await getAllAdmins(currentPage);
        if (data.status) {
          setUsers(data.data);
          const totalPagesCount = Math.ceil(data.total_records / 20);
          console.log(data.total_records, "data.total_records")
          setTotalPages(totalPagesCount)
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [currentPage])
  const getTotalAccount = async () => {
    const data = await getTotalAccountCount();
    if (data.status) {
      setAccountCount(data.data)
    }
  }
  const getMonthltyCount = async () => {


    const data = await getMonthltyBudgetCount();
    if (data.status) {
      setBudgetCount(data.data.total_budget);
      setBudgetCount(data.data.total_budget);
      let info = data.data.budget_data.map((info) => info.budget)
      setChartCount(info);

    }
  }
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1); // react-paginate starts page numbering from 0
  };

  const dataChangeFilter = (date) => {
    if (date === "") {
      fetchUserData();
      return;
    }
    filterAdminByDate(currentPage, date).then((data) => {
      console.log(data)
      if (data.status) {
        setUsers(data.data);
        const totalPagesCount = Math.ceil(data.total_records / 20);
        setTotalPages(totalPagesCount)
      }
    }).catch(() => {

    })
  }
  const handleSearchInputChange = (e) => {
    let value = e.target.value
    if (value === "") {
      fetchUserData();
      return
    }

    clearTimeout(timer)
    const newTimer = setTimeout(() => {
      searchAdmin(currentPage, value).then((data) => {
        setUsers(data.data);
        const totalPagesCount = Math.ceil(data.total_records / 20);
        setTotalPages(totalPagesCount)
      }).catch(() => {

      })

    }, 1000)

    setTimer(newTimer)
  }
  const handleStatusChange = (e) => {
    let value = e.target.value
    setUsers([]);
    filterWithStatus(currentPage, value).then((data) => {
      setUsers(data.data);
      const totalPagesCount = Math.ceil(data.total_records / 20);
      setTotalPages(totalPagesCount)
    }).catch(() => {

    })
  }
  const onClear = () => {

  }
  return (
    <>
      <Header />
      <SideBar role={loggedInUser.user_type ?? ''} />
      <AdminDasboard users={users} role={loggedInUser.user_type ?? ''} accountCount={accountCount} budgetCount={budgetCount} chartCount={chartCount}
        dataChangeFilter={dataChangeFilter}
        handleSearchInputChange={handleSearchInputChange}
        handleStatusChange={handleStatusChange}
        onClear={onClear}
        callback={fetchUserData}
      />
      <div className="container-fluid">
        <PaginationComp pageCount={totalPages} onPageChange={handlePageChange} />
      </div>
      <Footer />
    </>
  );
}

export default withAuthAndRole(Dashboard, [SUPER_ADMIN]);
