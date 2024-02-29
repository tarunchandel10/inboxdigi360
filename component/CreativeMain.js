import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import CreativeStyle from '../styles/creative.module.css'
import CreativeCard from "./CreativeCard";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ImageType, {
  HTML_OR_IMAGE,
  AUDIO,
  VIDEO,
  THIRD_PARTY_AUDIO,
  THIRD_PARTY_DISPLAY,
  THIRD_PARTY_VIDEO,
  NATIVE_SITE,
  NATIVE_VIDEO
} from '../component/cards/ImageType';
import PaginationComp from "./PaginationComp";

function CreativeMain({ data, page, onSelectItems, onPageChange, pageCount }) {
  const [showUploadDropdown, setShowUploadDropdown] = useState(false);
  const [showBulkAddDropdown, setShowBulkAddDropdown] = useState(false);
  const [showThirdPartyDropdown, setShowThirdPartyDropdown] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false); // State for overlay visibility

  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter(selectedItem => selectedItem.id !== item.id));
    }
  };

  const handleSelectButtonClick = () => {
    onSelectItems(selectedItems); // Pass selectedItems to the parent component
  };

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };




  return (
    <>
      <section className="main">
        {page != "formData" ? <div className="container-fluid  ">
          <div className="row ">
            <div className="col-12">
              <h3>Creatives</h3>
            </div>
          </div>
        </div> : ""}
        <div className="container-fluid p-0 dashboard-container">
          <div className="row table-data">
            {page != "formData" ?
              <div className="col-12">
                <div className="table_top">
                  <div className="dropdown-basic-creative">
                    <DropdownButton autoClose="outside" id="dropdown-basic-button" className="dropdown-basic-creative" title="New " onClick={() => setShowOverlay(true)}>
                      <Dropdown.Item>
                        <Dropdown onMouseOver={() => setShowUploadDropdown(true)} onMouseLeave={() => setShowUploadDropdown(false)} drop="end">
                          <Dropdown.Toggle> Upload</Dropdown.Toggle>
                          <Dropdown.Menu show={showUploadDropdown}>
                            <Dropdown.Item><Link href="/creativeforms/htmlimagecreativeform">HTML 5 or image</Link></Dropdown.Item>
                            <Dropdown.Item><Link href="/creativeforms/videocreativeform">Video File</Link></Dropdown.Item>
                            <Dropdown.Item><Link href="/creativeforms/youtubevideocreativeform">YouTube video</Link></Dropdown.Item>
                            <Dropdown.Item><Link href="/creativeforms/audiocreativeform">Audio file</Link></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Dropdown.Item>

                      {/* <Dropdown.Item>
                        <Dropdown onMouseLeave={() => setShowBulkAddDropdown(false)} onMouseOver={() => setShowBulkAddDropdown(true)} drop="end">
                          <Dropdown.Toggle> Bulk add creatives</Dropdown.Toggle>
                          <Dropdown.Menu show={showBulkAddDropdown}>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${AUDIO}`}>Audio</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${HTML_OR_IMAGE}`}>HTML 5 or image</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${NATIVE_SITE}`}>Native site</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${NATIVE_VIDEO}`}>Native video</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${THIRD_PARTY_VIDEO}`}>Third-party Video</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${THIRD_PARTY_AUDIO}`}>Third-party audio</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${THIRD_PARTY_DISPLAY}`}>Third-party display</Link></Dropdown.Item>
                            <Dropdown.Item><Link href={`/creativeforms/BulkUpload?param=${VIDEO}`}>Video</Link></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Dropdown.Item> */}

                      <Dropdown.Item>
                        <Dropdown onMouseLeave={() => setShowThirdPartyDropdown(false)} onMouseOver={() => setShowThirdPartyDropdown(true)} drop="end">
                          <Dropdown.Toggle> Third Party</Dropdown.Toggle>
                          <Dropdown.Menu show={showThirdPartyDropdown}>
                            <Dropdown.Item><Link href="/creativeforms/thirdpartyaudioform"> Third-party audio</Link></Dropdown.Item>
                            <Dropdown.Item><Link href="/creativeforms/thirdpartydisplayform">Third-party display</Link></Dropdown.Item>
                            <Dropdown.Item><Link href="/creativeforms/thirdpartyvideoform">Third-party video</Link></Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>

                  <div className="custom_date">
                    <input id="startDate" type="date" />
                  </div>

                  <span className="filter">Filter
                    <Image
                      src="/images/Filter.svg"
                      width={20}
                      height={20}
                      alt="Picture of the author"
                      style={{ width: "20px", height: "20px" }}
                    />
                  </span>

                  <div className="input-group search_box">
                    <span className="input-group-text">
                      <Image
                        src="/images/search.svg"
                        width={16}
                        height={16}
                        alt="Picture of the author"
                        style={{ width: "16px", height: "16px" }}
                      />
                    </span>
                    <input type="text" className="search-header" placeholder='Search for page or campaign' />
                  </div>

                  <a className="ms-auto clear">Clear All</a>
                </div>
              </div> : ""}
            <div className="col-12">
              <div className={`${CreativeStyle.main_creative} `}>
                <div className={`${CreativeStyle.card_bop} `}>
                  {data ? data.map((item, index) => {
                    return (
                      <CreativeCard key={index} data={item} handleCheckboxChange={handleCheckboxChange} />
                    )
                  }) : ""}
                  {page === "formData" ? <button onClick={handleSelectButtonClick}>Select</button> : ""}

                </div>
                  <PaginationComp pageCount={pageCount} onPageChange={onPageChange}/>
              </div>
            </div>
         
          </div>
        </div>
      </section>


      {showOverlay && (
        <div className="overlay" onClick={toggleOverlay}></div>
      )}
    </>
  );
}
export default CreativeMain;