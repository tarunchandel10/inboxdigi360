import React, { useState } from 'react';
import FormCss from '../../styles/form.module.css';
import { HTML_OR_IMAGE, AUDIO, VIDEO, THIRD_PARTY_AUDIO, THIRD_PARTY_DISPLAY, THIRD_PARTY_VIDEO, NATIVE_SITE, NATIVE_VIDEO } from '../../component/cards/ImageType';
import { useSearchParams } from 'next/navigation'
import { bulkUpload } from '../api/bulkUpload';
import AudioCard from '@/component/bulkUploadCards/AudioCard';
import VideoCard from '@/component/bulkUploadCards/VideoCard';
import NativeVideoCard from '@/component/bulkUploadCards/NativeVideoCard';
import ThirdPartyAudioCard from '@/component/bulkUploadCards/ThirdPartyAudioCard';
import ThirdPartyDisplayCard from '@/component/bulkUploadCards/ThirdPartyDisplayCard';
import ThirdPartyVideoCard from '@/component/bulkUploadCards/ThirdPartyVideoCard';
import NativeSiteCard from '@/component/bulkUploadCards/NativeSiteCard';
import HtmlOrImageCard from '@/component/bulkUploadCards/HtmlOrImageCard';
import { Table } from 'react-bootstrap';
export default function BulkUpload() {
    const searchParams = useSearchParams()
    const params = searchParams.get('param')
    const [payload, setPayload] = useState({
        name: '',
        main_asset_file: '',
        dont_scale: '',
        integration_code: '',
        notes: '',
        creative_type: 'upload',
        creative_upload_type: '',
        append_tracking: '',
        tags: '',
        landing_page_url: '',
        video_skip_button: '',
        video_skip_offset: '',
        video_progress_offset: '',
        universal_ad_id: '',
        registry: '',
        video_use_custom_obc: '',
        video_resource_url: '',
        video_program: '',
        video_width: '',
        video_hight: '',
        video_position: '',
        click_tracking_url: '',
        view_tracking_url: '',
        third_party_url: '',
        youtube_url: '',
        youtuve_include_skip_button: '',
        vast_tag_url: '',
        requires_ping_for_attribution: '',
        dimension: '',
        technologies: '',
        expanding_direction: '',
        expands_on_hover: '',
        third_party_tag: '',
        imageArray: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateFields();
        if (isValid) {
            bulkUpload(payload).then((data) => {
                console.log(data)
            }).catch((err) => {
                console.log(err)
            })
        }
    };

    return (
        <>
            {params === HTML_OR_IMAGE ? <HtmlOrImageCard className={FormCss} Table={Table} /> :
             params === AUDIO ? <AudioCard className={FormCss} Table={Table}/> :
             params === VIDEO ? <VideoCard className={FormCss} Table={Table}/> :
             params === NATIVE_SITE ? <NativeSiteCard className={FormCss} Table={Table}/> :
             params === NATIVE_VIDEO ? <NativeVideoCard className={FormCss} Table={Table}/> :
             params === THIRD_PARTY_AUDIO ? <ThirdPartyAudioCard className={FormCss} Table={Table}/> :
             params === THIRD_PARTY_DISPLAY ? <ThirdPartyDisplayCard className={FormCss} Table={Table}/> :
             params === THIRD_PARTY_VIDEO ? <ThirdPartyVideoCard className={FormCss} Table={Table}/> :
             null}
        </>
    );
    
}