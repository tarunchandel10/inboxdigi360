import { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LockFill } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons'; 
export default function ViewabilityPopup({onApply,isEdit,dataSelected,isAdded}) {
    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign learn more.
        </Tooltip>
    );
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [Viewability, setViewability] = useState("")

    useEffect(()=>{
        setViewability(dataSelected)
    },[dataSelected])
    const handleSelectChange = (event) => {
        setViewability(event.target.value);
    };

    const handleApply = () => {
        onApply(Viewability)
        
        handleClose(); // Close the modal after handling the data
    };
    return (
        <>

{isAdded ?<button className="addedButton">Added</button>:
            isEdit ?<Button onClick={handleShow} className={`${FormCss.edit_tag}`} ><img src="/images/edit.svg" alt="" /></Button>:<span onClick={handleShow} className={`${FormCss.edit_tags}`} ><Plus/></span>}
           
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.brandsafety_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Viewability</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.popup_feilds}`}>
                        <div className={`${FormCss.form_feilds}`}>
                            <label htmlFor="openMeasurement">Open Measurement
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <img src="/images/ask-tooltip.svg" alt="" />
                                </OverlayTrigger>
                            </label>
                            <p><LockFill /> Target only Open Measurement enables mobile display inventory.</p>
                            <label htmlFor="activeView">Active view</label>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="predictedViewability">Predicted Viewability</label>
                                    <select id="select_1" name="select_1" value={Viewability}
                                         onChange={handleSelectChange}>
                                        <option selected>Select Viewability</option>
                                        <option value="All impressions (greatest reach)">All impressions (greatest reach)</option>
                                        <option value="90% or greater">90% or greater</option>
                                        <option value="80% or greater">80% or greater</option>
                                        <option value="70% or greater">70% or greater</option>
                                        <option value="60% or greater">60% or greater</option>
                                        <option value="50% or greater">50% or greater</option>
                                        <option value="40% or greater">40% or greater</option>
                                        <option value="30% or greater">30% or greater</option>
                                        <option value="20% or greater">20% or greater</option>
                                        <option value="10% or greater">10% or greater</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
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