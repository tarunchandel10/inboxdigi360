import { useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { LockFill } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons'; 
export default function EnvironmentPopup({onApply,isEdit,dataSelected,isAdded}) {
    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign learn more.
        </Tooltip>
    );
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState({
        web: dataSelected.includes('web'),
        app: dataSelected.includes('app'),
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCheckboxChange = (fieldName) => {
        setSelectedData((prevData) => ({
            ...prevData,
            [fieldName]: !prevData[fieldName],
        }));
    };

    const handleApply = () => {
        // Call the callback function passed from the parent component
        const selectedOptions = Object.entries(selectedData)
        .filter(([key, value]) => value)
        .map(([key]) => key);
        onApply(selectedOptions);
        handleClose();
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
                    <Modal.Title className={`${FormCss.modal_title}`}>Environment</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.popup_feilds}`}>
                        <div className={`${FormCss.environment}`}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={`${FormCss.form_feilds}`}>
                                        <div className={`${FormCss.checkbox_feild}`}>
                                            <div className={`${FormCss.checkboxs}`}>
                                                <input type="checkbox" name="web" id="web" checked={selectedData.web}
                                                    onChange={() => handleCheckboxChange("web")} />
                                                <label htmlFor="web" className="cr">Web</label>
                                            </div>
                                            <p>Inventory displayed in browsers</p>
                                            <div className={`${FormCss.checkboxs}`}>
                                                <input type="checkbox" name="app" id="app" checked={selectedData.app}
                                                    onChange={() => handleCheckboxChange("app")}/>
                                                <label htmlFor="app" className="cr">App</label>
                                            </div>
                                            <p>Inventory displayed in app</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                        <label htmlFor="positionScreen">Looking for related options?</label>
                                        <p>See position and device targeting.</p>
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
            </Modal >


        </>
    )
}