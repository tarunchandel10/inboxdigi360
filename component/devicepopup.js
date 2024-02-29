import { useState,useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import {CheckCircle, Check, Plus, SlashCircle,Slash,XCircle } from 'react-bootstrap-icons';
import { Baseurl } from './Baseurl';
import { getNewToken } from '@/pages/api/bulkUpload';

export default function DevicePopup({onSave,isEdit,dataSelected,isAdded}) {
    const [operatingSystem, setOperatingSystem] = useState([]);
    const [searchOSQuery, setSearchOSQuery] = useState('');
    const [searchMMQuery, setSearchMMQuery] = useState('');
    const [includedOS, setIncludedOS] = useState([]);
    const [excludedOS, setExcludedOS] = useState([]);
    const [makeModal, setMakeModal] = useState([]);
    const [includedMakeModal, setIncludedMakeModal] = useState([]);
    const [excludedMakeModal, setExcludedMakeModal] = useState([]);
    const [selectedDeviceTypes, setSelectedDeviceTypes] = useState([]);
    const [deviceTypes, setDeviceTypes] = useState([
        { id: 'computer', name: 'Computer' },
        { id: 'smartphone', name: 'Smartphone' },
        { id: 'tablet', name: 'Tablet' },
        { id: 'connectedTV', name: 'Connected TV' }
    ]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
    useEffect(() => {
        if (dataSelected) {
            setSelectedDeviceTypes(dataSelected.device_types || []);
            setIncludedOS(dataSelected.operating_system && dataSelected.operating_system.filter(os => os.type === 'include') || []);
            setExcludedOS(dataSelected.operating_system && dataSelected.operating_system.filter(os => os.type === 'exclude') || []);
            setIncludedMakeModal(dataSelected.make_model && dataSelected.make_model.filter(mm => mm.type === 'include') || []);
            setExcludedMakeModal(dataSelected.make_model && dataSelected.make_model.filter(mm => mm.type === 'exclude') || []);
        }
    }, [dataSelected]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const apiUrl = searchOSQuery
                    ? `${Baseurl}search-operating-system-list?keyword=${encodeURIComponent(searchOSQuery)}`
                    : `${Baseurl}all-operating-system-list`;

                const response = await fetch(apiUrl, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    getNewToken(data)
                    setOperatingSystem(data.data);
                } else {
                    throw new Error('Failed to fetch category data');
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setOperatingSystem([]);
            }
        };

        fetchData();
    }, [searchOSQuery]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const response = await fetch(`${Baseurl}all-make-model-list`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    getNewToken(data)
                    setMakeModal(data.data);
                } else {
                    throw new Error('Failed to fetch category data');
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
                setMakeModal([]);
            }
        };
        fetchData();
    }, []);

   


    const handleDeviceTypeChange = (type) => {
        if (selectedDeviceTypes.includes(type)) {
            setSelectedDeviceTypes(prevTypes => prevTypes.filter(t => t !== type));
        } else {
            setSelectedDeviceTypes(prevTypes => [...prevTypes, type]);
        }
    };
    const handleInclude = (item) => {
        const isAlreadyIncluded = includedOS.some((i) => i.id === item.id);

        if (isAlreadyIncluded) {
            // Item is already included, so remove it
            const updatedIncluded = includedOS.filter((i) => i.id !== item.id);
            setIncludedOS(updatedIncluded);
        } else {
            // Item is not included, so add it
            setIncludedOS([...includedOS, item]);
        }
        // Remove it from excludedOS
        const updatedExcluded = excludedOS.filter((i) => i.id !== item.id);
        setExcludedOS(updatedExcluded);
    };

    const handleExclude = (item) => {
        const isAlreadyExcluded = excludedOS.some((i) => i.id === item.id);

        if (isAlreadyExcluded) {
            // Item is already excluded, so remove it
            const updatedExcluded = excludedOS.filter((i) => i.id !== item.id);
            setExcludedOS(updatedExcluded);
        } else {
            // Item is not excluded, so add it
            setExcludedOS([...excludedOS, item]);
        }

        // Remove it from includedOS
        const updatedIncluded = includedOS.filter((i) => i.id !== item.id);
        setIncludedOS(updatedIncluded);
    };

    const handleIncludeMM = (item) => {
        const isAlreadyIncluded = includedMakeModal.some((i) => i.id === item.id);

        if (isAlreadyIncluded) {
            // Item is already included, so remove it
            const updatedIncluded = includedMakeModal.filter((i) => i.id !== item.id);
            setIncludedMakeModal(updatedIncluded);
        } else {
            // Item is not included, so add it
            setIncludedMakeModal([...includedMakeModal, item]);
        }
        // Remove it from excludedOS
        const updatedExcluded = excludedMakeModal.filter((i) => i.id !== item.id);
        setExcludedMakeModal(updatedExcluded);
    };

    const handleExcludeMM = (item) => {
        const isAlreadyExcluded = excludedMakeModal.some((i) => i.id === item.id);

        if (isAlreadyExcluded) {
            // Item is already excluded, so remove it
            const updatedExcluded = excludedMakeModal.filter((i) => i.id !== item.id);
            setExcludedMakeModal(updatedExcluded);
        } else {
            // Item is not excluded, so add it
            setExcludedMakeModal([...excludedMakeModal, item]);
        }

        // Remove it from includedOS
        const updatedIncluded = includedMakeModal.filter((i) => i.id !== item.id);
        setIncludedMakeModal(updatedIncluded);
    };

    const handleSave = () => {
        // Gather selected device types
        

        // Gather selected operating systems
        const selectedOperatingSystems = includedOS.map(os => ({ id: os.id, name: os.name, type: 'include' }))
            .concat(excludedOS.map(os => ({ id: os.id, name: os.name, type: 'exclude' })));

        // Gather selected make and models
        const selectedMakeModels = includedMakeModal.map(mm => ({ id: mm.id, name: mm.name, type: 'include' }))
            .concat(excludedMakeModal.map(mm => ({ id: mm.id, name: mm.name, type: 'exclude' })));

        // Assemble the final data
        const formData = {
            device_types: selectedDeviceTypes,
            operating_system: selectedOperatingSystems,
            make_model: selectedMakeModels,
        };
        // Log the formatted data for testing
        onSave(formData);
        handleClose()
        // TODO: Send the formData to your server or perform other actions
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
                    <Modal.Title className={`${FormCss.modal_title}`}>Device </Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
                <Accordion className={`${FormCss.accordian_block}`} defaultActiveKey={['0']}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Device Type</Accordion.Header>
                            <Accordion.Body>
                            {deviceTypes.map((type, index) => (
                                <div className={`${FormCss.checkboxs}`} key={index}>
                                    <input
                                        type="checkbox"
                                        name="deviceType"
                                        id={type.id}
                                        checked={selectedDeviceTypes.includes(type.id)}
                                        onChange={() => handleDeviceTypeChange(type.id)}
                                    />
                                    <label htmlFor={type.id} className="cr">{type.name}</label>
                                </div>
                            ))}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Operating System <span className="mx-auto">{`${includedOS?includedOS.length:"0"} item included`} ,{excludedOS?excludedOS.length:"0"} item excluded  </span></Accordion.Header>
                            <Accordion.Body>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className={`${FormCss.language_innerbox}`}>
                                            <div className={`${FormCss.language_search}`}>
                                                <input type="search" name="search" className="pac-target-input" id="search" placeholder="Search for Operating System to include or exclude"  value={searchOSQuery}
                                                    onChange={(e) => setSearchOSQuery(e.target.value)}/>
                                            </div>
                                            <div className={`${FormCss.languages_box}`}>
                                                {operatingSystem.map((item, index) => (
                                                   
                                                    <div className={`${FormCss.languages_feild}`} key={index}>
                                                        {item.name}
                                                        <div className={`${FormCss.languages_btns}`}>
                                                            <Button onClick={() => handleInclude(item)}
                                                            className={`include_btn  ${
                                                                includedOS.some(lang => lang.id === item.id) ? 'clicked-btn' : ''
                                                            } `}>
                                                                <CheckCircle />
                                                            </Button>
                                                            <Button onClick={() => handleExclude(item,index)}
                                                            className={`exclude_btn ${
                                                                excludedOS.some(lang => lang.id === item.id) ? 'clicked-btn' : ''
                                                            }`}>
                                                                <SlashCircle />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className={`${FormCss.language_innerbox}`}>
                                        <div className={`${FormCss.selected_lang_header}`}>
                                            <Button >Clear All</Button>
                                        </div>
                                        <div className={`${FormCss.selection_header}`}>
                                            <p><CheckCircle/> included</p>
                                        </div>
                                        <div className={`${FormCss.selection_lang} height-device`}>
                                            {includedOS.map((item, index) => (
                                                <div className={`${FormCss.selected_language}`} key={index}>
                                                    <p>{item.name}</p>
                                                    <Button onClick={() => setIncludedOS(prevIncludeApps => prevIncludeApps.filter((_, i) => i !== index))}>
                                                        <XCircle />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={`${FormCss.selection_header}`}>
                                            <p><SlashCircle/> excluded</p>
                                        </div>
                                        <div className={`${FormCss.selection_lang} height-device`}>
                                            {excludedOS.map((item, index) => (
                                                <div className={`${FormCss.selected_language}`} key={index}>
                                                    <p>{item.name}</p>
                                                    <Button onClick={() => setExcludedOS(prevExcludeApps => prevExcludeApps.filter((_, i) => i !== index))}>
                                                        <XCircle />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Make & Model <span className="mx-auto">{`${includedMakeModal?includedMakeModal.length:"0"} item included`} ,{excludedMakeModal?excludedMakeModal.length:"0"} item excluded  </span></Accordion.Header>
                            <Accordion.Body>
                            <div className="row">
                                    <div className="col-md-8">
                                        <div className={`${FormCss.language_innerbox}`}>
                                            <div className={`${FormCss.language_search}`}>
                                                <input type="search" name="search" className="pac-target-input" id="search" placeholder="Search for Operating System to include or exclude"  value={searchOSQuery}
                                onChange={(e) => setSearchMMQuery(e.target.value)}/>
                                            </div>
                                            <div className={`${FormCss.languages_box}`}>
                                                {makeModal.map((item, index) => (
                                                    <div className={`${FormCss.languages_feild}`} key={index}>
                                                        {item.name}
                                                        <div className={`${FormCss.languages_btns}`}>
                                                            <Button onClick={() => handleIncludeMM(item)}
                                                            className={`include_btn  ${
                                                                includedMakeModal.some(lang => lang.id === item.id) ? 'clicked-btn' : ''
                                                            }`}>
                                                                <CheckCircle />
                                                            </Button>
                                                            <Button onClick={() => handleExcludeMM(item,index)}
                                                            className={`exclude_btn ${
                                                                excludedMakeModal.some(lang => lang.id === item.id) ? 'clicked-btn' : ''
                                                            }`}>
                                                                <SlashCircle />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className={`${FormCss.language_innerbox}`}>
                                        <div className={`${FormCss.selected_lang_header}`}>
                                            <Button >Clear All</Button>
                                        </div>
                                        <div className={`${FormCss.selection_header}`}>
                                            <p><CheckCircle/> included</p>
                                        </div>
                                        <div className={`${FormCss.selection_lang} height-device`}>
                                            {includedMakeModal.map((item, index) => (
                                                <div className={`${FormCss.selected_language}`} key={index}>
                                                    <p>{item.name}</p>
                                                    <Button onClick={() => setIncludedMakeModal(prevIncludeApps => prevIncludeApps.filter((_, i) => i !== index))}>
                                                        <XCircle />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className={`${FormCss.selection_header}`}>
                                            <p><SlashCircle/> excluded</p>
                                        </div>
                                        <div className={`${FormCss.selection_lang} height-device`}>
                                            {excludedMakeModal.map((item, index) => (
                                                <div className={`${FormCss.selected_language}`} key={index}>
                                                    <p>{item.name}</p>
                                                    <Button onClick={() => setExcludedMakeModal(prevExcludeApps => prevExcludeApps.filter((_, i) => i !== index))}>
                                                        <XCircle />
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
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