import { useEffect, useState } from 'react'; // Import useState hook
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRouter } from 'next/router';
import { Baseurl } from "./Baseurl";
import PaginationComp from './PaginationComp';
import SelectField from './Form/SelectField';
import { filterWithStatus } from '@/pages/api/advertiser';
import { getNewToken } from '@/pages/api/bulkUpload';

function DashboardTable({ data, onDateChange, clearFilter, onCloneCampaign, onSearch, isFilterSelected ,handleFilterChange }) {
    const router = useRouter();
    const [localData, setLocalData] = useState(data); // State to hold local data

    useEffect(() => {
        setLocalData(data)
    }, [data])

    const handleEdit = (item) => {
        router.push(`/advertiser/edit_advertiser?id=${item.id}`);
    };

    const handleViewCampaign = (item) => {
        router.push(`/advertiser/all-insertion-orders?id=${item.id}`);
    };

    const handleSearchInputChange = (event) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

    const handleStatusChange = async (campaignId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Baseurl}update-campaign-status`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    campaign_id: campaignId,
                    campaign_status: newStatus
                })
            });

            if (response.ok) {
                const data = await response.json();
                getNewToken(data)
                // Update local data with new status
                const updatedData = localData.map(item => {
                    if (item.id === campaignId) {
                        return { ...item, campaign_status: newStatus };
                    }
                    return item;
                });
                setLocalData(updatedData);; // Update local data
            } else {
                throw new Error('Failed to update campaign status');
            }
        } catch (error) {
            console.error('Error updating campaign status:', error);
        }
    };

    return (
        <>
            <div className="container-fluid mt-4 dashboard-container">
                <div className="row table-data">
                    <div className="col-12">
                        <div className="table_top">
                            <button type="button" className="btn btn-outline-success" onClick={() => window.location.replace('/advertiser/create-new-campaign')}>New Campaigns
                                <Image
                                    src="/images/plus.svg"
                                    alt="Plus icon"
                                    width={20}
                                    height={20}
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </button>
                            <div className="custom_date">
                                <input id="startDate" type="date" onChange={onDateChange} />
                            </div>
                            <div className="status-filter-container">
                                <SelectField
                                    setValue={handleFilterChange}
                                    name="filter" options={['Active', 'Pause', 'Archive', 'Completed']}
                                    placholder={'Filter'} />
                            </div>
                            <div className="input-group search_box">
                                <span className="input-group-text">
                                    <Image
                                        src="/images/search.svg"
                                        width={16}
                                        height={16}
                                        alt="Picture of the author"
                                        style={{ width: "16px", height: "16px" }}
                                    />
                                </span>
                                <input type="text" className="search-header" placeholder='Search for page or campaign' onChange={handleSearchInputChange} />
                            </div>
                            {isFilterSelected && <div className="ms-auto clear" onClick={clearFilter}>Clear All</div>}
                        </div>
                    </div>
                    <div className="col-12 dashboard_table">
                        {localData ? <div className="table-responsive">
                            <table className="table table-borderless ">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Campaign</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Campaign Type</th>
                                        <th>Mode</th>
                                        <th>Impressions</th>
                                        <th>Target BID</th>
                                        <th>Clicks</th>
                                        <th>CTR (%)</th>
                                        <th>Media Cost</th>
                                        <th>eCPM</th>
                                        <th>eCPC</th>
                                        <th>Progress</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {localData.map((item,index) => (
                                        <tr key={item.id}>
                                            <td>
                                                <input type="checkbox" id={`vehicle${item.id}`} name={`vehicle${item.id}`} value="Bike" />
                                                <label htmlFor={`vehicle${item.id}`} className="cr"></label>
                                            </td>
                                            <td>
                                                {item.campaign_status === "Pause" ?
                                                    <Image
                                                        src="/images/Pause.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Picture of the author"
                                                        className="status-img"
                                                        style={{ width: "24px", height: "24px" }}
                                                    /> : item.campaign_status === "Active" ?
                                                        <Image
                                                            src="/images/Play.svg"
                                                            width={24}
                                                            height={24}
                                                            alt="Picture of the author"
                                                            className="status-img"
                                                            style={{ width: "24px", height: "24px" }}
                                                        /> :
                                                        <Image
                                                            src="/images/archieve.svg"
                                                            width={24}
                                                            height={24}
                                                            alt="Picture of the author"
                                                            className="status-img"
                                                            style={{ width: "24px", height: "24px" }}
                                                        />
                                                }
                                                <select
                                                    className="form-select select_option"
                                                    value={item.campaign_status}
                                                    name={index}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Pause">Pause</option>
                                                    <option value="Archive">Archive</option>
                                                </select>
                                            </td>
                                            <td>{item.id}</td>
                                            <td><span className="cursor-pointer bold-name" onClick={() => handleViewCampaign(item)}>{item.name}</span></td>
                                            <td>{item.creative_types}</td>
                                            <td>CPM</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td>-</td>
                                            <td> <button>Pending</button></td>
                                            <td>
                                                <DropdownButton
                                                    key='start'
                                                    id={`dropdown-button-drop-start`}
                                                    drop='start'
                                                    variant="bg-transparent remove_drop_icon"
                                                    title={<Image
                                                        src="/images/action.svg"
                                                        width={5}
                                                        height={20}
                                                        alt="1"
                                                        style={{ width: "5px", height: "20px" }}
                                                    />}
                                                >
                                                    <Dropdown.Item eventKey="1" className="p-md-3" onClick={() => handleEdit(item)}>
                                                        <Image
                                                            src="/images/edit_icon.svg"
                                                            width={18}
                                                            height={18}
                                                            alt="P2"
                                                            className="me-3"
                                                            style={{ width: "18px", height: "18px" }}
                                                        />
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="2" className="p-md-3" onClick={() => onCloneCampaign(item.id)}>
                                                        <Image
                                                            src="/images/clone.svg"
                                                            width={17}
                                                            height={18}
                                                            alt="Picture of the author"
                                                            className="me-3"
                                                            style={{ width: "17px", height: "18px" }}
                                                        />
                                                        Clone
                                                    </Dropdown.Item>
                                                    {/* <Dropdown.Item eventKey="3" className="p-md-3">
                                                        <Image
                                                            src="/images/delete.svg"
                                                            width={15}
                                                            height={18}
                                                            alt="Picture of the author"
                                                            className="me-3"
                                                            style={{ width: "15px", height: "18px" }}
                                                        />
                                                        Quick Report
                                                    </Dropdown.Item> */}
                                                </DropdownButton>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div> : <></>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardTable;
