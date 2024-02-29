import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import FormCss from '../styles/form.module.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import GeographyPopup from '@/component/geographypopup';
import DemographicsPopup from '@/component/demographicspopup';
import BrandSafetyPopup from '@/component/brandsafetypopup';
import PublicInventoryPopup from '@/component/publicinventorypopup';
import LanguagePopup from '@/component/languagepopup';
import { Baseurl } from '@/component/Baseurl';
import { scrollToError } from './common'
import { getNewToken } from '@/pages/api/bulkUpload';

export default function AdvertiserForm({ page }) {
    const [showMore, setShowMore] = useState(false);
    const [campaignName, setcampaignName] = useState('');
    const [status, setstatus] = useState("Pause");
    const [CampaignGoal, setCampaignGoal] = useState('Raise Awareness of my Brand or Product');
    const [kpi, setkpi] = useState('CPM');
    const [Creative, setCreative] = useState('');
    const [plannedSpend, setplannedSpend] = useState('');
    const [startdate, setstartdate] = useState('');
    const [endDate, setendDate] = useState('');
    const [frequencyCap, setfrequencyCap] = useState('no Limit');
    const [exposer, setexposer] = useState("Lifetime of This Campaign");
    const [limit, setLimit] = useState('');
    const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
    const [successMsg, setsuccessMsg] = useState("");
    const [errors, setErrors] = useState({});
    const [receivedDigitalContentLabels, setReceivedDigitalContentLabels] = useState([]);
    const [receivedSensitiveCategories, setReceivedSensitiveCategories] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [geographyData, setGeographyData] = useState("")
    const [demographicData, setDemographicData] = useState("")
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [ageragevalue, setageragevalue] = useState('')
    const [parentalstatus, setparentalstatus] = useState('')
    const [income, setincome] = useState('')
    const [incomerangevalue, setincomerangevalue] = useState('')
    const [disableBtn, setdisableBtn] = useState(false)
    const inventoryData = ["Ad Colony", "Ad Media", "Ad Mob", "Ad Unity", "Adtelligent", "AOL (enx)", "AppLovin", "AppNexus", "Baidu", "Bidswitch", "C Exchange", "CheetahMobileAdx", "EPOM", "Geniee", "Google AdX", "Huawei", "HueAds",
        "Index Exchange", "inneractive", "IronSource", "Media.net", "MGID", "Mobfox", "MoPub", "One by AOL", "Open X", "Opera", "Outbrain", "PubMatic", "PubNative", "ReklamStore", "RTBDemand", "Rubicon", "Samsung", "silvermob", "Smaato", "Smart Ads", "SmartyAds", "SpotXchange", "Taboola", "TripleLift", "UC Browser", "Unity Ads", "Verizon",
        "VertaMedia", "Vungle", "Yahoo Exchange", "Fyber", "Appodeal", "Chartboost", "MobilityWare", "Adjoe"]


    const router = useRouter();
    const { id } = router.query;

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token && id) {
                    const response = await fetch(`${Baseurl}view-campaign?campaign_id=${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            // Other headers as needed
                        },
                    });
                   
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const formatDate = (isoDateString) => {
                        const date = new Date(isoDateString);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');

                        return `${year}-${month}-${day}`;
                    };
                    const data = await response.json();
                    getNewToken(data)
                    const dataVal = data.data[0];
                    setcampaignName(dataVal.name)
                    setstatus(dataVal.campaign_status)
                    setCampaignGoal(dataVal.over_all_goal)
                    setkpi(dataVal.kpi)
                    setCreative(dataVal.creative_types)
                    setplannedSpend(dataVal.planned_spend)
                    setendDate(formatDate(dataVal.planned_end_date))
                    setstartdate(formatDate(dataVal.planned_start_date))
                    setfrequencyCap(dataVal.frequency_cap)
                    setLimit(dataVal.frequency_cap_value)
                    setexposer(dataVal.exposures_per)
                    setDemographicData({
                        gender: JSON.parse(dataVal.gender),
                        parentalStatus: dataVal.parental_status,
                        age: dataVal.age,
                        ageRange: dataVal.age_rage_value,
                        incomeRange: dataVal.income_range_value,
                        income: dataVal.income,
                    })
                    setGeographyData(JSON.parse(dataVal.geography_address))
                    setGender(JSON.parse(dataVal.gender))
                    setAge(dataVal.age)
                    setageragevalue(dataVal.age_rage_value)
                    setparentalstatus(dataVal.parental_status)
                    setincome(dataVal.income)
                    setincomerangevalue(dataVal.income_range_value)
                    setSelectedInventoryItems(JSON.parse(dataVal.public_inventory))
                    setReceivedDigitalContentLabels(JSON.parse(dataVal.brand_digital_content))
                    setReceivedSensitiveCategories(JSON.parse(dataVal.brand_sensitive_category))
                    const languagesArray = JSON.parse(dataVal.languages);
                    const result = { [dataVal.language_type]: languagesArray };
                    setSelectedLanguages(result)
                }
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                // Handle errors if necessary
            }
        };

        fetchData();
    }, [id]); // Re-run effect when query parameters change


    useEffect(() => {
        setSelectedInventoryItems(inventoryData);
    }, []);
    const handleChange = (e) => {
        const value = e.target.value;
        const errorsObj = {};
        setcampaignName(value);
        if (value.trim() === '') {
            errorsObj.campaignName = 'Campaign Name is required';
            setErrors(errorsObj);
        } else {
            setErrors('');
        }
    }
    // Handle Frequency
    const handleFrequencyCap = (e) => {
        e.stopPropagation();
        const { value } = e.target;
        setfrequencyCap(value);

        if (value === 'no Limit') {
            setLimit('');
            setexposer('');
        }
    };

    //   get inventory data from child component
    const handleApply = (selectedInventoryItems) => {
        setSelectedInventoryItems(selectedInventoryItems);
    };
    // get selected Language List from Language Pop up
    const handleLanguaApply = (selectedData) => {
        setSelectedLanguages(selectedData);
    };

    // get data of brand safety
    const handleReceiveData = (digitalLabels, sensitiveCategories) => {
        setReceivedDigitalContentLabels(digitalLabels);
        setReceivedSensitiveCategories(sensitiveCategories);
    };

    // handle geography data
    const handleGeographyData = (location) => {
        setGeographyData(location)
    };

    const handleRemoveLocation = (locationToRemove) => {
        // Filter out the location to remove
        const updatedGeographyData = geographyData.filter(location => location !== locationToRemove);
        setGeographyData(updatedGeographyData);
    };
    const handleDemographicData = (data) => {
        setDemographicData(data);
    };
    const handleCancel = () => {
        router.push(`/advertiser/dashboard`);
    }
    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign learn more.
        </Tooltip>
    );


    function validateFields() {
        let isValid = true;
        const errorsObj = {};
        if (campaignName.trim() === '') {
            errorsObj.campaignName = 'Campaign Name is required';
            isValid = false;
        }

        else if (CampaignGoal.trim() === '') {
            errorsObj.CampaignGoal = 'Campaign Goal is required';
            isValid = false;
        }
        else if (kpi.trim() === '') {
            errorsObj.kpi = 'KPI is required';
            isValid = false;
        }

        else if (Creative.trim() === '') {
            errorsObj.Creative = 'Creative is required';
            isValid = false;
        }

        else if (plannedSpend.trim() === '') {
            errorsObj.plannedSpend = 'Planned Spend is required';
            isValid = false;
        }

        else if (startdate.trim() === '') {
            errorsObj.startdate = 'Start Date is required';
            isValid = false;
        }

        else if (endDate.trim() === '') {
            errorsObj.endDate = 'End Date is required';
            isValid = false;
        }

        else if (frequencyCap.trim() !== 'no Limit') {
            if (exposer.trim() === '') {
                errorsObj.frequencyCap = 'Exposure is required';
                isValid = false;
            }
        }

        else if (frequencyCap.trim() === '') {
            errorsObj.frequencyCap = 'Limit is required';
            isValid = false;
        }
        setErrors(errorsObj);
        if (!isValid) {
            scrollToError();
        }
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValid = await validateFields();
            if (isValid) {
                setErrors("")
                setdisableBtn(true)
                try {
                    const token = localStorage.getItem('token');
                    const payload = {
                        name: campaignName,
                        over_all_goal: CampaignGoal,
                        kpi,
                        creative_types: Creative,
                        planned_spend: plannedSpend,
                        planned_start_date: startdate,
                        planned_end_date: endDate,
                        frequency_cap: frequencyCap,
                        frequency_cap_value: frequencyCap === 'LimitFrequency' ? limit : '',
                        exposures_per: frequencyCap === 'LimitFrequency' ? exposer : '',
                        public_inventory: selectedInventoryItems,
                        gender: demographicData ? demographicData.gender : "",
                        age: demographicData ? demographicData.age : "",
                        age_rage_value: demographicData ? demographicData.ageRange : "",
                        parental_status: demographicData ? demographicData.parentalStatus : "",
                        income: demographicData ? demographicData.income : "",
                        income_range_value: demographicData ? demographicData.incomeRange : "",
                        geography_address: geographyData,
                        languages: Object.values(selectedLanguages)[0],
                        language_type: Object.keys(selectedLanguages)[0],
                        brand_digital_content: receivedDigitalContentLabels,
                        brand_sensitive_category: receivedSensitiveCategories,
                        campaign_status: status === "Pause" ? 'Pause' : "Active",
                    };
                    if (id) {
                        payload.campaign_id = id;
                    }
                    let response;
                    
                    if (id) {
                        response = await fetch(`${Baseurl}update-campaign`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(payload),
                        });
                    } else {
                        response = await fetch(`${Baseurl}create-campaign`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(payload),
                        });
                    }
                    const data = await response.json();
                    getNewToken(data)
                    if (response.ok) {
                        setdisableBtn(true)

                        if (id) {
                            setsuccessMsg("Campaign Updated successfully")
                            setTimeout(() => {
                                setsuccessMsg("")
                            }, 2000)
                            window.location.href = '/advertiser/dashboard';
                        }
                        else {
                            setsuccessMsg("Campaign created successfully")
                            setTimeout(() => {
                                setsuccessMsg("")
                            }, 2000)
                            window.location.href = `/advertiser/create-insertion-order?id=${data?.data?.[0]?.id}`;
                        }
                    } else {
                        setdisableBtn(false)
                        console.error('Failed to create campaign:', data.message || 'Unknown error');
                    }
                } catch (error) {
                    console.error('Error creating campaign:', error);
                }
            } else {
                setdisableBtn(false)
                console.error('Validation failed');
            }
        } catch (error) {
            setdisableBtn(false)
            console.error('Error during validation:', error);
        }

    };


    return (
        <>
            <div className={`${FormCss.top_bar}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_title}`}>
                        <button type="button" onClick={handleCancel}>
                            <Image
                                src="/images/cancel.svg"
                                width={30}
                                height={30}
                                alt="Cancel"
                                style={{ width: "30px", height: "30px" }}
                            />
                        </button>
                        <h4>{page === "editCampaign" ? "Edit Campaign" : "Create New Campaign"}</h4>
                    </div>
                </div>
            </div>

            <div className={`${FormCss.form_page}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_box}`}>
                        <form onSubmit={handleSubmit}>
                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.row}`}>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.form_feilds}`}>
                                            <label htmlFor="campaignName" className='gap-0'>Campaign Name <span className='text-danger fw-bold'>*</span></label>
                                            <input
                                                type="text"
                                                id="campaignName"
                                                name="campaignName"
                                                className={errors.campaignName ? "border-danger" : ""}
                                                value={campaignName}
                                                placeholder="Enter Name"
                                                onChange={handleChange}
                                            />
                                            {errors.campaignName && <div className="text-danger">{errors.campaignName}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.status}`}>
                                            <select
                                                className={status === "Active" || status === "active" ? "bg-sucess" : "bg-light"}
                                                id="status"
                                                name="status"
                                                value={status}
                                                onChange={(e) => setstatus(e.target.value)}
                                            >
                                                <option value="Pause">● Draft</option>
                                                <option value="Active">● Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p>These settings don’t impact serving.</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="overallCampaignGoal" className='gap-0'>Overall Campaign Goal <span className='text-danger fw-bold'>*</span>
                                        <OverlayTrigger placement="right" overlay={tooltip}>
                                            <Image
                                                src="/images/ask-tooltip.svg"
                                                width={16}
                                                height={16}
                                                alt="Cancel"
                                                className='ms-3'
                                                style={{ width: "16px", height: "16px" }}
                                            />
                                        </OverlayTrigger>
                                    </label>
                                    <select id="overallCampaignGoal" name="overallCampaignGoal" className={errors.CampaignGoal ? "border-danger" : ""} onChange={(e) => setCampaignGoal(e.target.value)} value={CampaignGoal}>
                                        <option value="Choose Goal" disabled>Choose Goal</option>
                                        <option value="Raise Awareness of my Brand or Product">Raise Awareness of my Brand or Product</option>
                                        <option value="Drive Online Action or Visits">Drive Online Action or Visits</option>
                                        <option value="Drive Offline or in - Store Sale">Drive Offline or in - Store Sale </option>
                                        <option value="Drive App Installs or Engagements">Drive App Installs or Engagements</option>
                                    </select>

                                    {errors.CampaignGoal && <div className="text-danger">{errors.CampaignGoal}</div>}

                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="KPI" className='gap-0'>KPI <span className='text-danger fw-bold'>*</span>
                                        <OverlayTrigger placement="right" overlay={tooltip}>
                                            <Image
                                                src="/images/ask-tooltip.svg"
                                                width={16}
                                                height={16}
                                                alt="Cancel"
                                                className='ms-3'
                                                style={{ width: "16px", height: "16px" }}
                                            />
                                        </OverlayTrigger>
                                    </label>
                                    <select id="KPI" name="KPI" onChange={(e) => setkpi(e.target.value)} value={kpi} className={errors.kpi ? "border-danger" : ""}>
                                        <option value="Choose KPI" disabled>Choose KPI</option>
                                        <option value="CPM">CPM</option>
                                        <option value="CPC">CPC</option>
                                        <option value="CPV( Cost per Visit)">CPV( Cost per Visit)</option>
                                        <option value="Cost Per View">Cost Per View</option>
                                    </select>
                                    {errors.kpi && <div className="text-danger">{errors.kpi}</div>}

                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="Creative" className="gap-0">Creative type you expect to use <span className='text-danger fw-bold'>*</span></label>
                                    <div className={`${FormCss.checkbox_feild}`} >
                                        <div className={`${FormCss.checkboxs}`}>
                                            <input type="radio" name="flexRadioDefault" id="checkbox_1" value="Display" checked={Creative === 'Display'} disabled={id ? true : false} onChange={(e) => setCreative(e.target.value)} className={errors.Creative ? "border-danger" : ""} />
                                            <label htmlFor="checkbox_1" className="cr">Display</label>
                                        </div>

                                        <div className={`${FormCss.checkboxs}`}>
                                            <input type="radio" name="flexRadioDefault" id="checkbox_2" value="Video" checked={Creative === 'Video'} disabled={id ? true : false} onChange={(e) => setCreative(e.target.value)} />
                                            <label htmlFor="checkbox_2" className="cr">Video</label>
                                        </div>

                                        <div className={`${FormCss.checkboxs}`}>
                                            <input type="radio" name="flexRadioDefault" id="checkbox_3" value="Audio" checked={Creative === 'Audio'} disabled={id ? true : false} onChange={(e) => setCreative(e.target.value)} />
                                            <label htmlFor="checkbox_3" className="cr">Audio</label>
                                        </div>

                                        <div className={`${FormCss.checkboxs}`}>
                                            <input type="radio" name="flexRadioDefault" id="checkbox_4" value="YouTube" checked={Creative === 'YouTube'} disabled={id ? true : false} onChange={(e) => setCreative(e.target.value)} />
                                            <label htmlFor="checkbox_4" className="cr">YouTube</label>
                                        </div>

                                        <div className={`${FormCss.checkboxs}`}>
                                            <input type="radio" name="flexRadioDefault" id="checkbox_5" value="Native" checked={Creative === 'Native'} disabled={id ? true : false} onChange={(e) => setCreative(e.target.value)} />
                                            <label htmlFor="checkbox_5" className="cr">Native</label>
                                        </div>
                                    </div>
                                    {errors.Creative && <div className="text-danger">{errors.Creative}</div>}

                                </div>

                                <div className={`${FormCss.form_feilds}`}>

                                    <label htmlFor="plannedSpend" className='gap-0'>Planned spend <span className='text-danger fw-bold'>*</span> </label>
                                    <div className="position-relative">
                                        <div className="input_group_prepend">
                                            <p>₹</p>
                                        </div>
                                        <input type="number" id="plannedSpend" name="plannedSpend" className={errors.plannedSpend ? "border-danger" : ""} placeholder="645" value={plannedSpend} onChange={(e) => setplannedSpend(e.target.value)} min="1"/>
                                    </div>
                                    {errors.plannedSpend && <div className="text-danger">{errors.plannedSpend}</div>}

                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="plannedDates">Planned Dates
                                        <OverlayTrigger placement="right" overlay={tooltip}>
                                            <Image
                                                src="/images/ask-tooltip.svg"
                                                width={16}
                                                height={16}
                                                alt="Cancel"
                                                className='ms-3'
                                                style={{ width: "16px", height: "16px" }}
                                            />
                                        </OverlayTrigger>
                                    </label>
                                    <div className={`${FormCss.date_feilds}`}>
                                        <div className={`${FormCss.date_box} custom_date`}>
                                            <label htmlFor="startDate" className='gap-0'>Start date <span className='text-danger fw-bold'>*</span></label>
                                            <input type="date" name="startdate" value={startdate} className={errors.startdate ? "border-danger" : ""} id="startdate" min={new Date().toISOString().split('T')[0]} onChange={((e) => setstartdate(e.target.value))} />
                                            {errors.startdate && <div className="text-danger">{errors.startdate}</div>}

                                        </div>
                                        <p>to</p>
                                        <div className={`${FormCss.date_box} custom_date`}>
                                            <label htmlFor="endDate" className='gap-0'>End date  <span className='text-danger fw-bold'>*</span></label>
                                            <input type="date" name="endDate" className={errors.endDate ? "border-danger" : ""} value={endDate} id="endDate" min={startdate || new Date().toISOString().split('T')[0]} onChange={(e) => setendDate(e.target.value)} />
                                            {errors.endDate && <div className="text-danger">{errors.endDate}</div>}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="frequencyCap" className='gap-0'>Frequency Cap <span className='text-danger fw-bold'>*</span></label>

                                    <div className={`${FormCss.radio_feilds}`}>
                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio"
                                                name="NoLimit"
                                                id="NoLimit"
                                                value="no Limit"
                                                className={errors.frequencyCap ? "border-danger" : ""}
                                                onChange={handleFrequencyCap}
                                                checked={frequencyCap === 'no Limit'} />
                                            <label htmlFor="NoLimit">No Limit</label>
                                        </div>
                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio"
                                                name="LimitFrequency"
                                                id="LimitFrequency"
                                                value="LimitFrequency"
                                                onChange={handleFrequencyCap}
                                                checked={frequencyCap === 'LimitFrequency'}
                                                className={errors.frequencyCap ? "border-danger" : ""}
                                            />
                                            <label htmlFor="LimitFrequency">Limit frequency to</label>
                                            {frequencyCap == "no Limit" ? "" : <><input className={`${FormCss.radio_input}`} type="number" name="LimitFrequency" value={limit} id="LimitFrequency" onChange={(e) => setLimit(e.target.value)}  min="1"/>
                                                <label className="form-check-label" >Exposures per</label>
                                                <select id="exposures" name="exposures" value={exposer} onChange={(e) => setexposer(e.target.value)}>
                                                    <option value="Lifetime of This Campaign">Lifetime of This Campaign</option>
                                                    <option value="Months">Months</option>
                                                    <option value="Weeks">Weeks</option>
                                                    <option value="Days">Days</option>
                                                    <option value="Hours">Hours</option>
                                                    <option value="Minutes">Minutes</option>
                                                </select>
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <Image
                                                        src="/images/ask-tooltip.svg"
                                                        width={16}
                                                        height={16}
                                                        alt="Cancel"
                                                        className='ms-3'
                                                        style={{ width: "16px", height: "16px" }}
                                                    />
                                                </OverlayTrigger>
                                            </>
                                            }
                                        </div>
                                    </div>
                                    {errors.frequencyCap && <div className="text-danger">{errors.frequencyCap}</div>}

                                </div>
                                <p className={`${FormCss.additional_line}`}>You can also set specific frequency caps on each insertion order and line item in this campaign.</p>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <h5>Inventory Source</h5>
                                <p>(New insertion orders and line terms in this campaign will inherit these settings.)</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="publicInventory">Public Inventory</label>
                                    <input type="text" id="publicInventory" name="publicInventory" placeholder="Select Exchanges And 0 Subexchanges Are Selected " value={`${selectedInventoryItems !== null ? selectedInventoryItems.length : "0"} Exchanges And 0 Subexchanges Are Selected `} readOnly />
                                    <PublicInventoryPopup id={id} onApply={handleApply} inventoryData={inventoryData} inventorySelectedList={selectedInventoryItems} />
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <h5>Targeting</h5>
                                <p>(New insertion orders and line terms in this campaign will inherit these settings.)</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="Demographics">Demographics</label>
                                    <input type="text" id="demographics" name="demographics" placeholder="All genders, ages, parental statuses and household incomes" readOnly />
                                    <DemographicsPopup onApply={handleDemographicData} id={id} parentStatus={parentalstatus} genderCat={gender} ageSelected={age} selectAgeRange={ageragevalue} incomeSelected={income} selectincomeRange={incomerangevalue} />
                                    {demographicData ?
                                        <>
                                            <div className="data-get d-block">
                                                <p className="d-flex">
                                                    {demographicData && demographicData.gender.length > 0 ?
                                                        <p className='mb-0'><b>Gender: </b>{demographicData.gender.join(', ')} , </p>
                                                        : ""
                                                    }
                                                    {demographicData.age ? <p className='mb-0'><b>Age :</b> {demographicData.age} , </p> : ""}
                                                    {demographicData.ageRange ? <p className='mb-0'><b>Age Range: </b>   {demographicData.ageRange} , </p> : ""}
                                                    {demographicData.income ? <p className='mb-0'><b>Income: </b>    {demographicData.income} , </p> : ""}
                                                    {demographicData.incomeRange ? <p className='mb-0'><b>Income Range:</b>    {demographicData.incomeRange} , </p> : ""}
                                                    {demographicData.parentalStatus ? <p className='mb-0'><b>Parental Status: </b>     {demographicData.parentalStatus}</p> : ""}
                                                </p>
                                            </div>
                                        </>
                                        : ""}
                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="Geography">Geography</label>
                                    <input type="text" id="geography" name="geography" placeholder="All locations " readOnly />
                                    <GeographyPopup onApplyGeographyData={handleGeographyData} geographyData={geographyData} />
                                    <div className="data-get row">
                                        {geographyData ? geographyData.some(location => location.type === 'include') && (
                                            <div className='col-md-12 col-lg-12 col-12 '>
                                                <p className='text-success'>Include:</p>
                                                <p className="d-flex">
                                                    {geographyData && geographyData.map((location) => {
                                                        return (
                                                            <>
                                                                {location.type === 'include' && (
                                                                    <div key={location.name}>
                                                                        <span>{location.name}</span>
                                                                    </div>
                                                                )}
                                                            </>
                                                        )

                                                    })}
                                                </p>
                                            </div>
                                        ) : ""}

                                        {geographyData ? geographyData.some(location => location.type === 'exclude') && (
                                            <div className='col-md-12 col-lg-12 col-12 '>
                                                <p className='text-danger'>Exclude:</p>
                                                <p className="d-flex">
                                                    {geographyData && geographyData.map(location => (
                                                        location.type === 'exclude' && (
                                                            <div key={location.name}>
                                                                <span>{location.name}</span>
                                                            </div>
                                                        )
                                                    ))}
                                                </p>
                                            </div>
                                        ) : ""}
                                    </div>
                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="Language">Language</label>
                                    <input type="text" id="language" name="language" placeholder="All languages " readOnly />
                                    <LanguagePopup onApply={handleLanguaApply} showSelectedLang={selectedLanguages} />
                                    <div className="data-get">
                                        <ul>
                                            {selectedLanguages && Object.entries(selectedLanguages).map(([key, value]) => (
                                                key != 'null' && (
                                                    <li key={key}>
                                                        <p className={`${key === 'include' ? 'text-success' : 'text-danger'} text-capitalize`}>{key} Languages</p>
                                                        <p className="d-flex">
                                                            {value && value.map((item, index) => {
                                                                if (index < 5 || showMore) {
                                                                    return <p key={index}>{item + ','}</p>;
                                                                } else {
                                                                    return null;
                                                                }
                                                            })}
                                                            {value.length > 5 && (
                                                                <span
                                                                    className="text-primary fw-bold cursor-pointer"
                                                                    onClick={toggleShowMore}
                                                                >
                                                                    {showMore ? ' Show Less' : ' Show More'}
                                                                </span>
                                                            )}
                                                        </p>
                                                    </li>
                                                )
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="brandSafety">Brand safety</label>
                                    <input type="text" id="brandSafety" name="brandSafety" placeholder="No restriction " readOnly />
                                    <BrandSafetyPopup id={id} onDataSubmit={handleReceiveData} receivedDigitalContentLabels={receivedDigitalContentLabels} receivedSensitiveCategories={receivedSensitiveCategories} />
                                    {receivedDigitalContentLabels && receivedDigitalContentLabels.length > 0 ?
                                        <div className="data-get d-block">
                                            <p><b>Digital Content:</b></p>
                                            <p className="d-flex">
                                                {receivedDigitalContentLabels && receivedDigitalContentLabels.map((item) => {

                                                    return (
                                                        <>

                                                            <p>{item}, </p>
                                                        </>
                                                    )
                                                })}
                                            </p>
                                        </div>
                                        : ""}
                                    {receivedSensitiveCategories && receivedSensitiveCategories.length > 0 ?
                                        <div className="data-get d-block">
                                            <p><b>Sensitive Categories:</b></p>
                                            <p className="d-flex">
                                                {receivedSensitiveCategories && receivedSensitiveCategories.map((item) => {

                                                    return (
                                                        <>
                                                            <p>{item}, </p>
                                                        </>
                                                    )
                                                })}
                                            </p>
                                        </div>
                                        : ""}
                                </div>
                            </div>

                            <div className={`${FormCss.feilds_btns}`}>
                                {disableBtn ?
                                    <div className='bg_page_white'>
                                        <span className="loader"></span>
                                    </div>
                                    : ""}
                                <button type='submit' className={`${FormCss.create_btn} ${disableBtn ? "pe-none opacity-50" : ""}`} disabled={disableBtn}>{id ? "Update" : "Create"}</button>
                                <button type="button" className={`${FormCss.cancel_btn}`} onClick={handleCancel}>Cancel</button>

                            </div>
                            {successMsg ?
                                <p className='text-success' style={{ textAlign: 'center', marginTop: '15px' }}>
                                    {successMsg}
                                </p> : ""
                            }
                        </form>
                    </div>
                </div >

            </div >
        </>
    )
}
