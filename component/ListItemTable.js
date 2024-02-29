import { useEffect, useState } from 'react';
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRouter } from 'next/router';
import { Baseurl } from './Baseurl';

export default function ListItemTable({ data, dateChange, onCloneInsertion, campaign_insertion_id, campaign_id, onCloneLineItem }) {
    const router = useRouter();
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const handleEdit = (item) => {
        router.push(`/advertiser/edit-insertion-line-item?campaign_id=${item.campaign_id}&campaign_insertion_id=${item.campaign_insertion_id}&lineItemId=${item.id}`);
    };

    const createLineItem = () => {
        router.push(`/advertiser/inserationorder?campaign_id=${campaign_id}&campaign_insertion_id=${localData?.data[0]?.campaign_insertion_id || ""}`);
    };

    const handleStatusChange = async (lineItemId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Baseurl}update-line-item-status`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    line_item_id: lineItemId,
                    line_item_status: newStatus
                })
            });
    
            if (response.ok) {
                const responseData = await response.json();
                if (localData) {
                    const updatedData = localData.data.map(item => {
                        if (item.id === lineItemId) {
                            return { ...item, line_item_status: newStatus };
                        }
                        return item;
                    });
                    setLocalData({ ...localData, data: updatedData }); // Update data property
                }
            } else {
                throw new Error('Failed to update insertion line item status');
            }
        } catch (error) {
            console.error('Error updating insertion line item status:', error);
        }
    };
    

    return (
        <>
            <div className="container-fluid mt-4 p-0 dashboard-container">
                <div className="row table-data">
                    <div className="col-12">
                        <div className="table_top">
                            <button type="button" className="btn btn-outline-success" onClick={createLineItem}>New Line Item
                                <Image
                                    src="/images/plus.svg"
                                    width={20}
                                    height={20}
                                    alt="Picture of the author"
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </button>
                            <div className="custom_date">
                                <input id="startDate" type="date" onChange={dateChange} />
                            </div>
                            <span className="filter">Filter
                                <Image
                                    src="/images/Filter.svg"
                                    width={20}
                                    height={20}
                                    alt="Picture of the author"
                                    style={{ width: "20px", height: "20px" }}
                                />
                            </span>
                        </div>
                    </div>
                    {localData ? (
                        <div className="col-12 dashboard_table">
                            <div className="table-responsive">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>ID</th>
                                            <th>Insertion Order</th>
                                            <th>Budget</th>
                                            <th>Impression</th>
                                            <th>Clicks</th>
                                            <th>Media Cost</th>
                                            <th>Conv</th>
                                            <th>eCPM</th>
                                            <th>eCPC</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {localData.data.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    <input type="checkbox" id={`vehicle${item.id}`} name={`vehicle${item.id}`} value="Bike" />
                                                    <label htmlFor={`vehicle${item.id}`} className="cr"></label>
                                                </td>
                                                <td>
                                                    {item.line_item_status === "Pause" ?
                                                        <Image
                                                            src="/images/Pause.svg"
                                                            width={24}
                                                            height={24}
                                                            alt="Pause"
                                                            className="status-img"
                                                            style={{ width: "24px", height: "24px" }}
                                                        /> : item.line_item_status === "Active" ?
                                                            <Image
                                                                src="/images/Play.svg"
                                                                width={24}
                                                                height={24}
                                                                alt="Play"
                                                                className="status-img"
                                                                style={{ width: "24px", height: "24px" }}
                                                            /> :
                                                            <Image
                                                                src="/images/archieve.svg"
                                                                width={24}
                                                                height={24}
                                                                alt="Archive"
                                                                className="status-img"
                                                                style={{ width: "24px", height: "24px" }}
                                                            />
                                                    }
                                                    <select
                                                        className="form-select select_option"
                                                        value={item.line_item_status}
                                                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                    >
                                                        <option value="Active">Active</option>
                                                        <option value="Pause">Pause</option>
                                                        <option value="Archive">Archive</option>
                                                    </select>
                                                </td>
                                                <td>{item.name}</td>
                                                <td>3,950,0000 impr.</td>
                                                <td>478156</td>
                                                <td>36</td>
                                                <td>₹85,124.56</td>
                                                <td>11512498</td>
                                                <td>₹4,847</td>
                                                <td>₹6,847</td>
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
                                                            alt="Action"
                                                            style={{ width: "5px", height: "20px" }}
                                                        />}
                                                    >
                                                        <Dropdown.Item eventKey="1" className="p-md-3" onClick={() => handleEdit(item)}>
                                                            <Image
                                                                src="/images/edit_icon.svg"
                                                                width={18}
                                                                height={18}
                                                                alt="Edit"
                                                                className="me-3"
                                                                style={{ width: "18px", height: "18px" }}
                                                            />
                                                            Edit
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="2" className="p-md-3" onClick={() => onCloneLineItem(item.id)}>
                                                            <Image
                                                                src="/images/clone.svg"
                                                                width={17}
                                                                height={18}
                                                                alt="Clone"
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
                                                                alt="Quick Report"
                                                                className="me-3"
                                                                style={{ width: "15px", height: "18px" }}
                                                            />
                                                            Quick Report
                                                        </Dropdown.Item> */}
                                                        <Dropdown.Item eventKey="4" className="p-md-3">
                                                            <Image
                                                                src="/images/edit.svg"
                                                                width={19}
                                                                height={18}
                                                                alt="View Campaign"
                                                                className="me-3"
                                                                style={{ width: "19px", height: "18px" }}
                                                            />
                                                            View Campaign
                                                        </Dropdown.Item>
                                                    </DropdownButton>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                      
                            <div className='bg_page_white'>
                              <span className="loader"></span>
                            </div>
                    )}
                </div>
            </div>
        </>
    )
}
