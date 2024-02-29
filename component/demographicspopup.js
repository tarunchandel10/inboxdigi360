import React, { useState, useEffect } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AgeRange from './rangeSlider';

export default function DemographicsPopup({ onApply, id, parentStatus, genderCat, ageSelected, selectAgeRange, incomeSelected, selectIncomeRange }) {
    const [gender, setGender] = useState({ male: false, female: false, unknown: false });
    const [genderData, setGenderData] = useState([]);
    const [parentalStatus, setParentalStatus] = useState([]);
    const [age, setAge] = useState([]);
    const [ageRange, setAgeRange] = useState("");
    const [incomeRange, setIncomeRange] = useState("");
    const [income, setIncome] = useState([]);
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [minIncome, setMinIncome] = useState("");
    const [maxIncome, setMaxIncome] = useState("");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (id) {
            setGender({ male: genderCat && genderCat.includes('male'), female: genderCat && genderCat.includes('female'), unknown: genderCat && genderCat.includes('unknown') });
            setAge(ageSelected);
            setIncome(incomeSelected);
            setParentalStatus(parentStatus);
            if (selectIncomeRange) {
                const [minIncomeValue, maxIncomeValue] = selectIncomeRange.split('-').map(Number);
                setMinIncome(minIncomeValue);
                setMaxIncome(maxIncomeValue);
            }
            if (selectAgeRange) {
                const [minAgeValue, maxAgeValue] = selectAgeRange.split('-').map(Number);
                setMinAge(minAgeValue);
                setMaxAge(maxAgeValue);
            }
        }
    }, [id, ageSelected, incomeSelected, parentStatus, selectIncomeRange, selectAgeRange]);

    const handleGenderChange = (event) => {
        const { name, checked } = event.target;
        setGender((prevGender) => {
            const newGender = { ...prevGender };
            newGender[name] = checked;
            return newGender;
        });
    };

    useEffect(() => {
        const trueValues = Object.keys(gender).filter((key) => gender[key]);
        setGenderData(trueValues);
    }, [gender]);

    const handleAgeChange = (data) => {
        if (data.type === "age") {
            setAgeRange(data.data);
        }
        if (data.type === "income") {
            setIncomeRange(data.data);
        }
    };

    const handleApply = () => {
        const dataToSend = {
            gender: genderData,
            parentalStatus,
            age,
            ageRange,
            incomeRange,
            income,
        };
        
        onApply(dataToSend);
        handleClose();
    };

    const handleParentStatusChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setParentalStatus((prevStatus) => [...prevStatus, value]);
        } else {
            setParentalStatus((prevStatus) => prevStatus.filter((status) => status !== value));
        }
    };

    const handleIncomeChange = (event) => {
        const { value, checked } = event.target;
     
            if (checked) {
                setIncome((prevIncome) => [...prevIncome, value]);
            } else {
                setIncome((prevIncome) => prevIncome.filter((item) => item !== value));
            }
    };

    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign learn more.
        </Tooltip>
    );

    return (
        <>
            <Button onClick={handleShow} className={`${FormCss.edit_tag}`}><img src="/images/edit.svg" alt="" /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.demographic_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Demographics</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>
                <Modal.Body className={`${FormCss.modal_body}`}>
                    <div className="row">
                        <div className="col-md-3">
                            <label htmlFor="Gender" className={`${FormCss.checkbox_label}`}>Gender</label>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="male" value="male" id="GenderMale" onChange={handleGenderChange} checked={gender.male} />
                                <label htmlFor="GenderMale" className="cr">Male</label>
                            </div>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="female" value="female" id="GenderFemale" onChange={handleGenderChange} checked={gender.female} />
                                <label htmlFor="GenderFemale" className="cr">Female</label>
                            </div>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="unknown" value="unknown" id="genderUnknown" onChange={handleGenderChange} checked={gender.unknown} />
                                <label htmlFor="genderUnknown" className="cr">Unknown</label>
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <img src="/images/ask-tooltip.svg" alt="" />
                                </OverlayTrigger>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="Age" className={`${FormCss.checkbox_label}`}>Age</label>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="age" value="ageRange" id="ageRange" checked={age.includes("ageRange")} onChange={(e) => {
                                    if (e.target.checked) {
                                        setAge([...age, e.target.value]);
                                    } else {
                                        setAge(age.filter(item => item !== e.target.value));
                                    }
                                }} />
                                <label htmlFor="ageRange" className="cr">Age Range</label>
                            </div>

                            {age.includes("ageRange") ? <AgeRange min={15} max={65} rangeValue={[15, 25, 35, 45, 55, 65]} type="age" onChange={handleAgeChange} minimumVal={minAge} maximumVal={maxAge} /> : ""}
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="age" value="Unknown" id="ageUnknown" checked={age.includes("Unknown")} onChange={(e) => {
                                    if (e.target.checked) {
                                        setAge([...age, e.target.value]);
                                    } else {
                                        setAge(age.filter(item => item !== e.target.value));
                                    }
                                }} />
                                <label htmlFor="ageUnknown" className="cr">Unknown</label>
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <img src="/images/ask-tooltip.svg" alt="" />
                                </OverlayTrigger>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="parentalStatus" className={`${FormCss.checkbox_label}`}>Parental Status</label>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="parentstatus" value="Parent" id="parent" checked={parentalStatus.includes("Parent")} onChange={handleParentStatusChange} />
                                <label htmlFor="parent" className="cr">Parent</label>
                            </div>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="parentstatus" value="Not a Parent" id="notParent" checked={parentalStatus.includes("Not a Parent")} onChange={handleParentStatusChange} />
                                <label htmlFor="notParent" className="cr">Not a Parent</label>
                            </div>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="parentstatus" value="Unknown" id="parentalUnknown" checked={parentalStatus.includes("Unknown")} onChange={handleParentStatusChange} />
                                <label htmlFor="parentalUnknown" className="cr">Unknown</label>
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <img src="/images/ask-tooltip.svg" alt="" />
                                </OverlayTrigger>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <label htmlFor="householdIncome" className={`${FormCss.checkbox_label}`}>Household Income</label>
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="incomeRange" id="incomeRange" value="incomeRange" checked={income.includes("incomeRange")} onChange={handleIncomeChange} />
                                <label htmlFor="incomeRange" className="cr">Income Range</label>
                            </div>

                            {income.includes("incomeRange") ? <AgeRange min={10} max={50} rangeValue={['Top 10%', 'Top 11-20%', 'Top 21 - 30%', 'Top 31-40%', 'Top 41 -50%', 'Top 51 - 60%']} type="income" minimumVal={minIncome} maximumVal={maxIncome} onChange={handleAgeChange} /> : ""}
                            <div className={`${FormCss.checkboxs}`}>
                                <input type="checkbox" name="incomeRange" id="householdUnknown" value="unknown" checked={income.includes("unknown")} onChange={handleIncomeChange} />
                                <label htmlFor="householdUnknown" className="cr">Unknown</label>
                                <OverlayTrigger placement="right" overlay={tooltip}>
                                    <img src="/images/ask-tooltip.svg" alt="" />
                                </OverlayTrigger>
                            </div>
                        </div>
                    </div>
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
    )
}
