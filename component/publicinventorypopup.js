import { useState,useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


export default function PublicInventoryPopup({id,onApply,inventoryData,inventorySelectedList}) {
    const [checkedItems, setCheckedItems] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (id && inventorySelectedList) {
            const selectedItems = inventorySelectedList.filter(item => inventoryData.includes(item));
            setCheckedItems(selectedItems);
        } else if (!id) {
            setCheckedItems(inventorySelectedList);
        }
    }, [id, inventoryData, inventorySelectedList]);

// handle select all functtionality
const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    const allItems = isChecked ? inventoryData : [];
    setCheckedItems(allItems);
};

// handle the functionality when checkbox change
const handleCheckboxChange = (itemName) => {
    const isChecked = checkedItems.includes(itemName);
    const updatedCheckedItems = isChecked
        ? checkedItems.filter((item) => item !== itemName)
        : [...checkedItems, itemName];

    setCheckedItems(updatedCheckedItems);
};

// handle to send the data to parent component on click of apply btn
const handleApplyClick = () => {
    onApply(checkedItems);
    handleClose();
};

    return (
        <>
            <Button onClick={handleShow} className={`${FormCss.edit_tag}`} ><img src="/images/edit.svg" alt="" /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.publicinventory_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Inventory Source - Public Inventory</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} >
                <div className="select-all">
                    
                        <input
                            type="checkbox"
                            name="selectAll"
                            id="selectAll"
                            value="selectAll"
                            checked={checkedItems.length === inventoryData.length}
                            onChange={handleSelectAllChange}
                        />
                        <label htmlFor="selectAll" className="cr">Select All</label>
                    </div>
                    {inventoryData.map((item, index) => (
                        <div className={`${FormCss.checkboxs}`} key={index}>
                            <input
                                type="checkbox"
                                name={item}
                                id={item}
                                value={item}
                                checked={checkedItems.includes(item)}
                                onChange={() => handleCheckboxChange(item)}
                            />
                            <label htmlFor={item} className="cr">{item}</label>
                        </div>
                    ))}
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApplyClick}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>


        </>
    )
}