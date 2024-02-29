import { useEffect, useState } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Plus } from 'react-bootstrap-icons';

export default function KeywordPopup({ onApply, isEdit, dataSelected, isAdded }) {

    const [show, setShow] = useState(false);
    const [keywords, setKeywords] = useState({ include: [], exclude: [] });
    const [error, setError] = useState('');

    const handleClose = () => {
        setShow(false);
        setError('');
    };

    useEffect(()=>{
        if(dataSelected){
            setKeywords(dataSelected)
        }
    },[dataSelected])

    const handleShow = () => setShow(true);

    const handleKeywordChange = (event, type) => {
        setKeywords(prevState => ({
            ...prevState,
            [type]: event.target.value.split('\n')
        }));
    };
   
    
    const handleApply = () => {
        if (JSON.stringify(keywords) !== JSON.stringify(dataSelected)) {
            onApply(keywords);
        }
        handleClose();
    };

    return (
        <>
            {isAdded ? <button className="addedButton">Added</button> :
                isEdit ? <Button onClick={handleShow} className={`${FormCss.edit_tag}`} ><img src="/images/edit.svg" alt="" /></Button> : <span onClick={handleShow} className={`${FormCss.edit_tags}`} ><Plus /></span>}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.brandsafety_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Keyword</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>
                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <Tabs
                        defaultActiveKey="include"
                        id="keyword"
                        className="mb-3"
                    >
                        <Tab eventKey="include" title="Include">
                            <div className={`${FormCss.keyword}`}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={`${FormCss.keyfeilds}`}>
                                            <textarea
                                                id="includeKeywords"
                                                name="includeKeywords"
                                                type="textarea"
                                                placeholder="Enter a list of keywords to include, either one item to a line or separated by commas."
                                                value={keywords.include.join('\n')}
                                                onChange={(event) => handleKeywordChange(event, 'include')}
                                            />
                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.keyfeilds}`}>
                                            <div className={`${FormCss.form_feilds}`}>
                                                <label htmlFor="relatedOptions">Looking for related options?</label>
                                                <p>Do you frequently exclude the same keywords? Save time with keyword lists. <a href="#">Learn more</a></p>
                                              
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="exclude" title="Exclude">
                            <div className={`${FormCss.keyword}`}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className={`${FormCss.keyfeilds}`}>
                                            <textarea
                                                id="excludeKeywords"
                                                name="excludeKeywords"
                                                type="textarea"
                                                placeholder="Enter a list of keywords to exclude, either one item to a line or separated by commas."
                                                value={keywords.exclude.join('\n')}
                                                onChange={(event) => handleKeywordChange(event, 'exclude')}
                                            />
                                           
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.keyfeilds}`}>
                                            <div className={`${FormCss.form_feilds}`}>
                                                <label htmlFor="relatedOptions">Looking for related options?</label>
                                                <p>Do you frequently exclude the same keywords? Save time with keyword lists. <a href="#">Learn more</a></p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
