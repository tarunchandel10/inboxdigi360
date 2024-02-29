import React, { useEffect, useState } from 'react';
import Footer from '@/component/Footer';
import Header from '@/component/Header';
import SideBar from '@/component/SideBar';
import SuperAdminReport from '@/component/reports/superAdminReport';
import { withAuthAndRole } from '../../common/withAuthAndRole';
import { ADVERTISER } from '../../common/constants';
import { getLocalUserProfile } from '../../common/commonFunction';
import Image from 'next/image';
import CustomButton from '@/component/button/CustomButton';
import MultiCheckDropdown from '@/component/dropdown/multiCheckDropdown';
import SingleCheckDropdown from '@/component/dropdown/singleCheckDropdown';
import { generateFinalReport, getAllCampaignsList, getInserstionList, getlineItemList } from '../api/advertiser';
import DatePickerDropdown from '@/component/dropdown/datePickerDropdown';
import { toast } from 'react-toastify';
import { CSVLink, CSVDownload } from "react-csv";


function Reports() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [campaignItems, setcampaignItems] = useState([]);
    const [lineItems, setlineItems] = useState([]);
    const [inserationOrderItems, setinserationOrderItems] = useState([]);

    //
    const [campaignIds, setCampaignIds] = useState([])
    const [lineItemsIds, setlineItemsIds] = useState([])
    const [inserationOrderIds, setinserationOrderIds] = useState([])
    const [finalDisplayData, setFinalDisplayData] = useState([])

    const [keyType, setkeyType] = useState('custom');
    const [startDate, setStartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [csvData, setCsvData] = useState([['Date',
        'Creative Name',
        'Campagin Name',
        'Domain Name',
        'Conversions',
        'CTR',
        'Impressions','Click']]);
    [
        ["firstname", "lastname", "email"],
        ["Ahmed", "Tomi", "ah@smthing.co.com"],
        ["Raed", "Labes", "rl@smthing.co.com"],
        ["Yezzi", "Min l3b", "ymin@cocococo.com"]
    ];

    useEffect(() => {
        const fetchUserData = async () => {
            const userProfile = getLocalUserProfile();
            setLoggedInUser(userProfile);

        };
        fetchUserData();
        getCampaignList();
    }, []);

    const getCampaignList = () => {
        getAllCampaignsList().then((data) => {
            if (data.status) {
                setcampaignItems(data.data)
            }
        }).catch(() => { })
    }
    const getInsertationOrderList = (ids) => {
        getInserstionList(ids).then((data) => {
            // if (data.status) {
            setinserationOrderItems(data.data)
            // }
        }).catch(() => { })
    }
    const getLineItems = (cid, lid) => {
        getlineItemList(cid, lid).then((data) => {
            // if (data.status) {
            setlineItems(data.data)
            // }
        }).catch(() => { })
    }

    const getCampaignItem = (item, index) => {
        let info = campaignIds;
        if (info.includes(item.id)) {
            const index = info.indexOf(item.id);
            if (index > -1) {
                info.splice(index, 1);
            }
        }
        else {
            info.push(item.id)
        }
        getInsertationOrderList(info)
        setCampaignIds(info)
    }
    const getInsertionItem = (item, index) => {
        let info = inserationOrderIds;
        if (info.includes(item.id)) {
            const index = info.indexOf(item.id);
            if (index > -1) {
                info.splice(index, 1);
            }
        }
        else {
            info.push(item.id)
        }
        getLineItems(campaignIds, info)
        setinserationOrderIds(info)
    }
    const getLineItem = (item, index) => {
        let info = lineItemsIds;
        if (info.includes(item.id)) {
            const index = info.indexOf(item.id);
            if (index > -1) {
                info.splice(index, 1);
            }
        }
        else {
            info.push(item.id)
        }
        // getLineItems(campaignIds, info)
        setlineItemsIds(info);
    }
    const generteFile = () => {
        generateFinalReport(campaignIds, inserationOrderIds, lineItemsIds, keyType, startDate, endDate).then((data) => {
            setFinalDisplayData(data.data);
            let info = csvData;
            data.data.map((d) => {
                info.push([d.date,
                     d.creative_name,
                d.campaign_name,
                d.domain_name,
                d.conversions,
                d.ctr,
                d.imp,
                d.click,]
                        )            })
            console.log(info, "info")
            setCsvData(info);
            toast.success(data.message);
        })
    }
    const keyTypeHandler = (e) => {
        setkeyType(e)
    }
    const changeStartDate = (e) => {
        console.log(e.target.value)
        setStartDate(e.target.value);
    }

    const changeEndDate = (e) => {
        setendDate(e.target.value);
    }

    const clearDaes = () => {
        setStartDate('');
        setendDate('');
    }
    return (
        <>
            <Header />
            <SideBar role={loggedInUser.user_type ?? ''} />
            <section className="main">
                <div className="container-fluid mt-4 dashboard-container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="report-block">
                                <div className="dropdowns">

                                    <MultiCheckDropdown className="dropdown-inner" title="Campaign Name" dropdownitem={campaignItems} onclick={getCampaignItem} />
                                    <MultiCheckDropdown className="dropdown-inner" title="Insertion Order" dropdownitem={inserationOrderItems} onclick={getInsertionItem} />
                                    <MultiCheckDropdown className="dropdown-inner" title="Line Item" dropdownitem={lineItems} onclick={getLineItem} />
                                    {/* <MultiCheckDropdown className="dropdown-inner" title="Date to" dropdownitem={[]} /> */}
                                    <DatePickerDropdown className="dropdown-inner datepick" title="Date to" generteFile={generteFile} keyTypeHandler={keyTypeHandler} changeStartDate={changeStartDate} changeEndDate={changeEndDate} clearDaes={clearDaes} setkeyType={setkeyType} />
                                </div>
                                <div className="report-table">
                                    {finalDisplayData.length > 0 && <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Creative Name</th>
                                                <th>Campagin Name</th>
                                                <th>Domain Name</th>
                                                <th>Conversions</th>
                                                <th>CTR</th>
                                                <th>Impressions</th>
                                                <th>Clicks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {finalDisplayData.map((data,key) =>
                                                <tr key={key}>
                                                    <td>{data.date}</td>
                                                    <td>{data.creative_name}</td>
                                                    <td>{data.campaign_name}</td>
                                                    <td>{data.domain_name}</td>
                                                    <td>{data.conversions}</td>
                                                    <td>{data.ctr}</td>
                                                    <td>{data.imp}</td>
                                                    <td>{data.click}</td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>}
                                </div>

                            </div>

                            <div className="report-download">
                                <CSVLink className="btn btn-outline-success" data={csvData}>Download Report</CSVLink>
                                {/* <CustomButton href='#' text="Download Report" iconSrc="/images/report-io.svg" >
                                    
                                </CustomButton> */}
                            </div>
                        </div>
                        <div className="col-md-3">
                            {/* <div className="report-block">
                                <div>
                                    <div>
                                        <span> Table Tree</span>   <Image
                                            src="/images/Vector.png"
                                            width={21}
                                            height={14}
                                            alt="vector"
                                            className="status-img"
                                            style={{ width: "21px", height: "14px" }}
                                        />  </div>
                                </div>
                                <div>
                                    <div>
                                        <span> Custom Data</span>   <Image
                                            src="/images/Vector.png"
                                            width={21}
                                            height={14}
                                            alt="vector"
                                            className="status-img"
                                            style={{ width: "21px", height: "14px" }}
                                        />  </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default withAuthAndRole(Reports, [ADVERTISER]);