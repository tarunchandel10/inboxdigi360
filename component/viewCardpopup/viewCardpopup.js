// TitleUpdatePopup.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormCss from '../../styles/form.module.css'

import { ImageTypePhysicalNamees } from '@/component/common';

function ViewCardpopup({ onClose, data }) {
  return (
    <div>


      <Modal
        show={true}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        className={`${FormCss.view_popup} vew_cret`}
      >
        <Modal.Header className={`${FormCss.modal_header}`}>
          <button type="button" className={`${FormCss.cross_btn}`} onClick={onClose}>✕</button>
        </Modal.Header>

        <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>

          {data.creative_upload_type === "html_or_image"
            ?
            <img src={data.main_asset_file ? data.main_asset_file : "/images/show_talent.png"} alt={data.name} />
            :
            data.creative_upload_type === "audio_file" ?
              <>
                <img src={data.asset_source_file ? data.asset_source_file : '/images/fake-image.png'} alt="" />
                <audio controls className='d-block ms-auto me-auto mt-2'>
                  <source src={data.main_asset_file ? data.main_asset_file : ''} type="audio/mp3" />
                </audio>
              </>
              :
              data.creative_upload_type === "video_file" ?
                <>
                  <video controls width="100%" className='mt-2'>
                    <source src={data.vast_tag_url ? data.vast_tag_url : '/movie.mp4'} type="video/mp4" />
                  </video>
                </>
                : ""
          }
          <h4>{data.name !== '' ? data.name : 'Unknown'}</h4>
          <p>{ImageTypePhysicalNamees(data.creative_upload_type)}</p>
        </Modal.Body>

      </Modal>
    </div>
  );
}

export default ViewCardpopup;
