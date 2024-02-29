import { useState, useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';

export default function ConnectionSpeedPopup({ onSave,isEdit,dataSelected,isAdded }) {

    const [show, setShow] = useState(false);
    const [targetBy, setTargetBy] = useState("include");
    const [netspeeds, setNetspeeds] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSave = () => {
        onSave({ targetBy, netspeeds });
        handleClose();
    }
    
  useEffect(() => {
    if (dataSelected) {
      setTargetBy(dataSelected.targetBy || "Include");
      setNetspeeds(dataSelected.netspeeds || 'Lifetime of This Campaign');
    }
  }, [dataSelected]);
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
                    <Modal.Title className={`${FormCss.modal_title}`}>Connection Speed </Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.connection}`}>
                        <div className={`${FormCss.form_feilds}`}>
                            <label htmlFor="targetBy">Target By</label>
                            <select id="targetBy" name="targetBy" className={`${FormCss.static_select} form-control`}  value={targetBy}
                                onChange={(e) => setTargetBy(e.target.value)}>
                                <option selected disabled value="Include">Include</option>
                            </select>
                        </div>

                        <div className={`${FormCss.form_feilds}`}>
                            <label htmlFor="netspeeds">Netspeeds</label>
                            <select id="netspeeds" name="netspeeds" className='form-control'  value={netspeeds}
                                onChange={(e) => setNetspeeds(e.target.value)}>
                                <option selected value="Select Connection Speed">Select Connection Speed</option>
                                <option  value="Lifetime of This Campaign">Lifetime of This Campaign</option>
                                <option value="Unknown connection speed" disabled>Unknown connection speed</option>
                                <option value="Dialup (56kbps and slower)" disabled>Dialup (56kbps and slower)</option>
                                <option value="Broadband/4G (2mbps and faster)">Broadband/4G (2mbps and faster)</option>
                                <option value="UMTS/3G (384kbps and faster)">UMTS/3G (384kbps and faster)</option>
                                <option value="Basic DSL (786kbps and faster)">Basic DSL (786kbps and faster)</option>
                                <option value="HSDPA/3.5G (1.8mbps and faster)" disabled>HSDPA/3.5G (1.8mbps and faster)</option>
                                <option value="All connection speed">All connection speed</option>
                            </select>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleSave}>Save</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal >


        </>
    )
}