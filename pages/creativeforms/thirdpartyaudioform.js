import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FormCss from '../../styles/form.module.css';
import { Baseurl } from '@/component/Baseurl';

export default function ThirdPartyAudioForm() {
    const [name, setName] = useState('');
    const [main_asset_file, setMainAssetFile] = useState(null);
    const [dont_scale, setDontScale] = useState(false);
    const [integration_code, setIntegrationCode] = useState('');
    const [notes, setNotes] = useState('');
    const [creative_type, setCreativeType] = useState('');
    const [creative_upload_type, setCreativeUploadType] = useState('');
    const [append_tracking, setAppendTracking] = useState('');
    const [tags, setTags] = useState('');
    const [landing_page_url, setLandingPageURL] = useState('');
    const [video_skip_button, setVideoSkipButton] = useState('');
    const [video_skip_offset, setVideoSkipOffset] = useState('');
    const [video_progress_offset, setVideoProgressOffset] = useState('');
    const [universal_ad_id, setUniversalADID] = useState('');
    const [registry, setRegistry] = useState('');
    const [video_use_custom_obc, setVideoUseCustomOBC] = useState('');
    const [video_resource_url, setVideoResourcURL] = useState('');
    const [video_program, setVideoProgram] = useState('');
    const [video_width, setVideoWidth] = useState('');
    const [video_hight, setVideoHeight] = useState('');
    const [video_position, setVideoPosition] = useState('');
    const [click_tracking_url, setClickTrackingURL] = useState('');
    const [view_tracking_url, setViewTrackingURL] = useState('');
    const [third_party_url, setThridPartyURL] = useState('');
    const [youtube_url, setYoutubeURL] = useState('');
    const [youtuve_include_skip_button, setYoutubeIncludeSkipButton] = useState('');
    const [vast_tag_url, setVastTagURL] = useState('');
    const [requires_ping_for_attribution, setRequiresPingForAttribution] = useState('');
    const [dimension, setDimension] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [expanding_direction, setExpandingDirection] = useState('');
    const [expands_on_hover, setExpandsOnHover] = useState('');
    const [video_skip_offset_seconds, setVideoSkipOffsetSeconds] = useState('');
    const [video_skip_offset_per, setVideoSkipOffsetPer] = useState('');
    const [video_progress_offset_seconds, setVideoProgressOffsetSeconds] = useState('');
    const [video_progress_offset_per, setVideoProgressOffsetPer] = useState('');
    const [third_party_tag, setThridPartyTag] = useState('');
    const [errors, setErrors] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const router = useRouter();
    const { id } = router.query;

    const validateFields = () => {
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await validateFields();
        if (isValid) {
            setErrors('');

            const payload = {
                name,
                main_asset_file,
                dont_scale,
                integration_code,
                notes,
                creative_type: 'third_party',
                creative_upload_type: 'third_party_audio',
                append_tracking,
                tags,
                landing_page_url,
                video_skip_button,
                video_skip_offset,
                video_progress_offset,
                universal_ad_id,
                registry,
                video_use_custom_obc,
                video_resource_url,
                video_program,
                video_width,
                video_hight,
                video_position,
                click_tracking_url,
                view_tracking_url,
                third_party_url,
                youtube_url,
                youtuve_include_skip_button,
                vast_tag_url,
                requires_ping_for_attribution,
                dimension,
                technologies,
                expanding_direction,
                expands_on_hover,
                third_party_tag,
                video_skip_offset_seconds,
                video_skip_offset_per,
                video_progress_offset_seconds,
                video_progress_offset_per
            };
            const token = localStorage.getItem('token');

            try {
                const formData = new FormData();
                Object.keys(payload).forEach((key) => {
                    formData.append(key, payload[key]);
                });

                const response = await fetch(`${Baseurl}create-creative`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                    body: formData,
                });
                const responseData = await response.json();
                if (response.ok) {
                    setSuccessMsg('Creative created successfully.');
                    setName('');
                    setMainAssetFile('');
                    setDontScale('');
                    setIntegrationCode('');
                    setNotes('');
                    setCreativeType('');
                    setCreativeUploadType('');
                    setAppendTracking('');
                    setTags('');
                    setLandingPageURL('');
                    setVideoSkipButton('');
                    setVideoSkipOffset('');
                    setVideoProgressOffset('');
                    setUniversalADID('');
                    setRegistry('');
                    setVideoUseCustomOBC('');
                    setVideoResourcURL('');
                    setVideoProgram('');
                    setVideoWidth('');
                    setVideoHeight('');
                    setVideoPosition('');
                    setClickTrackingURL('');
                    setViewTrackingURL('');
                    setThridPartyURL('');
                    setYoutubeURL('');
                    setYoutubeIncludeSkipButton('');
                    setVastTagURL('');
                    setRequiresPingForAttribution('');
                    setDimension('');
                    setTechnologies
                    setExpandingDirection('');
                    setExpandsOnHover('');
                    setThridPartyTag('');
                    setVideoSkipOffsetSeconds('');
                    setVideoSkipOffsetPer('');
                    setVideoProgressOffsetSeconds('');
                    setVideoProgressOffsetPer('');
                    setTimeout(() => {
                        setSuccessMsg("")
                    }, 2000)
                    window.location.href = `/advertiser/creatives`;

                } else {
                    setErrors('Failed to create creative. Please try again.');
                }
            } catch (error) {
                console.error(error);
                setErrors('Failed to create creative. Please try again.');
            }
        }
    };

    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign. Learn more.
        </Tooltip>
    );

    const handleCancel = () => {
        router.push(`/advertiser/creatives`);
    }


    return (
        <>

            <div className={`${FormCss.top_bar}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_title}`}>
                        <button type="button" onClick={handleCancel}><img src="../images/cancel.svg" alt="" /></button>
                        <h4>New Third-Party Audio Creative</h4>
                    </div>
                </div>
            </div>

            <div className={`${FormCss.form_page}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_box}`}>
                        <form className={`${FormCss.cretive_forms}`} onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.row}`}>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="Name">Name</label>
                                            <input type="text" id="Name" name="Name" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="vasttagURL">VAST tag URL</label>
                                            <input type="url" id="vasttagURL" name="vasttagURL" placeholder="VAST tag URL" value={vast_tag_url} onChange={(e) => setVastTagURL(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p>Additional Details</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.row}`}>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.radio_check}`}>
                                            <input type="checkbox" name="pingAttribution" id="pingAttribution" value={requires_ping_for_attribution} onChange={(e) => setRequiresPingForAttribution(e.target.value)} />
                                            <label htmlFor="pingAttribution" className="cr">Requires Ping For Attribution
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </label>
                                        </div>

                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="integrationCode">Integration Code (optional)</label>
                                            <input type="text" id="integrationCode" name="integrationCode" placeholder="Integration Code" value={integration_code} onChange={(e) => setIntegrationCode(e.target.value)} />
                                        </div>

                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="optional">Notes (Optional)</label>
                                            <textarea type="text" id="optional" name="optional" placeholder="Enter a note about this changed" value={notes} onChange={(e) => setNotes(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.feilds_btns}`} onSubmit={handleSubmit}>
                                <button className={`${FormCss.create_btn}`}>Save</button>
                                <button className={`${FormCss.cancel_btn}`}>Cancel</button>
                            </div>
                            {successMsg ? <p>{successMsg}</p> : ""}
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
