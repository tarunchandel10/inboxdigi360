import React from 'react';
import { ImageTypePhysicalNamees } from '@/component/common';

function YoutubeCard({ data, className }) {
  return (
    <div className={`${className.card_box}`}>
      <div className={`${className.card_main} card`}>
        <div className={`${className.card_media}`}>
          <iframe width="100%" height="200" src={data.youtube_url ? data.youtube_url : 'https://www.youtube.com/embed/yAoLSRbwxL8?si=jN9-Ov_cavrdvpDs'} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div className="card-body row align-items-center">
          <h4 className="card-title">{data.name}</h4>
          <p className="card-text">{ImageTypePhysicalNamees(data.creative_upload_type)}</p>
        </div>
      </div>
    </div>
  );
}

export default YoutubeCard;
