import React, { useEffect, useState } from 'react';
import DashboardScreen from '@/component/DashboardScreen';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import SideBar from '@/component/SideBar';
import { Baseurl } from '@/component/Baseurl';
import { withAuthAndRole } from '@/common/withAuthAndRole';
import Usertype, { ADMIN, ADVERTISER } from '@/common/constants'
import { getLocalUserProfile } from '../../common/commonFunction';
import PaginationComp from '@/component/PaginationComp';
import { getNewToken } from '../api/bulkUpload';
import { filterWithStatus } from '../api/advertiser';

function Dashboard() {
    const [campaigns, setCampaigns] = useState([]);
    const [countsData, setcountsData] = useState();
    const [selectedDate, setSelectedDate] = useState('');
    const [disableBtn, setdisableBtn] = useState(true);
    const [isFilterSelected, setisFilterSelected] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {


        const filterDateData = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token'); // Replace 'your_token_key' with your actual key name
                const response = await fetch(`${Baseurl}campaign-filter-list?filter_date=${selectedDate}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json' // Set content type as needed
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    getNewToken(data)
                    setCampaigns(data); // Update campaigns state with fetched data
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error or set a default value for campaigns
                setCampaigns([]);
            }
        };

        if (selectedDate) {
            filterDateData();
        } else {
            fetchCampaigns();

        }

    }, [selectedDate, currentPage]);
    const fetchCampaigns = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Baseurl}all-campaign-list?page=${currentPage}&limit=20`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                    'Content-Type': 'application/json' // Set content type as needed
                }
            });

            if (response.ok) {
                const data = await response.json();
                getNewToken(data)
                setCampaigns(data); // Update campaigns state with fetched data
                setdisableBtn(false)
                const totalPagesCount = Math.ceil(data.total_records / 20);
                setTotalPages(totalPagesCount);

            } else {
                setCampaigns("");
                setdisableBtn(false)
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setdisableBtn(false)
            console.error('Error fetching data:', error);
            // Handle error or set a default value for campaigns
            setCampaigns([]);
        }
        const userProfile = getLocalUserProfile();
        setLoggedInUser(userProfile);
    };
    useEffect(() => {
        // Fetch campaign list from the API
        const fetchCounts = async () => {
            try {
                // Get token from localStorage
                const token = localStorage.getItem('token'); // Replace 'your_token_key' with your actual key name
                const response = await fetch(`${Baseurl}dashboard-campaign-count`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json' // Set content type as needed
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    getNewToken(data)
                    setcountsData(data.data); // Update campaigns state with fetched data
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error or set a default value for campaigns
                setcountsData([]);
            }
        };

        fetchCounts();
    }, []);

    const cloneCampaign = async (campaignId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Baseurl}clone-campaign?campaign_id=${campaignId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                // Handle the response data as needed
                const responseData = await response.json();
                window.location.reload();
                // You can update state or perform any other actions here
            } else {
                throw new Error('Failed to clone campaign');
            }
        } catch (error) {
            console.error('Error cloning campaign:', error);
            // Handle error
        }
    };


    const handleDateChange = (event) => {
        const selected = event.target.value;
        setSelectedDate(selected);
        setisFilterSelected(true)
    };
    const clearAllFilter = (event) => {
        setSelectedDate("");
        setisFilterSelected(false)
        const el = document.querySelector(
            "div.status-filter-container .create-form-feild select",
        );
        el.value = '';
        document.getElementById('startDate').value = '';
        document.getElementsByClassName('search-header')[0].value = '';
        fetchCampaigns()


    };
    const handleSearch = async (searchTerm) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Baseurl}campaign-search-list?keyword=${searchTerm}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const searchData = await response.json();
                setCampaigns(searchData)
                setisFilterSelected(true)

                // Update the state or do something with searchData
            } else {
                setCampaigns("")
                throw new Error('Failed to fetch search data');
            }
        } catch (error) {
            console.error('Error fetching search data:', error);
            // Handle error
        }
    };
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1); // react-paginate starts page numbering from 0
    };
    const handleFilterChange = (e) => {
        let value = e.target.value
        filterWithStatus(currentPage, value).then((data) => {
            setCampaigns(data);
            setisFilterSelected(true)
            const totalPagesCount = Math.ceil(data.total_records / 20);
            setTotalPages(totalPagesCount)
        }).catch(() => {

        })
    }
    return (
        <>
            <Header />
            <SideBar role={loggedInUser.user_type ?? ''} />
            <DashboardScreen campaignsData={campaigns.data} handleFilterChange={handleFilterChange} data={countsData} onDateChange={handleDateChange} clearAllFilter={clearAllFilter} onCloneCampaign={cloneCampaign} onSearch={handleSearch} isFilterSelected={isFilterSelected} />
            <div className="container-fluid">
                <PaginationComp pageCount={totalPages} onPageChange={handlePageChange} />

            </div>
            <Footer />
            {disableBtn ?
                <div className='bg_page_white'>
                    <span className="loader"></span>
                </div>
                : ""}
        </>
    );
}

export default withAuthAndRole(Dashboard, [ADVERTISER]); 