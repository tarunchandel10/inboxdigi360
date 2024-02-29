import { useState, useEffect } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Plus } from 'react-bootstrap-icons';
import BrowserPopup from './browserpopup';
import CarrierISPPopup from './carrierISPpopup';
import ConnectionSpeedPopup from './connectionspeedpopup';
import DayTimePopup from './daytimepopup';
import DevicePopup from './devicepopup';
import EnvironmentPopup from './environmentpopup';
import KeywordPopup from './keywordspopup';
import PositionPopup from './positionpopup';
import AppsURLPopup from './appsurlpopup';
import ViewabilityPopup from './viewabilitypopup';
import LanguagePopup from './languagepopup';
import CategoriesPopup from './categoriespopup';
import GeographyPopup from './geographypopup';
import BrandSafetyPopup from './brandsafetypopup';
import DemographicsPopup from './demographicspopup';


export default function TargetingPopup({ onUpdateData, receivedData, handleMultipleStates }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [carrierService, setcarrierService] = useState('');
    const [appUrls, setappsUrl] = useState('');
    const [selectBrowser, setSelectBrowser] = useState('');
    const [categoryData, setcategoryData] = useState('');
    const [dayData, setDayData] = useState('');
    const [connnectionData, setConnectionData] = useState('');
    const [viewability, setviewability] = useState('');
    const [environmentData, setenvironmentData] = useState('');
    const [keyword, setKeyword] = useState('');
    const [deviceData, setDeviceData] = useState('');
    const [position, setPosition] = useState('');
    useEffect(() => {
        setcarrierService(receivedData?.carrierService || '');
        setappsUrl(receivedData?.appUrls || '');
        setSelectBrowser(receivedData?.selectBrowser || '');
        setcategoryData(receivedData?.categoryData || '');
        setDayData(receivedData?.dayData || '');
        setConnectionData(receivedData?.connnectionData || '');
        setviewability(receivedData?.viewability || '');
        setenvironmentData(receivedData?.environmentData || '');
        setKeyword(receivedData?.keyword || '');
        setDeviceData(receivedData?.deviceData || '');
        setPosition(receivedData?.position || '');
    }, [receivedData]);

    const handleBrowser = (selectedData) => {
        setSelectBrowser(selectedData);
        handleMultipleStates(selectedData, 'browser')
    };
    const handleEnvironment = (selectedData) => {
        setenvironmentData(selectedData)
        handleMultipleStates(selectedData, 'environment')
    };

    const handleCarrierService = (selectedData) => {
        setcarrierService(selectedData);
        handleMultipleStates(selectedData, 'carrier')
    };
    const handleSave = (selectedValues) => {
        setConnectionData(selectedValues)
        handleMultipleStates(selectedValues, 'connectionspeed')

    };
    const handleAppsURL = (selectedValues) => {
        setappsUrl(selectedValues)
        handleMultipleStates(selectedValues, 'appurl')
    };
    const handleViewability = (selectedValues) => {
        setviewability(selectedValues)
        handleMultipleStates(selectedValues, 'viewability')
    };
    const handleKeyword = (selectedValues) => {
        setKeyword(selectedValues)
        handleMultipleStates(selectedValues, 'keywords')
    };
    const handlePosition = (selectedValues) => {
        setPosition(selectedValues)
        handleMultipleStates(selectedValues, 'positions')
    };
    const handleSaveDayData = (data) => {
        setDayData(data);
        handleMultipleStates(data, 'daydata')
    };
    const handleSaveDeviceData = (formData) => {
        setDeviceData(formData);
        handleMultipleStates(formData, 'device')
    };
    const handleCategory = (data) => {
        setcategoryData(data);
        handleMultipleStates(data, 'category')
    };
    const sendData = () => {
        const allData = {
            carrierService,
            appUrls,
            selectBrowser,
            categoryData,
            dayData,
            connnectionData,
            viewability,
            environmentData,
            keyword,
            deviceData,
            position,
        };
        onUpdateData(allData);
        handleClose();
    };
   useEffect(()=>{
   },[])
    return (
        <>

            <div className={`${FormCss.form_feilds}`}>
                <Button onClick={handleShow} className={`${FormCss.add_btn}`}>Other Targeting <span><Plus /></span></Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.targeting_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Other Targeting</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>

                <Modal.Body className={`${FormCss.modal_body}`}>
                    <div className={`${FormCss.targeting_feilds}`}>

                        <Button className={`position-relative ${receivedData && receivedData.appUrls && receivedData.appUrls.length > 0 ? "added" : ""}`} onClick={handleShow} >Apps & URL
                            <span className="btn-add">
                                <AppsURLPopup
                                    onApply={handleAppsURL}
                                    // showSelectedApps={appUrls}
                                    dataSelected={receivedData && receivedData.appUrls}
                                    isAdded={receivedData && receivedData.appUrls && receivedData.appUrls.length > 0 ? true : false}
                                />
                            </span>
                        </Button>
                        <Button className={`position-relative added`} onClick={handleShow} >Language <span className="btn-add">Added</span></Button>
                        <Button className={`position-relative ${receivedData && receivedData.categoryData && (receivedData.categoryData.excluded_assign_category_list.length > 0 || receivedData.categoryData.included_assign_category_list.length > 0) ? "added" : ""}`} onClick={handleShow} >Categories <span><CategoriesPopup onApply={handleCategory} dataSelected={receivedData ? receivedData.categoryData : ""} isAdded={receivedData && receivedData.categoryData && (receivedData.categoryData.excluded_assign_category_list.length > 0 || receivedData.categoryData.included_assign_category_list.length > 0) ? true : false} /></span></Button>
                        <Button className={`position-relative ${receivedData && receivedData.environmentData && receivedData.environmentData.length>0 ? "added" : ""}`} onClick={handleShow} >Environment <EnvironmentPopup onApply={handleEnvironment} dataSelected={receivedData ? receivedData.environmentData : ""} isAdded={receivedData && receivedData.environmentData && receivedData.environmentData.length>0 ? true : false} /></Button>
                        <Button className={`position-relative ${receivedData && receivedData.viewability && receivedData.viewability !== "Select Viewability" ? "added" : ""}`} onClick={handleShow} >Viewability <ViewabilityPopup onApply={handleViewability} dataSelected={receivedData ? receivedData.viewability : ""} isAdded={receivedData && receivedData.viewability && receivedData.viewability !== "Select Viewability" ? true : false} /></Button>
                        <Button className={`position-relative ${receivedData && receivedData.deviceData && (receivedData.deviceData.device_types != '' || receivedData.deviceData.make_model != '' || receivedData.deviceData.operating_system != '') ? "added" : ""}`} onClick={handleShow} >Device <DevicePopup onSave={handleSaveDeviceData} dataSelected={receivedData ? receivedData.deviceData : ""} isAdded={receivedData && receivedData.deviceData && (receivedData.deviceData.device_types != '' || receivedData.deviceData.make_model != '' || receivedData.deviceData.operating_system != '') ? true : false} /></Button>
                        <Button className={`position-relative ${receivedData && receivedData.keyword ? "added" : ""}`} onClick={handleShow} >Keyword/Contextual <KeywordPopup onApply={handleKeyword} dataSelected={receivedData ? receivedData.keyword : ""} isAdded={receivedData && receivedData.keyword ? true : false} /></Button>
                        <Button className={`position-relative ${receivedData && receivedData.position && (receivedData.position.positions != '' || receivedData.position.positions_display != '' || receivedData.position.positions_native != '') ? "added" : ""}`} onClick={handleShow} >Position <span><PositionPopup onApply={handlePosition} dataSelected={receivedData ? receivedData.position : ""} isAdded={receivedData && receivedData.position && (receivedData.position.positions != '' || receivedData.position.positions_display != '' || receivedData.position.positions_native != '') ? true : false} /></span></Button>
                        <Button className={`position-relative ${receivedData && receivedData.dayData && (receivedData.dayData.day_time != '' || receivedData.dayData.preset_schedule != '' || receivedData.dayData.time_zone != '') ? "added" : ""}`} onClick={handleShow} >Day & Time <DayTimePopup onSave={handleSaveDayData} dataSelected={receivedData ? receivedData.dayData : ""} isAdded={receivedData && receivedData.dayData && (receivedData.dayData.day_time != '' || receivedData.dayData.preset_schedule != '' || receivedData.dayData.time_zone != '') ? true : false} /></Button>

                        <Button className={`position-relative ${receivedData && receivedData.connnectionData &&  receivedData.connnectionData.netspeeds !== "Select Connection Speed" && (receivedData.connnectionData.netspeeds != '' || receivedData.connnectionData.targetBy != '') ? "added" : ""}`} onClick={handleShow} >Connection Speed <span><ConnectionSpeedPopup onSave={handleSave} dataSelected={receivedData ? receivedData.connnectionData : ""} isAdded={receivedData && receivedData.connnectionData && (receivedData.connnectionData.netspeeds != '' || receivedData.connnectionData.targetBy != '') ? true : false} /></span></Button>

                        <Button className={`position-relative ${(receivedData && receivedData.selectBrowser && receivedData.selectBrowser.length>0) ? "added" : ""}`} onClick={handleShow} >Browser<BrowserPopup onApply={handleBrowser} dataSelected={receivedData ? receivedData.selectBrowser : ""} isAdded={(receivedData  && receivedData.connnectionData.netspeeds !== "Select Connection Speed" && receivedData.selectBrowser && receivedData.selectBrowser.length>0) ? true : false} /></Button>
                        <Button className={`position-relative added`} onClick={handleShow} >Geography <span className="btn-add">Added</span></Button>
                        <Button className={`position-relative added`} onClick={handleShow} >Brand safety <span className="btn-add">Added</span></Button>
                        <Button className={`position-relative added`} onClick={handleShow} >Demographics <span className="btn-add">Added</span></Button>
                        <Button className={`position-relative ${(receivedData && receivedData.carrierService && receivedData.carrierService.length>0) ? "added" : ""}`} onClick={handleShow} >Carrier Targeting <CarrierISPPopup onApply={handleCarrierService} dataSelected={receivedData ? receivedData.carrierService : ""} isAdded={(receivedData && receivedData.carrierService && receivedData.carrierService.length>0) ? true : false} /></Button>
                    </div>
                </Modal.Body>

                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button className={`${FormCss.create_btn}`} onClick={sendData}>Update</Button>
                    </div>
                </Modal.Footer>
            </Modal>


        </>
    )
}