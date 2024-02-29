import { useState } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons'; 
export default function PositionPopup({onApply, isEdit, dataSelected,isAdded}) {
    const [show, setShow] = useState(false);
    const [selectedDisplayPositions, setSelectedDisplayPositions] = useState(dataSelected.positions || []);
    const [selectedContentDisplayPositions, setSelectedContentDisplayPositions] = useState(dataSelected.positions_display || []);
    const [selectedNativePositions, setSelectedNativePositions] = useState(dataSelected.positions_native || []);

    const handleShow = () => setShow(true);
    
    const handleClose = () => {
        setShow(false);
        
    };

    const handleApply = () => {
        // Format the selected positions into the desired structure
        const positionsData = {
            positions: selectedDisplayPositions,
            positions_display: selectedContentDisplayPositions,
            positions_native: selectedNativePositions,
        };
onApply(positionsData)
        // You can now use the 'positionsData' object as needed, e.g., send it to the server or update the state.

        // Close the modal
        handleClose();
    };
    const handleCheckboxChange = (category, value) => {
        // Update the state based on the checkbox selection
        switch (category) {
            case 'display':
                setSelectedDisplayPositions((prevPositions) => {
                    if (prevPositions.includes(value)) {
                        return prevPositions.filter((position) => position !== value);
                    } else {
                        return [...prevPositions, value];
                    }
                });
                break;
            case 'contentdisplay':
                setSelectedContentDisplayPositions((prevPositions) => {
                    if (prevPositions.includes(value)) {
                        return prevPositions.filter((position) => position !== value);
                    } else {
                        return [...prevPositions, value];
                    }
                });
                break;
            case 'native':
                setSelectedNativePositions((prevPositions) => {
                    if (prevPositions.includes(value)) {
                        return prevPositions.filter((position) => position !== value);
                    } else {
                        return [...prevPositions, value];
                    }
                });
                break;
            default:
                break;
        }
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
                    <Modal.Title className={`${FormCss.modal_title}`}>Position</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.popup_feilds}`}>
                        <div className={`${FormCss.form_feilds}`}>
                            <label htmlFor="positionScreen"> Select position on screen</label>
                            <label htmlFor="display">Display</label>
                            <div className={`${FormCss.checkbox_feild}`}>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="display" id="display1"  onChange={() => handleCheckboxChange('display', 'Above the fold')} checked={selectedDisplayPositions.includes('Above the fold')}/>
                                    <label htmlFor="display1" className="cr">Above the fold</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="display" id="display2"  onChange={() => handleCheckboxChange('display', 'Below  the fold')} checked={selectedDisplayPositions.includes('Below  the fold')}/>
                                    <label htmlFor="display2" className="cr">Below the fold</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="display" id="display3"  onChange={() => handleCheckboxChange('display', 'Unknown')} checked={selectedDisplayPositions.includes('Unknown')}/>
                                    <label htmlFor="display3" className="cr">Unknown</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={`${FormCss.popup_feilds}`}>
                        <div className={`${FormCss.form_feilds}`}>
                            <label htmlFor="positionContent"> Select position in content</label>
                            <label htmlFor="display">Display</label>
                            <div className={`${FormCss.checkbox_feild}`}>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="contentdisplay" id="contentdisplay1" onChange={() => handleCheckboxChange('contentdisplay', 'In-article')} checked={selectedContentDisplayPositions.includes('In-article')}/>
                                    <label htmlFor="contentdisplay1" className="cr">In-article</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="contentdisplay" id="contentdisplay2" onChange={() => handleCheckboxChange('contentdisplay', 'In-feed')} checked={selectedContentDisplayPositions.includes('In-feed')}/>
                                    <label htmlFor="contentdisplay2" className="cr">In-feed</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="contentdisplay" id="contentdisplay3" onChange={() => handleCheckboxChange('contentdisplay', 'Interstitial')} checked={selectedContentDisplayPositions.includes('Interstitial')}/>
                                    <label htmlFor="contentdisplay3" className="cr">Interstitial</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="contentdisplay" id="contentdisplay4" onChange={() => handleCheckboxChange('contentdisplay', 'In-banner')} checked={selectedContentDisplayPositions.includes('In-banner')}/>
                                    <label htmlFor="contentdisplay4" className="cr">In-banner</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="contentdisplay" id="contentdisplay5" onChange={() => handleCheckboxChange('contentdisplay', 'Unknown')} checked={selectedContentDisplayPositions.includes('Unknown')}/>
                                    <label htmlFor="contentdisplay5" className="cr">Unknown</label>
                                </div>
                            </div>

                            <label htmlFor="native">Native</label>
                            <div className={`${FormCss.checkbox_feild}`}>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="native" id="native1"  onChange={() => handleCheckboxChange('native', 'In-article')} checked={selectedNativePositions.includes('In-article')}/>
                                    <label htmlFor="native1" className="cr">In-article</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="native" id="native2" onChange={() => handleCheckboxChange('native', 'In-feed')} checked={selectedNativePositions.includes('In-feed')}/>
                                    <label htmlFor="native2" className="cr">In-feed</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="native" id="native3" onChange={() => handleCheckboxChange('native', 'Peripheral')} checked={selectedNativePositions.includes('Peripheral')}/>
                                    <label htmlFor="native3" className="cr">Peripheral</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="native" id="native4" onChange={() => handleCheckboxChange('native', 'Recommendation')} checked={selectedNativePositions.includes('Recommendation')}/>
                                    <label htmlFor="native4" className="cr">Recommendation</label>
                                </div>
                                <div className={`${FormCss.checkboxs}`}>
                                    <input type="checkbox" name="native" id="native5" onChange={() => handleCheckboxChange('native', 'Unknown')} checked={selectedNativePositions.includes('Unknown')}/>
                                    <label htmlFor="native5" className="cr">Unknown</label>
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