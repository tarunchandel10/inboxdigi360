import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Trash } from 'react-bootstrap-icons';
import FormCss from '../styles/form.module.css';
import { Plus } from 'react-bootstrap-icons';
export default function DayTimePopup({ onSave, isEdit, dataSelected, isAdded }) {
    const [show, setShow] = useState(false);
    const [budgetSegments, setBudgetSegments] = useState([
        {
            day: '',
            start_time: '',
            end_time: '',
        },
    ]);
    const [budgetSelect, setBudgetSelect] = useState('');
    const [timeZone, setTimeZone] = useState('Local');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    

    useEffect(() => {
        if (dataSelected) {
            setBudgetSegments(dataSelected.day_time && dataSelected.day_time.map((segment) => ({
                day: segment.day_name,
                start_time: segment.start_time,
                end_time: segment.end_time,
            })));
            setBudgetSelect(dataSelected.preset_schedule);
            setTimeZone(dataSelected.time_zone);
        }
    }, [dataSelected]);

    const handleSegmentChange = (index, field, value) => {
        const updatedSegments = [...budgetSegments];
        updatedSegments[index][field] = value;
        setBudgetSegments(updatedSegments);
    };

    const handleAddSegment = (e) => {
        e.preventDefault();
        setBudgetSegments([
            ...budgetSegments,
            {
                day: '',
                start_time: '',
                end_time: '',

            },
        ]);
    };

    const handleDeleteSegment = (index, event) => {
        event.preventDefault();
        const updatedSegments = [...budgetSegments];
        updatedSegments.splice(index, 1);
        setBudgetSegments(updatedSegments);
    };

    const handleSave = () => {
        const formattedSegments = budgetSegments && budgetSegments.map((segment) => ({
            day_name: segment.day,
            start_time: segment.start_time,
            end_time: segment.end_time,
        }));
        // Determining preset_schedule based on the selected option
        let preset_schedule;
        switch (budgetSelect) {
            case "Apply preset schedule":
                preset_schedule = "All days";
                break;
            default:
                preset_schedule = budgetSelect;
                break;
        }

        // Creating the final object
        const formattedData = {
            day_time: formattedSegments,
            time_zone: timeZone,
            preset_schedule: preset_schedule,
        };
        onSave(formattedData);
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
                    <Modal.Title className={`${FormCss.modal_title}`}>Day & Time </Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>
                        ✕
                    </button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                    <div className={`${FormCss.popup_feilds}`}>
                        <div className={`${FormCss.daynight_feilds}`}>
                            <div className="row">
                                <div className="col-md-7">
                                    <div className={`${FormCss.form_feilds}`}>
                                        <label htmlFor="inrLabel">Your ads will only run during these times</label>
                                        {budgetSegments && budgetSegments.map((segment, index) => (
                                            <div className={`${FormCss.checkbox_feild}`} key={index} id={`budgetList-${index}`}>
                                                <div className={`${FormCss.form_feilds}`}>
                                                    <label htmlFor="Day" className="cr">
                                                        Day
                                                    </label>
                                                    <div className="position-relative">
                                                        <select
                                                            name="Day"
                                                            id="Day"
                                                            value={segment.day}
                                                            onChange={(e) => handleSegmentChange(index, 'day', e.target.value)}
                                                        >
                                                            <option value="">Select a day</option>
                                                            <option value="Monday">Monday</option>
                                                            <option value="Tuesday">Tuesday</option>
                                                            <option value="Wednesday">Wednesday</option>
                                                            <option value="Thursday">Thursday</option>
                                                            <option value="Friday">Friday</option>
                                                            <option value="Saturday">Saturday</option>
                                                            <option value="Sunday">Sunday</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className={`${FormCss.form_feilds}`}>
                                                    <label htmlFor="startDate " className="cr">
                                                        Start Time
                                                    </label>
                                                    <input
                                                        type="time"
                                                        name="startTime"
                                                        id="startTime"
                                                        value={segment.start_time}
                                                        min={new Date().toISOString().split('T')[0]}
                                                        onChange={(e) => handleSegmentChange(index, 'start_time', e.target.value)}
                                                    />
                                                </div>

                                                <div className={`${FormCss.form_feilds}`}>
                                                    <label htmlFor="endDate" className="cr">
                                                        End Time
                                                    </label>
                                                    <input
                                                        type="time"
                                                        name="endTime"
                                                        id="endTime"
                                                        value={segment.end_time}
                                                        min={segment.start_time || new Date().toISOString().split('T')[0]}
                                                        onChange={(e) => handleSegmentChange(index, 'end_time', e.target.value)}
                                                    />
                                                </div>


                                                {budgetSegments.length > 1 && (
                                                    <button
                                                        className={`${FormCss.delete_btn} p-0 bg-transparent border-0`}
                                                        onClick={(event) => handleDeleteSegment(index, event)}
                                                    >
                                                        <Trash />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        <div className={`${FormCss.date_feilds}`}>
                                            <button className={`${FormCss.add_btn}`} onClick={handleAddSegment}>
                                                Add Segment
                                            </button>
                                            <select id="select_1" name="select_1" value={budgetSelect}
                                                onChange={(e) => setBudgetSelect(e.target.value)}
                                            >
                                                <option selected disabled value="Apply preset schedule">Apply preset schedule</option>
                                                <option value="Custom">Custom</option>
                                                <option value="All days">All days</option>
                                                <option value="Mondays-Fridays">Mondays-Fridays</option>
                                                <option value="Saturdays-Sundays">Saturdays-Sundays</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={`${FormCss.form_feilds}`}>
                                        <label htmlFor="Day" className="cr">Time zone</label>
                                        <input
                                            type="text"
                                            name="Day"
                                            id="Day"
                                            placeholder="Local"
                                            value={timeZone}
                                            onChange={(e) => setTimeZone(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="col-md-5">
                                    <label htmlFor="positionScreen">Targeted day and time; Local time zone</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleSave}>
                            Save
                        </Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>
                            Cancel
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}