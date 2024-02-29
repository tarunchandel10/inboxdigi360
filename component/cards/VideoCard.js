import React, { useState } from 'react';
import { ImageTypePhysicalNamees } from '@/component/common';
import TitleUpdatePopup from '../titleUpdatePopup/titleUpdatePopup';
import ViewCardpopup from '../viewCardpopup/viewCardpopup';

function VideoCard({ data, className }) {
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
          <video width="270" height="200" controls="">
            <source src={cardData.vast_tag_url ? cardData.vast_tag_url : '/movie.mp4'} type="video/mp4" />
          </video>
        </div>
        <div className="card-body row align-items-center">
          <h4 className="card-title" onClick={openPopup}>{cardData.name}</h4>
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
      {viewPopupOpen && (
        <ViewCardpopup
          onClose={closePopup}
          data={cardData}
        />
      )
      }
    </div>
  );
}

export default VideoCard;
