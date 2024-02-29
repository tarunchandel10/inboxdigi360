import { useEffect, useState } from 'react';
import FormCss from '../styles/form.module.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Googlemapscomplete from './googlemapscomplete';


export default function GeographyPopup({ onApplyGeographyData,geographyData  }) {
    const [show, setShow] = useState(false);
    const[includeLocation,setIncludeLocation]=useState("")
    const[excludeLocation,setexcludeLocation]=useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [locationDetail, setLocationDetail] = useState("");
    console.log(geographyData);
    const formatData = (locations, type) => {
     
        return locations.map(location => ({
            name: location.name, // Use the name as the address
            latLng:{
            lng: location.lng.toString(), // Convert longitude to string
            lat: location.lat.toString(),
            }, // Convert latitude to string
            type: type // Set the type (include/exclude)
        }));
    };

    
  const handleIncludeChange = (includeLoc) => {
    setIncludeLocation(includeLoc)
    // Do something with the updated includeLoc data
  };

  const handleExcludeChange = (excludeLoc) => {
    setexcludeLocation(excludeLoc)
    // Do something with the updated excludeLoc data
  };
   
  
      const handleApplyClick = () => {
        const includeData = formatData(includeLocation, "include");
        const excludeData = formatData(excludeLocation, "exclude");
    
        // Combine both include and exclude data arrays
        let combinedData = [...includeData, ...excludeData];
    
console.log(combinedData);
        onApplyGeographyData(combinedData);
    
        // Close the modal
        handleClose();
    };
    return (
        <>


            <Button onClick={handleShow} className={`${FormCss.edit_tag}`} ><img src="/images/edit.svg" alt="" /></Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className={`${FormCss.geography_popup}`}
            >
                <Modal.Header className={`${FormCss.modal_header}`}>
                    <Modal.Title className={`${FormCss.modal_title}`}>Geography</Modal.Title>
                    <button type="button" className={`${FormCss.cross_btn}`} onClick={handleClose}>✕</button>
                </Modal.Header>
                <Modal.Body className={`${FormCss.modal_body}`}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className='h-100'>
                                  <Googlemapscomplete    onIncludeChange={handleIncludeChange}
                  onExcludeChange={handleExcludeChange} selectedLocation={geographyData}/>
                             </div>
                        </div>
                        {/* <div className="col-md-6">
                            <iframe
                                title="Geography Map"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.2528001631!2d-74.14448723354508!3d40.69763123329699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1702019521141!5m2!1sen!2sin"
                                allowFullScreen>
                            </iframe>
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer className={`${FormCss.modal_footer}`}>
                    <div className={`${FormCss.inner_titles}`}>
                        <p><img src="/images/setting.svg" alt="" /> These settings don’t impact serving.</p>
                    </div>
                    <div className={`${FormCss.feilds_btns}`}>
                        <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleApplyClick}>Apply</Button>
                        <Button className={`${FormCss.cancel_btn}`} onClick={handleClose}>Cancel</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}
