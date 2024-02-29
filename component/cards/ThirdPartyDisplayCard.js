import React from 'react';
import { ImageTypePhysicalNamees } from '@/component/common';

function ThirdPartyDisplayCard({ data, className }) {
  return (
    <div className={`${className.card_box}`}>
      <div className={`${className.card_main} card`}>
        <div className={`${className.card_media}`}>
          <img src={data.landing_page_url ? data.landing_page_url : "/images/show_talent.png"} alt="Picture of the author" className="w-100" />
        </div>
        <div className="card-body row align-items-center">
          <h4 className="card-title">{data.name}</h4>
          <p className="card-text">{ImageTypePhysicalNamees(data.creative_upload_type)}</p>
        </div>
      </div>
    </div>
  );
}

export default ThirdPartyDisplayCard;
