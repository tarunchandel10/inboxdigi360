import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import FormCss from '../../styles/form.module.css';
import { Baseurl } from '@/component/Baseurl';

export default function VideoCreativeForm() {
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
    const [third_party_url, setThirdPartyURL] = useState([]);
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
    const [isDisabled, setIsDisabled] = useState(true)
    const [checkboxes, setCheckboxes] = useState(third_party_url.map(() => false))
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
                creative_type: 'upload',
                creative_upload_type: 'video_file',
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
                    setThirdPartyURL('');
                    setYoutubeURL('');
                    setYoutubeIncludeSkipButton('');
                    setVastTagURL('');
                    setRequiresPingForAttribution('');
                    setDimension('');
                    setTechnologies
                    setExpandingDirection('');
                    setExpandsOnHover('');
                    setVideoSkipOffsetSeconds('');
                    setVideoSkipOffsetPer('');
                    setVideoProgressOffsetSeconds('');
                    setVideoProgressOffsetPer('');
                    setThridPartyTag('');
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

    const cloneDiv = () => {
        const newField = {
            key: 'test',
            value: 'TestAnswer'
        };
        setThirdPartyURL(prevArray => [...prevArray, newField])
        return 0;
    }
    const buttonStyle = {
        color: isDisabled ? '#919294' : 'red',
        border: isDisabled ? '1px solid #D9D9D9' : '1px solid red'
    }

    const checkAllThirdPartyUrls = (e) => {
        const isChecked = e.target.checked;
        const newCheckboxes = new Array(third_party_url.length).fill(isChecked)
        setCheckboxes(newCheckboxes)
        isChecked ? setIsDisabled(false) : setIsDisabled(true)
    }

    const deleteSelectedUrls = () => {
        const updatedUrls = third_party_url.filter((value, key) => !checkboxes[key])
        setThirdPartyURL(updatedUrls)
        setCheckboxes(new Array(updatedUrls.length).fill(false))
        setIsDisabled(true)
    }

    const handleCancel = () => {
        router.push(`/advertiser/creatives`);
    }

    return (
        <>

            <div className={`${FormCss.top_bar}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_title}`}>
                        <button type="button" onClick={handleCancel}><img src="../images/cancel.svg" alt="" /></button>
                        <h4>New Video Creative</h4>
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
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p>Assets</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.row}`}>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="sourceFile">Source file
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </label>
                                            <div className={`${FormCss.dropzone}`}>
                                                <input type="file" id="sourceFile" name="sourceFile" onChange={(e) => setMainAssetFile(e.target.files[0])} accept="video/*" />
                                            </div>
                                        </div>

                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="landingpageURL">Landing page URL</label>
                                            <input type="url" id="landingpageURL" name="landingpageURL" placeholder="Landing page URL" value={landing_page_url} onChange={(e) => setLandingPageURL(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p>Video Options</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.row}`}>
                                    <div className="col-md-12">
                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="skip">Skip button</label>
                                        </div>
                                        <div className={`${FormCss.radio_check}`}>
                                            <input type="checkbox" name="skipButton" id="skipButton" checked={video_skip_button === '1'} onChange={(e) => setVideoSkipButton(e.target.checked ? '1' : '')} />
                                            <label htmlFor="skipButton" className="cr">Include skip button
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </label>
                                        </div>

                                        {video_skip_button === '1' && (
                                            <>
                                                <div className={`${FormCss.form_feilds}`}>
                                                    <label htmlFor="skipOffset">Skip Offset</label>
                                                    <div className={`${FormCss.form_contant}`}>
                                                        <div className={`${FormCss.form_contant_feilds}`}>
                                                            <input type="radio" id="seconds" name="skipOffset" value={video_skip_offset} onChange={(e) => setVideoSkipOffset(e.target.value)} />
                                                            <input type="number" min="1" id="seconds" placeholder="5" value={video_skip_offset_seconds} onChange={(e) => setVideoSkipOffsetSeconds(e.target.value)} />
                                                            <div className={`${FormCss.input_group_prepend}`}>
                                                                <p>Seconds</p>
                                                            </div>
                                                        </div>

                                                        <div className={`${FormCss.form_contant_feilds}`}>
                                                            <input type="radio" id="percent" name="skipOffset" value={video_skip_offset} onChange={(e) => setVideoSkipOffset(e.target.value)} />
                                                            <input type="number" min="1" id="percent" placeholder="50" value={video_skip_offset_per} onChange={(e) => setVideoSkipOffsetPer(e.target.value)} />
                                                            <div className={`${FormCss.input_group_prepend}`}>
                                                                <p>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`${FormCss.form_feilds}`}>
                                                    <label htmlFor="progressOffset">Progress Offset</label>
                                                    <div className={`${FormCss.form_contant}`}>
                                                        <div className={`${FormCss.form_contant_feilds}`}>
                                                            <input type="radio" id="seconds" name="progressOffset" value={video_progress_offset} onChange={(e) => setVideoProgressOffset(e.target.value)} />
                                                            <input type="number" min="1" id="seconds" placeholder="5" value={video_progress_offset_seconds} onChange={(e) => setVideoProgressOffsetSeconds(e.target.value)} />
                                                            <div className={`${FormCss.input_group_prepend}`}>
                                                                <p>Seconds</p>
                                                            </div>
                                                        </div>

                                                        <div className={`${FormCss.form_contant_feilds}`}>
                                                            <input type="radio" id="percent" name="progressOffset" value={video_progress_offset} onChange={(e) => setVideoProgressOffset(e.target.value)} />
                                                            <input type="number" min="1" id="percent" placeholder="50" value={video_progress_offset_per} onChange={(e) => setVideoProgressOffsetPer(e.target.value)} />
                                                            <div className={`${FormCss.input_group_prepend}`}>
                                                                <p>%</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div className={`${FormCss.form_feilds_flex}`}>
                                            <div className={`${FormCss.form_feilds}`}>
                                                <label htmlFor="universalAd">Universal Ad ID (Optional)
                                                    <OverlayTrigger placement="right" overlay={tooltip}>
                                                        <img src="/images/ask-tooltip.svg" alt="" />
                                                    </OverlayTrigger>
                                                </label>
                                                <input type="text" id="universalAd" name="universalAd" placeholder="Universal Ad ID " value={universal_ad_id} onChange={(e) => setUniversalADID(e.target.value)} />
                                            </div>

                                            <div className={`${FormCss.form_feilds}`}>
                                                <label htmlFor="registry">Registry </label>
                                                <select id="registry" name="registry" value={registry} onChange={(e) => setRegistry(e.target.value)}>
                                                    <option selected value="1">Other </option>
                                                    {/* <option value="2">Ad-ID</option>
                                                    <option value="3">Clearcast.co.uk</option>
                                                    <option value="4">ARPP</option>
                                                    <option value="5">Other</option> */}
                                                </select>
                                            </div>
                                        </div>

                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="obaCompliance">OBA compliance</label>
                                        </div>
                                        <div className={`${FormCss.radio_check}`}>
                                            <input type="checkbox" name="customOBC" id="customOBC" checked={video_use_custom_obc === '1'} onChange={(e) => setVideoUseCustomOBC(e.target.checked ? '1' : '')} />
                                            <label htmlFor="customOBC" className="cr">Use custom OBA icon
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </label>
                                        </div>

                                        {video_use_custom_obc === '1' && (
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className={`${FormCss.form_feilds}`}>
                                                        <label htmlFor="resourceURL">Resource URL</label>
                                                        <input type="url" id="resourceURL" name="resourceURL" placeholder="Resource URL" value={video_resource_url} onChange={(e) => setVideoResourcURL(e.target.value)} />
                                                    </div>

                                                    <div className={`${FormCss.form_feilds}`}>
                                                        <label htmlFor="program">Program</label>
                                                        <input type="text" id="program" name="program" placeholder="Program" value={video_program} onChange={(e) => setVideoProgram(e.target.value)} />
                                                    </div>

                                                    <div className={`${FormCss.form_feilds}`}>
                                                        <div className={`${FormCss.date_feilds}`}>
                                                            <div className={`${FormCss.date_box}`}>
                                                                <label htmlFor="width">Width</label>
                                                                <input type="number" min="1" id="width" name="width" placeholder="0" value={video_width} onChange={(e) => setVideoWidth(e.target.value)} />
                                                            </div>
                                                            <p>Px</p>
                                                            <div className={`${FormCss.date_box}`}>
                                                                <label htmlFor="height">Height</label>
                                                                <input type="number" min="1" id="height" name="height" placeholder="0" value={video_hight} onChange={(e) => setVideoHeight(e.target.value)} />
                                                            </div>
                                                            <p>Px</p>
                                                            <div className={`${FormCss.date_box}`}>
                                                                <label htmlFor="position">Position</label>
                                                                <select id="position" name="position" value={video_position} onChange={(e) => setVideoPosition(e.target.value)}>
                                                                    <option selected disabled>Position</option>
                                                                    <option value="1">Upper Right</option>
                                                                    <option value="2">Upper Left</option>
                                                                    <option value="3">Lower Right</option>
                                                                    <option value="4">Lower Left</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={`${FormCss.form_feilds}`}>
                                                        <label htmlFor="landingpageURL">Landing page URL</label>
                                                        <input type="url" id="landingpageURL" name="landingpageURL" placeholder="Landing page URL" value={landing_page_url} onChange={(e) => setLandingPageURL(e.target.value)} />
                                                    </div>

                                                    <div className={`${FormCss.form_feilds}`}>
                                                        <label htmlFor="clicktrackingURL">Click tracking URL</label>
                                                        <input type="url" id="clicktrackingURL" name="clicktrackingURL" placeholder="Click tracking URL" value={click_tracking_url} onChange={(e) => setClickTrackingURL(e.target.value)} />
                                                    </div>

                                                    <div className={`${FormCss.form_feilds}`}>
                                                        <label htmlFor="viewtrackingURL">View tracking URL</label>
                                                        <input type="url" id="viewtrackingURL" name="viewtrackingURL" placeholder="View tracking URL" value={view_tracking_url} onChange={(e) => setViewTrackingURL(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p>Serving properties</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <label htmlFor="thirdpartyURL">Third-party URLs
                                    <OverlayTrigger placement="right" overlay={tooltip}>
                                        <img src="/images/ask-tooltip.svg" alt="" />
                                    </OverlayTrigger>
                                </label>

                                <div className={`${FormCss.thirdparty_btn}`}>
                                    <button type="button" className={`${FormCss.add_btn}`} onClick={cloneDiv}>Add URL</button>
                                    <button type="button" style={buttonStyle} className={`${FormCss.delete_btn}`} disabled={isDisabled} onClick={deleteSelectedUrls}>Delete</button>
                                </div>

                                <div className={`${FormCss.thirdparty_box}`}>
                                    <div className={`${FormCss.thirdparty_feild}`}>
                                        <input type="checkbox" name="thirdpartyURL" id="selectAll" onClick={checkAllThirdPartyUrls} />
                                        <label htmlFor="selectAll" className="cr"></label>
                                        <label>Name</label>
                                        <p>Url</p>
                                    </div>
                                    {third_party_url.map((value, key) => (
                                        <div key={key} className={`${FormCss.thirdparty_innnerfeild}`}>
                                            <input type="checkbox" name="thirdpartyURL[]" id={key} checked={checkboxes[key]} onChange={(e) => {
                                                const newCheckboxes = [...checkboxes]
                                                newCheckboxes[key] = e.target.checked
                                                setCheckboxes(newCheckboxes)
                                                setIsDisabled(newCheckboxes.some((isChecked) => isChecked) === false ? true : false);
                                            }} />
                                            <label htmlFor={key} className="cr"></label>
                                            <div className={`${FormCss.third_boxfeild}`}>
                                                <select id="thirdpartyImpression" name="thirdpartyImpression" >
                                                    <option selected value="1">Impression </option>
                                                    <option value="2">Click Tracking</option>
                                                    <option value="3">Start</option>
                                                    <option value="4">First Quartile</option>
                                                    <option value="5">Midpoint</option>
                                                    <option value="6">Third Quartile</option>
                                                    <option value="7">Complete </option>
                                                    <option value="8">Mute</option>
                                                    <option value="9">Pause</option>
                                                    <option value="10">Rewind</option>
                                                    <option value="11">Fullscreen</option>
                                                    <option value="12">Stop</option>
                                                    <option value="13">Custom</option>
                                                    <option value="14">Skip</option>
                                                    <option value="15">Progress</option>
                                                </select>
                                            </div>
                                            <div className={`${FormCss.third_boxfeild}`}>
                                                <input type="url" name="thirdpartyURL" id="newURL" placeholder="https://" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p>Additional Details</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.row}`}>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="integrationCode">Integration Code (optional)</label>
                                            <input type="text" id="integrationCode" name="integrationCode" placeholder="Integration Code" value={integration_code} onChange={(e) => setIntegrationCode(e.target.value)} />
                                        </div>

                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="optional">Notes (Optional)</label>
                                            <textarea type="text" id="optional" name="optional" placeholder="Enter a note about this changed " value={notes} onChange={(e) => setNotes(e.target.value)} />
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
