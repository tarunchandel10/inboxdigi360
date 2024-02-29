import { useState,useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import CreativeMain from './CreativeMain';
import { Baseurl } from './Baseurl';
// import CreativeTable from './creativeTable';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { getNewToken } from '@/pages/api/bulkUpload';


export default function CreativePopup({campId,onAssignedData,assignedItems}) {
    const [activeTab, setActiveTab] = useState('Eligible');
    const [creative, setCreative] = useState([]);
    const [eligible, setEligible] = useState([]);
    const [assign, setAssign] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
useEffect(() => {
    if (assignedItems) {
        setSelectedItems(assignedItems);
    }
}, [assignedItems]);
    function handleShow(){
        setShow(true);
        
        fetchEligible();
    }
   
const fetchEligible = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`${Baseurl}eligible-creative-list?campaign_id=${campId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            getNewToken(data)
            setEligible(data.data);
        } else {
            throw new Error('Failed to fetch eligible data');
        }
    } catch (error) {
        console.error('Error fetching eligible data:', error);
        setEligible([]); // Set an empty array or handle the error state accordingly
    }
};

  
    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    useEffect(() => {
        // Fetch campaign list from the API
        const fetchCreative = async () => {
            try {
                const token = localStorage.getItem('token'); // Replace 'your_token_key' with your actual key name
                const response = await fetch(`${Baseurl}all-creative-list`, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                        'Content-Type': 'application/json' // Set content type as needed
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCreative(data.data); // Update campaigns state with fetched data
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error or set a default value for campaigns
                setCreative([]);
            }
        };

        fetchCreative();
    }, []); 

    const handleCheckboxChange = (itemId) => {
        const isChecked = selectedItems.some(item => item.id === itemId);
        let updatedCheckedItems;
        if (isChecked) {
            updatedCheckedItems = selectedItems.filter(item => item.id !== itemId);
        } else {
            const selectedItem = eligible.find(item => item.id === itemId);
            updatedCheckedItems = selectedItem ? [...selectedItems, selectedItem] : selectedItems;
        }
        setSelectedItems(updatedCheckedItems);
    };

   // handle select all functtionality
const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const allItems = isChecked ? eligible : [];
    setSelectedItems(allItems);
};

const handleApply = () => {
    setAssign(selectedItems)
    onAssignedData(selectedItems);
    handleClose(); // Close the modal after applying
};
    return (
        <>


            <Button onClick={handleShow} className={`${FormCss.create_btn}`} >Assign Creatives</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.brandsafety_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Creatives</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>
 
                <Modal.Body className={`${FormCss.modal_body}`} >
                <Tabs
                                activeKey={activeTab}
                                onSelect={(tabName) => changeTab(tabName)}
                                id="uncontrolled-tab-example"
                                className="mb-3"
                                >
                                <Tab eventKey="all" title="All">
                                    <table className="table table-borderless ">
                                            <thead>
                                                <tr>
                                                <th>Name</th>
                                                <th>ID</th>
                                                <th>Type</th>
                                                <th>Format</th>
                                                <th>Dimension</th>
                                                <th>Exchange status</th>
                                                <th>Status</th>
                                                <th>Created</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                                    {creative?creative.map((item)=>{
                                                        return(
                                                            <>
                                                            <tr>
                                                               
                                                                <td>{item.name}</td>
                                                                <td>{item.id}</td>
                                                                <td>{item.creative_type}</td>
                                                                <td>{item.creative_upload_type}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>{item.status}</td>
                                                                <td>{item.created_at}</td>
                                                                </tr>
                                                            </>
                                                        )
                                                    }):""}
                                            </tbody>
                                        </table>
                                </Tab>
                                <Tab eventKey="Eligible" title="Eligible">
                                    <table className="table table-borderless ">
                                        <thead>
                                            <tr>
                                            <th>
                                                <input
                                                    type="checkbox"
                                                    name="selectAll"
                                                    id="selectAll"
                                                    checked={selectedItems.length === eligible.length}
                                                     onChange={handleSelectAllChange}
                                                />
                                                <label htmlFor="selectAll" className="cr"></label>
                                            </th>
                                            <th>name</th>
                                            <th>ID</th>
                                            <th>Type</th>
                                            <th>Format</th>
                                            <th>Dimension</th>
                                            <th>Exchange status</th>
                                            <th>Status</th>
                                            <th>Created</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {eligible ? eligible.map((item, index) => {
                                            return (
                                                <>
                                                    <tr key={item.id}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                name={`item${index}`}
                                                                id={`item${item.id}`} // Make sure the id corresponds to the item id
                                                                checked={selectedItems.some(selectedItem => selectedItem.id === item.id)}
                                                                onChange={() => handleCheckboxChange(item.id)} // Pass item id to the handler
                                                            />
                                                            <label htmlFor={`item${item.id}`} className="cr"></label>
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.creative_type}</td>
                                                        <td>{item.creative_upload_type}</td>
                                                        <td>{item.dimension}</td>
                                                        <td>{item.exchange_status}</td>
                                                        <td>{item.status}</td>
                                                        <td>{item.created_at}</td>
                                                    </tr>
                                                </>
                                            )
                                        }) : ""}
                                        </tbody>
                                    </table>
                                </Tab>
                                <Tab eventKey="assigned" title={`Assigned(${assign?assign.length:"0"})`}>

                                
                                <table className="table table-borderless ">
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>ID</th>
                                        <th>Type</th>
                                        <th>Format</th>
                                        <th>Dimension</th>
                                        <th>Exchange status</th>
                                        <th>Status</th>
                                        <th>Created</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {assign?assign.map((item)=>{
                                                    return(
                                                        <>
                                                          <tr>
                                                                <td>{item.name}</td>
                                                                <td>{item.id}</td>
                                                                <td>{item.creative_type}</td>
                                                                <td>{item.creative_upload_type}</td>
                                                                <td>{item.dimension}</td>
                                                                <td>{item.exchange_status}</td>
                                                                <td>{item.status}</td>
                                                                <td>{item.created_at}</td>
                                                         </tr>
                                                        </>
                                                    )
                                                }):""}
                                </tbody>
                                </table>
                                
                                </Tab>
                            </Tabs>
                   
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApply}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>


        </>
    )
}