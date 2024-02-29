import { getLocalUserProfile } from '@/common/commonFunction';
import Header from '@/component/Header'
import SideBar from '@/component/SideBar'
import React, { useEffect, useState } from 'react'

export default function Reports() {
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        const userProfile = getLocalUserProfile();
        setLoggedInUser(userProfile);
    }, [])
    return (
        <>
            <Header />
            <SideBar role={loggedInUser.user_type ?? ''} />
            <section className="main">
                <div className="container-fluid">

                    <div className='row'>
                        <div className='col-md-8'>
                         <div>
                            <select><option>1</option></select>
                            <select><option>1</option></select>
                            <select><option>1</option></select>
                            <select><option>1</option></select>
                            <select><option>1</option></select>
                            
                         </div>
                        </div>
                        <div className='col-md-4'>
                            <div>
                                <div className=''>
                                    section 1
                                </div>
                                <div>
                                    section 2
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
