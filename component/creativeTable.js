import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import FormCss from '../styles/form.module.css';
function CreativeTable({data,onAssignData }) {
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [assignedItems, setAssignedItems] = useState([]);
    const [activeTab, setActiveTab] = useState('all');

    const changeTab = (tabName) => {
        setActiveTab(tabName);
    };

    const handleSelectAll = (e) => {
      const isChecked = e.target.checked;
      setSelectAll(isChecked);
      if (isChecked) {
        setSelectedItems(data);
      } else {
        setSelectedItems([]);
      }
    };
  
    const handleSingleCheckboxChange = (e, item) => {
        const isChecked = e.target.checked;
        const updatedSelectedItems = [...selectedItems];
      
        // Find the index of the item in the copied array
        const itemIndex = updatedSelectedItems.findIndex(selectedItem => selectedItem.id === item.id);
      
        if (isChecked && itemIndex === -1) {
          // If checked and item not present in selectedItems, add it
          updatedSelectedItems.push(item);
        } else if (!isChecked && itemIndex !== -1) {
          // If unchecked and item is present in selectedItems, remove it
          updatedSelectedItems.splice(itemIndex, 1);
        }
      
        // Update the state with the modified array
        setSelectedItems(updatedSelectedItems);
      };

    const handleAssign = () => {
        setAssignedItems(selectedItems);
        onAssignData(selectedItems);
      };

    return ( 
        <>
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
                            <th>
                                <input
                                    type="checkbox"
                                    name="selectAll"
                                    id="selectAll"
                                    value="selectAll"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                    
                                />
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
                             
                                {data.map((item)=>{
                                    return(
                                        <>
                                        <tr>
                                            <td>
                                            <input
                    type="checkbox"
                    checked={selectedItems.some(selected => selected.id === item.id)}
                    onChange={(e) => handleSingleCheckboxChange(e, item)}
                    id={`checkbox-${item.id}`} 
                />
                <label htmlFor={`checkbox-${item.id}`} className="cr"></label>
                                            </td>
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
                                })}
                        </tbody>
                        </table>
                        </Tab>
                        <Tab eventKey="Eligible" title="Eligible">
                            <h2>tab1</h2>
                        </Tab>
                        <Tab eventKey="assigned" title={`Assigned(${assignedItems.length})`}>
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
                             
                                {assignedItems.map((item)=>{
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
                                })}
                        </tbody>
                        </table>
                         
                        </Tab>
                    </Tabs>
                    <Button type="btn" onClick={handleAssign} className={`${FormCss.create_btn}`}>Assign</Button>
        </>
     );
}

export default CreativeTable;