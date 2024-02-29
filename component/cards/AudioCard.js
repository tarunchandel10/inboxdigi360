import React, { useState } from 'react';
import { ImageTypePhysicalNamees } from '@/component/common';
import TitleUpdatePopup from '../titleUpdatePopup/titleUpdatePopup';
import ViewCardpopup from '../viewCardpopup/viewCardpopup';

function AudioCard({ data, className }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [viewPopupOpen, setviewPopupOpen] = useState(false);
  const [cardData, setCardData] = useState(data);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const openViewPopup = () => {
    setviewPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
    setviewPopupOpen(false);
  };
  const handleTitleUpdate = (newTitle) => {
    setCardData({ ...cardData, name: newTitle });
  };
  return (
    <div className={`${className.card_box}`}>
      <div className={`${className.card_main} card position-relative`}>
        
        <div className={`${className.card_media}`}>
        <span className='view_btn' onClick={openViewPopup}>view</span>
          <img src={cardData.asset_source_file ? cardData.asset_source_file : '/images/fake-image.png'} alt="" className={`${className.audio_img}`} />
          <audio controls="">
            <source src={cardData.main_asset_file ? cardData.main_asset_file : ''} type="audio/mp3" />
          </audio>
        </div>
        <div className="card-body row align-items-center">
          <h4 className="card-title" onClick={openPopup}>{cardData.name} </h4>
          <p className="card-text">{ImageTypePhysicalNamees(cardData.creative_upload_type)}</p>
        </div>
      </div>
      {isPopupOpen && (
        <TitleUpdatePopup 
          onClose={closePopup} 
          onSave={handleTitleUpdate} 
          data={cardData} 
        />
      )}
      {viewPopupOpen &&(
        <ViewCardpopup 
        onClose={closePopup} 
        data={cardData}
        />
      )
      }
    </div>
  );
}

export default AudioCard;
