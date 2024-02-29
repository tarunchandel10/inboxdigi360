import React, { useEffect, useState } from 'react';
import CreativeMain from "@/component/CreativeMain";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import SideBar from "@/component/SideBar";
import { Baseurl } from '@/component/Baseurl';
import withAuth from '@/component/withAuth';
import { getLocalUserProfile } from '../../common/commonFunction';
import PaginationComp from '@/component/PaginationComp';
import { getNewToken } from '../api/bulkUpload';
function Creatives() {
    const [creative, setCreative] = useState([]);
    const [disableBtn, setdisableBtn] = useState(true);
    const [loggedInUser, setLoggedInUser] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchCreative = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${Baseurl}all-creative-list?page=${currentPage}&limit=18`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setdisableBtn(false);
                    getNewToken(data)
                    setdisableBtn(false)
                    setCreative(data);
                    
                    // Calculate total pages
                    const itemsPerPage = 18; // Number of items per page
                    const totalItems = data.total_records; // Total number of items
                    const totalPages = Math.ceil(totalItems / itemsPerPage);
                    setTotalPages(totalPages);
                } else {
                    setdisableBtn(false);
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                setdisableBtn(false);
                console.error('Error fetching data:', error);
                setCreative([]);
            }
            const userProfile = getLocalUserProfile();
            setLoggedInUser(userProfile);
        };

        fetchCreative();
    }, [currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1); // ReactPaginate uses 0-based indexing
    };

    console.log(totalPages)
    return (
        <>
            <Header />
            <SideBar role={loggedInUser.user_type ?? ''} />
            <CreativeMain data={creative.data} pageCount={totalPages} onPageChange={handlePageChange}/>
           
            <Footer />
          
            {disableBtn ?
                <div className='bg_page_white'>
                    <span className="loader"></span>
                </div>
                : ""}
        </>
    )
}

export default withAuth(Creatives);
