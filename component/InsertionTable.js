import { useEffect, useState } from 'react'; // Import useState hook
import Image from "next/image";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useRouter } from 'next/router';
import { Baseurl } from "./Baseurl";
import SelectField from './Form/SelectField';
import { getNewToken } from '@/pages/api/bulkUpload';

export default function InsertionTable({ data, id, changeTab, handleViewLineItem, dateChange, onCloneInsertion ,handleFilterChange }) {
    const router = useRouter();
    const [localData, setLocalData] = useState(data); // State to hold local data

    useEffect(()=>{
        console.log(id,"id")
        setLocalData(data)
    },[data])
    const openInsertionForm = (e) => {
        window.location.href = `/advertiser/create-insertion-order?id=${id}`;
    }

    const handleEdit = (item) => {
        router.push(`/advertiser/edit-insertion-order?insertion_id=${item.id}`);
    };

    const handleViewLineItemInTable = (item) => {
        handleViewLineItem(item);
    };

    const handleStatusChange = async (insertionId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${Baseurl}update-insertion-order-status`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    insertion_order_id: insertionId,
                    insertion_status: newStatus
                })
            });

            if (response.ok) {
                const data = await response.json();
                getNewToken(data)
                const updatedData = localData.map(item => {
                    if (item.id === insertionId) {
                        return { ...item, insertion_status: newStatus };
                    }
                    return item;
                });
                setLocalData(updatedData); // Update local data
            } else {
                throw new Error('Failed to update insertion status');
            }
        } catch (error) {
            console.error('Error updating insertion status:', error);
        }
    };

    return (
        <>
            <div className="container-fluid mt-4 p-0 dashboard-container">
                <div className="row table-data">
                    <div className="col-12">
                        <div className="table_top">
                            <button type="button" className="btn btn-outline-success" onClick={openInsertionForm}>New Insertion Order
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
                            <div className="status-filter-container">
                                <SelectField
                                    setValue={(e)=>handleFilterChange(e,id)}
                                    name="filter" options={['Active', 'Pause', 'Archive', 'Completed']}
                                    placholder={'Filter'} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 dashboard_table">
                        <div className="table-responsive">
                            {localData ? <table className="table table-borderless ">
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
                                    {localData ? localData.map((item) => (
                                        <tr key={item.id} >

                                            <td>
                                                <input type="checkbox" id={`vehicle${item.id}`} name={`vehicle${item.id}`} value="Bike" />
                                                <label htmlFor={`vehicle${item.id}`} className="cr"></label>
                                            </td>
                                            <td>
                                                {item.insertion_status === "Pause" ?
                                                    <Image
                                                        src="/images/Pause.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Picture of the author"
                                                        className="status-img"
                                                        style={{ width: "24px", height: "24px" }}
                                                    /> : item.insertion_status === "Active"?
                                                    <Image
                                                        src="/images/Play.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Picture of the author"
                                                        className="status-img"
                                                        style={{ width: "24px", height: "24px" }}
                                                    />:
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
                                                    value={item.insertion_status}
                                                    onChange={(e) => handleStatusChange(item.id, e.target.value)}
                                                >
                                                    <option value="Active">Active</option>
                                                    <option value="Pause">Pause</option>
                                                    <option value="Archive">Archive</option>
                                                </select>
                                            </td>
                                            <td className="inseration-id" onClick={() => handleViewLineItemInTable(item)}>{item.name}</td>
                                            <td>
                                            </td>
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
                                                        alt="Picture of the author"
                                                        style={{ width: "5px", height: "20px" }}
                                                    />}
                                                >
                                                    <Dropdown.Item eventKey="1" className="p-md-3" onClick={() => handleEdit(item)}>
                                                        <Image
                                                            src="/images/edit_icon.svg"
                                                            width={18}
                                                            height={18}
                                                            alt="Picture of the author"
                                                            className="me-3"
                                                            style={{ width: "18px", height: "18px" }}
                                                        />
                                                        Edit
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="2" className="p-md-3" onClick={() => onCloneInsertion(item.id)}>
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
                                                    <Dropdown.Item eventKey="4" className="p-md-3">
                                                        <Image
                                                            src="/images/edit.svg"
                                                            width={19}
                                                            height={18}
                                                            alt="Picture of the author"
                                                            className="me-3"
                                                            style={{ width: "19px", height: "18px" }}
                                                        />
                                                        View  Campaign
                                                    </Dropdown.Item>
                                                </DropdownButton>

                                            </td>
                                        </tr>
                                    )) : ""}
                                </tbody>
                            </table> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
