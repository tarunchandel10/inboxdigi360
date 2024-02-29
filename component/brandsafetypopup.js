import { useState, useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

export default function BrandSafetyPopup({ onDataSubmit, id, receivedDigitalContentLabels, receivedSensitiveCategories }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [digitalContentLabels, setDigitalContentLabels] = useState([]);
    const [sensitiveCategories, setSensitiveCategories] = useState([]);

    useEffect(() => {
        if (id && receivedDigitalContentLabels && receivedSensitiveCategories) {
            setDigitalContentLabels(receivedDigitalContentLabels);
            setSensitiveCategories(receivedSensitiveCategories);
        }
    }, [id, receivedDigitalContentLabels, receivedSensitiveCategories]);

    useEffect(() => {
        // Set all sensitive categories as selected by default
        setSensitiveCategories(['Sexual', 'Derogatory', 'Downloads & sharing', 'Weapons', 'Gambling', 'Violence', 'Suggestive', 'Profanity', 'Alcohol', 'Drugs', 'Tobacco', 'Politics', 'Religion', 'Tragedy', 'Transportation accidents', 'Shocking', 'Sensitive social issues']);
    }, []);

    // Function to handle changes in digital content labels checkboxes
    const handleDigitalContentLabelChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setDigitalContentLabels((prevLabels) => [...prevLabels, value]);
        } else {
            setDigitalContentLabels((prevLabels) =>
                prevLabels.filter((label) => label !== value)
            );
        }
    };

    // Function to handle changes in sensitive categories checkboxes
    const handleSensitiveCategoryChange = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setSensitiveCategories((prevCategories) => [...prevCategories, value]);
        } else {
            setSensitiveCategories((prevCategories) =>
                prevCategories.filter((category) => category !== value)
            );
        }
    };

    // Function to handle applying the selected values
    const handleApply = () => {
        onDataSubmit(digitalContentLabels, sensitiveCategories);
        handleClose();
    };

    return (
        <>
            <Button onClick={handleShow} className={`${FormCss.edit_tag}`}><img src="/images/edit.svg" alt="" /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.brandsafety_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Brand Safety</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <Accordion className={`${FormCss.accordian_block}`} defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Digital Content Label exclusions</Accordion.Header>
                            <Accordion.Body>
                                {id ?
                                    ['DL-G: General audiences', 'DL-PG: Audiences with parental guidance', 'DL-T: Teens and older audiences', 'DL-MA: Mature audiences', 'DL-?: Not yet labeled'].map((label) => (
                                        <div key={label} className={`${FormCss.checkboxs}`}>
                                            <input
                                                type="checkbox"
                                                name={label.replace(/[^A-Z0-9]+/ig, "_")}
                                                id={label.replace(/[^A-Z0-9]+/ig, "_")}
                                                defaultValue={label}
                                                onChange={handleDigitalContentLabelChange}
                                                checked={digitalContentLabels.includes(label)}
                                            />
                                            <label htmlFor={label.replace(/[^A-Z0-9]+/ig, "_")} className="cr">
                                                {label}
                                            </label>
                                        </div>
                                    )) :
                                    ['DL-G: General audiences', 'DL-PG: Audiences with parental guidance', 'DL-T: Teens and older audiences', 'DL-MA: Mature audiences', 'DL-?: Not yet labeled'].map((label) => (
                                        <div key={label} className={`${FormCss.checkboxs}`}>
                                            <input
                                                type="checkbox"
                                                name={label.replace(/[^A-Z0-9]+/ig, "_")}
                                                id={label.replace(/[^A-Z0-9]+/ig, "_")}
                                                defaultValue={label}
                                                onChange={handleDigitalContentLabelChange}
                                                checked={digitalContentLabels.includes(label)}
                                            />
                                            <label htmlFor={label.replace(/[^A-Z0-9]+/ig, "_")} className="cr">
                                                {label}
                                            </label>
                                        </div>
                                    ))
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Sensitive Category exclusions</Accordion.Header>
                            <Accordion.Body>
                                {id ?
                                    ['Sexual', 'Derogatory', 'Downloads & sharing', 'Weapons', 'Gambling', 'Violence', 'Suggestive', 'Profanity', 'Alcohol', 'Drugs', 'Tobacco', 'Politics', 'Religion', 'Tragedy', 'Transportation accidents', 'Shocking', 'Sensitive social issues'].map((category) => (
                                        <div key={category} className={`${FormCss.checkboxs}`}>
                                            <input
                                                type="checkbox"
                                                name={category.replace(/[^A-Z0-9]+/ig, "_")}
                                                id={category.replace(/[^A-Z0-9]+/ig, "_")}
                                                defaultValue={category}
                                                onChange={handleSensitiveCategoryChange}
                                                checked={sensitiveCategories.includes(category)}
                                            />
                                            <label htmlFor={category.replace(/[^A-Z0-9]+/ig, "_")} className="cr">
                                                {category}
                                            </label>
                                        </div>
                                    )) :
                                    ['Sexual', 'Derogatory', 'Downloads & sharing', 'Weapons', 'Gambling', 'Violence', 'Suggestive', 'Profanity', 'Alcohol', 'Drugs', 'Tobacco', 'Politics', 'Religion', 'Tragedy', 'Transportation accidents', 'Shocking', 'Sensitive social issues'].map((category) => (
                                        <div key={category} className={`${FormCss.checkboxs}`}>
                                            <input
                                                type="checkbox"
                                                name={category.replace(/[^A-Z0-9]+/ig, "_")}
                                                id={category.replace(/[^A-Z0-9]+/ig, "_")}
                                                defaultValue={category}
                                                onChange={handleSensitiveCategoryChange}
                                                checked={sensitiveCategories.includes(category)}
                                            />
                                            <label htmlFor={category.replace(/[^A-Z0-9]+/ig, "_")} className="cr">
                                                {category}
                                            </label>
                                        </div>
                                    ))
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.inner_titles}`}>
                        <p><img src="/images/setting.svg" alt="" /> These settings don’t impact serving.</p>
                    </div>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApply}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}
