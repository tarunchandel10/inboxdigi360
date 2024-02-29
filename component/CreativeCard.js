import CreativeStyle from '../styles/creative.module.css';
import AudioCard from './cards/AudioCard';
import HtmlOrImageCard from './cards/HtmlOrImageCard';
import ThirdPartyAudioCard from './cards/ThirdPartyAudioCard';
import ThirdPartyDisplayCard from './cards/ThirdPartyDisplayCard';
import ThirdPartyVideoCard from './cards/ThirdPartyVideoCard';
import VideoCard from './cards/VideoCard';
import YoutubeCard from './cards/YoutubeCard';
import { HTML_OR_IMAGE, AUDIO, VIDEO, THIRD_PARTY_AUDIO, YOUTUBE, THIRD_PARTY_DISPLAY, THIRD_PARTY_VIDEO } from './cards/ImageType'

/**
 * 
 * @param {data} : Used to identify which card will be rendered 
 * @returns : The Data with different cards on the bases of the condition
 */

function CreativeCard({ data }) {
    return data.creative_upload_type === HTML_OR_IMAGE ? <HtmlOrImageCard data={data} className={CreativeStyle} /> :
        data.creative_upload_type === AUDIO ? <AudioCard data={data} className={CreativeStyle} /> :
        data.creative_upload_type === VIDEO ? <VideoCard data={data} className={CreativeStyle} /> :
        data.creative_upload_type === YOUTUBE ? <YoutubeCard data={data} className={CreativeStyle} /> :
        data.creative_upload_type === THIRD_PARTY_AUDIO ? <ThirdPartyAudioCard data={data} className={CreativeStyle} /> :
        data.creative_upload_type === THIRD_PARTY_DISPLAY ? <ThirdPartyDisplayCard data={data} className={CreativeStyle} /> :
        data.creative_upload_type === THIRD_PARTY_VIDEO ? <ThirdPartyVideoCard data={data} className={CreativeStyle} /> :
        null;
}

export default CreativeCard;