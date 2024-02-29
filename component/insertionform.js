import { useState, useEffect } from 'react';
import validate from 'validate.js'; // Import validate.js
import { useRouter } from 'next/router';
import FormCss from '../styles/form.module.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import GeographyPopup from '@/component/geographypopup';
import DemographicsPopup from '@/component/demographicspopup';
import BrandSafetyPopup from '@/component/brandsafetypopup';
import PublicInventoryPopup from '@/component/publicinventorypopup';
import LanguagePopup from '@/component/languagepopup';
import TargetingPopup from '@/component/targetingpopup';
import { Plus, Trash } from 'react-bootstrap-icons';
import { Baseurl } from '@/component/Baseurl';
import AppsURLPopup from './appsurlpopup';
import CarrierISPPopup from './carrierISPpopup';
import BrowserPopup from './browserpopup';
import DayTimePopup from './daytimepopup';
import PositionPopup from './positionpopup';
import KeywordPopup from './keywordspopup';
import DevicePopup from './devicepopup';
import ViewabilityPopup from './viewabilitypopup';
import EnvironmentPopup from './environmentpopup';
import CategoriesPopup from './categoriespopup';
import { scrollToError } from './common'
import ConnectionSpeedField from './targetingFields/connectionSpeed/connectionSpeed';
import KeywordField from './targetingFields/keyword/keyword';
import { getNewToken } from '@/pages/api/bulkUpload';

export default function InsertionForm({ page }) {
    const [showMore, setShowMore] = useState(false);
    const [campaignName, setcampaignName] = useState('');
    const [insertionName, setInsertionName] = useState("");
    const [insertionStatus, setinsertionStatus] = useState("Pause");
    const [budgetSelect, setBudgetSelect] = useState("impression")
    const [pacingAhead, setpacingAhead] = useState("Asap")
    const [dailyCost, setDailyCost] = useState("")
    const [selectGoal, setSelectGoal] = useState("Cost per thousand impression (CPM)")
    const [goalAmt, setGoalAmt] = useState("")
    const [optimiseType, setOptimiseType] = useState("")
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [geographyData, setGeographyData] = useState(null)
    const [frequencyCap, setfrequencyCap] = useState('no Limit');
    const [exposer, setexposer] = useState("Lifetime of This Campaign");
    const [limit, setLimit] = useState('');
    const [note, setNote] = useState('');
    const [receivedDigitalContentLabels, setReceivedDigitalContentLabels] = useState([]);
    const [receivedSensitiveCategories, setReceivedSensitiveCategories] = useState([]);
    const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
    const [billableOutcome, setBillableOutcome] = useState("Impression");
    const [demographicData, setDemographicData] = useState("")
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [ageragevalue, setageragevalue] = useState('')
    const [parentalstatus, setparentalstatus] = useState('')
    const [income, setincome] = useState('')
    const [incomerangevalue, setincomerangevalue] = useState('')
    const [optimiseViewable, setoptimiseViewable] = useState('')
    const [isAutomaticallyOptimise, setAutomaticallyOptimise] = useState(false)
    const [pacingType, setPacingType] = useState('Flight');
    const [additionalOptionType, setAdditionalOptionType] = useState([]);
    const [additionalOptionPrice, setadditionalOptionPrice] = useState("");
    const [receivedData, setReceivedData] = useState("");
    const [campId, setcampId] = useState("");
    const [successMsg, setsuccessMsg] = useState("");
    const [errors, setErrors] = useState({});
    const [disableBtn, setdisableBtn] = useState(false)
    const [carrierService, setcarrierService] = useState("")
    const [appUrls, setappsUrl] = useState([])
    const [selectBrowser, setSelectBrowser] = useState("")
    const [categoryData, setcategoryData] = useState("")
    const [dayData, setDayData] = useState('')

    const [connnectionData, setConnectionData] = useState("")
    const [viewability, setviewability] = useState("")
    const [environmentData, setenvironmentData] = useState("")
    const [keyword, setKeyword] = useState("")
    const [deviceData, setDeviceData] = useState("")
    const [position, setPosition] = useState("")

    const router = useRouter();
    const { id } = router.query;
    const { insertion_id } = router.query;

    const handleCancel = () => {
        router.push(`/advertiser/dashboard`);
    }

    const [budgetSegments, setBudgetSegments] = useState([
        // Initialize with an empty segment
        {
            amount: '',
            description: '',
            spend: '',
            remaining: '',
            start_date: '',
            end_date: '',
        },
    ]);

    useEffect(() => {
        const fetchCampData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token && (id || campId)) {
                    const campResp = await fetch(`${Baseurl}view-campaign?campaign_id=${id ? id :campId?campId:""}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!campResp.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await campResp.json();
                    const dataVal = data.data[0];
                    setcampaignName(dataVal.name)

                }
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                // Handle errors if necessary
            }
        };

        fetchCampData();
    }, [id,campId]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token && insertion_id) {
                    const response = await fetch(`${Baseurl}view-insertion-order?insertion_order_id=${insertion_id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }

                    const data = await response.json();
                    getNewToken(data)
                    const dataVal = data.data[0];
                    const transformedData = dataVal.budget_segments && JSON.parse(dataVal.budget_segments).map(item => ({
                        amount: item.amount || '',
                        description: item.description || '',
                        spend: item.spend || '',
                        remaining: item.remaining || '',
                        start_date: item.start_date || '',
                        end_date: item.end_date || '', // Add the end_date field as an empty string
                    }));
                    let appUrls = JSON.parse(dataVal.app_urls)
                    let browserList = JSON.parse(dataVal.browser_list)
                    let carrier = JSON.parse(dataVal.carrier_isp_list)
                    let day_time = JSON.parse(dataVal.day_time)
                    let device_types = JSON.parse(dataVal.device_types)
                    let make_model = JSON.parse(dataVal.make_model)
                    let operating_system = JSON.parse(dataVal.operating_system)
                    let environment = JSON.parse(dataVal.environment)
                    let positions = JSON.parse(dataVal.positions)
                    let positions_display = JSON.parse(dataVal.positions_display)
                    let positions_native = JSON.parse(dataVal.positions_native)
                    let geography_address = JSON.parse(dataVal.geography_address)
                    let gender = JSON.parse(dataVal.gender)
                    let public_inventory = JSON.parse(dataVal.public_inventory)
                    let brand_digital_content = JSON.parse(dataVal.brand_digital_content)
                    let brand_sensitive_category = JSON.parse(dataVal.brand_sensitive_category)
                    let keywords = JSON.parse(dataVal.keywords)

                    setBudgetSegments(transformedData)
                    setInsertionName(dataVal.name)
                    setinsertionStatus(dataVal.insertion_status)
                    setBudgetSelect(dataVal.budget_type)
                    setPacingType(dataVal.pacing_flight)
                    setpacingAhead(dataVal.pacing_ahead)
                    setDailyCost(dataVal.pacing_price_value)
                    setSelectGoal(dataVal.goal_cost)
                    setGoalAmt(dataVal.goal_amount)
                    setBillableOutcome(dataVal.billable_outcome)
                    setOptimiseType(dataVal.optimization_type)
                    setoptimiseViewable(dataVal.optimization_maximize_viewable)
                    setAutomaticallyOptimise(dataVal.is_automatically_optimize)
                    setAdditionalOptionType(dataVal.additional_option_types)
                    setadditionalOptionPrice(dataVal.additional_option_price)
                    setfrequencyCap(dataVal.frequency_cap)
                    setLimit(dataVal.frequency_cap_value)
                    setexposer(dataVal.exposures_per)
                    setappsUrl(appUrls);
                    setSelectBrowser(browserList)
                    setcarrierService(carrier)
                    setConnectionData({
                        targetBy: dataVal.connection_speed_target_by,
                        netspeeds: dataVal.connection_speed
                    })
                    setDayData({
                        day_time: day_time,
                        preset_schedule: dataVal.preset_schedule,
                        time_zone: dataVal.time_zone
                    })
                    setDeviceData({
                        device_types: device_types,
                        make_model: make_model,
                        operating_system: operating_system,
                    })
                    setenvironmentData(environment)
                    setKeyword(keywords)
                    setPosition({
                        positions: positions,
                        positions_display: positions_display,
                        positions_native: positions_native
                    })
                    setviewability(dataVal.viewability)
                    setcategoryData({
                        included_assign_category_list: dataVal.included_assign_category_list,
                        excluded_assign_category_list: dataVal.excluded_assign_category_list,
                    })
                    setDemographicData({
                        gender: JSON.parse(dataVal.gender),
                        parentalStatus: dataVal.parental_status,
                        age: dataVal.age,
                        ageRange: dataVal.age_rage_value,
                        incomeRange: dataVal.income_range_value,
                        income: dataVal.income,
                    })
                    setGeographyData(geography_address)
                    setGender(gender)
                    setAge(dataVal.age)
                    setageragevalue(dataVal.age_rage_value)
                    setparentalstatus(dataVal.parental_status)
                    setincome(dataVal.income)
                    setincomerangevalue(dataVal.income_range_value)
                    setSelectedInventoryItems(public_inventory)
                    setReceivedDigitalContentLabels(brand_digital_content)
                    setReceivedSensitiveCategories(brand_sensitive_category)
                    const languagesArray = JSON.parse(dataVal.languages);
                    const result = { [dataVal.language_type]: languagesArray };
                    setSelectedLanguages(result)
                    setNote(dataVal.additional_optional)
                    setcampId(dataVal.campaign_id)

                    setReceivedData({
                        appUrls: appUrls,
                        browserList: browserList,
                        carrierService: carrier,

                        connnectionData: (dataVal.connection_speed_target_by != '' || dataVal.connection_speed != '') ? {
                            targetBy: dataVal.connection_speed_target_by,
                            netspeeds: dataVal.connection_speed
                        } : '',
                        dayData: (day_time != '' || dataVal.preset_schedule != '' || dataVal.time_zone != '') ? {
                            day_time: day_time,
                            preset_schedule: dataVal.preset_schedule,
                            time_zone: dataVal.time_zone
                        } : '',
                        deviceData: (device_types != '' || make_model != '' || operating_system != '') ? {
                            device_types: device_types,
                            make_model: make_model,
                            operating_system: operating_system,
                        } : '',
                        environmentData: environment,
                        keyword: keywords,
                        position: (positions != '' || positions_display != '' || positions_native != '') ? {
                            positions: positions,
                            positions_display: positions_display,
                            positions_native: positions_native
                        } : '',
                        selectBrowser: dataVal.browser_list != "\"\"" ? dataVal.browser_list : '',
                        viewability: dataVal.viewability,
                        categoryData: {
                            included_assign_category_list: dataVal.included_assign_category_list,
                            excluded_assign_category_list: dataVal.excluded_assign_category_list,
                        }
                    });
                }
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                // Handle errors if necessary
            }
        };

        fetchData();
    }, [insertion_id]);






    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    // Handle Frequency
    const handleFrequencyCap = (e) => {
        e.preventDefault();
        const { value } = e.target;
        setfrequencyCap(value);

        if (value === 'no Limit') {
            setLimit('');
            setexposer('');
        }
    };

    const handleDemographicData = (data) => {
        setDemographicData(data);
    };
    const handleAppsURL = (selectedValues) => {
        setappsUrl(selectedValues)
    };

    const handleCategory = (data) => {
        // Handle the received data as needed
        setcategoryData(data);
    };

    const handleKeyword = (selectedValues) => {
        setKeyword(selectedValues)

    };
    const handlePosition = (selectedValues) => {
        setPosition(selectedValues)

    };
    const handleBrowser = (selectedData) => {
        setSelectBrowser(selectedData);
    };
    const handleSaveDayData = (data) => {
        setDayData(data);
    };
    const handleSave = (selectedValues) => {
        setConnectionData(selectedValues)

    };
    const handleSaveDeviceData = (formData) => {
        setDeviceData(formData);
    };
    const inventoryData = ["Ad Colony", "Ad Media", "Ad Mob", "Ad Unity", "Adtelligent", "AOL (enx)", "AppLovin", "AppNexus", "Baidu", "Bidswitch", "C Exchange", "CheetahMobileAdx", "EPOM", "Geniee", "Google AdX", "Huawei", "HueAds",
        "Index Exchange", "inneractive", "IronSource", "Media.net", "MGID", "Mobfox", "MoPub", "One by AOL", "Open X", "Opera", "Outbrain", "PubMatic", "PubNative", "ReklamStore", "RTBDemand", "Rubicon", "Samsung", "silvermob", "Smaato", "Smart Ads", "SmartyAds", "SpotXchange", "Taboola", "TripleLift", "UC Browser", "Unity Ads", "Verizon",
        "VertaMedia", "Vungle", "Yahoo Exchange", "Fyber", "Appodeal", "Chartboost", "MobilityWare", "Adjoe"]


    const popupAdded = ["Language", "Geography", "Brand Safety", "Demographics"]
    useEffect(() => {
        setSelectedInventoryItems(inventoryData);
    }, []);

    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign learn more.
        </Tooltip>
    );

    const handleOptimisationType = (e) => {
        setAutomaticallyOptimise(false)
        setOptimiseType(e.target.value)
    }

    const handlePacingType = (e) => {
        setpacingAhead("")
        setDailyCost("")
        setPacingType(e.target.value)
    }

    const handleBudgetType = (e) => {
        setBudgetSegments([
            {
                amount: '',
                description: '',
                spend: '',
                remaining: '',
                start_date: '',
                end_date: '',
            },
        ]);
        setBudgetSelect(e.target.value)
    }

    // Function to handle changes in digital content labels checkboxes
    const handleAdditionalOption = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setAdditionalOptionType((prevLabels) => [...prevLabels, value]);
        } else {
            setAdditionalOptionType((prevLabels) =>
                prevLabels.filter((label) => label !== value)
            );
        }
    };

    const handleSegmentChange = (index, field, value) => {
        const updatedSegments = [...budgetSegments];
        updatedSegments[index][field] = value;
        setBudgetSegments(updatedSegments);
    };
    const handleViewability = (selectedValues) => {
        setviewability(selectedValues)

    };
    const handleCarrierService = (selectedData) => {
        setcarrierService(selectedData);
    };
    const handleAddSegment = (e) => {
        e.preventDefault();
        setBudgetSegments([
            ...budgetSegments,
            {
                amount: '',
                description: '',
                spend: '',
                remaining: '',
                start_date: '',
                end_date: '',
            },
        ]);
    };

    const handleDeleteSegment = (index, event) => {
        event.preventDefault();
        const updatedSegments = [...budgetSegments];
        updatedSegments.splice(index, 1);
        setBudgetSegments(updatedSegments);
    };

    //   get inventory data from child component
    const handleApply = (selectedInventoryItems) => {
        setSelectedInventoryItems(selectedInventoryItems);
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
    // get selected Language List from Language Pop up
    const handleLanguaApply = (selectedData) => {
        setSelectedLanguages(selectedData);
    };

    // get data of brand safety
    const handleReceiveData = (digitalLabels, sensitiveCategories) => {
        setReceivedDigitalContentLabels(digitalLabels);
        setReceivedSensitiveCategories(sensitiveCategories);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'insertionName') {
            setInsertionName(value);
            validateField(name, value);
        } else if (name === 'impression') {
            setGoalAmt(value);
            validateField(name, value);
        }
    };
    // Validation Methods started here Aakash
    const validateField = (fieldName, value) => {
        const validationResult = validate.single(value, validationConstraints[fieldName]);
        if (validationResult) {
            setErrors({ ...errors, [fieldName]: 'This field ' + validationResult });  // Removed [0] from validationResult
            return false;
        } else {
            setErrors({ ...errors, [fieldName]: null });
            return true;
        }
    };



    const validationConstraints = {
        insertionName: {
            presence: { allowEmpty: false, message: 'is required' }
        },
        impression: {
            presence: { allowEmpty: false, message: 'is required' },
            numericality: {
                onlyInteger: true,
                greaterThan: 0,
                message: 'must be a positive integer'
            }
        }
        // Add more constraints for other fields as needed
    };

    const validateFormData = () => {
        const validationResult = validate({
            insertionName: insertionName,
            impression: goalAmt
        }, validationConstraints);

        if (validationResult) {
            setErrors(validationResult);
            scrollToError();
            return false;
        } else {
            setErrors(null);
            return true;
        }
    };
    // Validation Methods Ended here

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setErrors("")
            const isValid = validateFormData(); // Validate form data
            if (isValid) {
                setErrors("")
                setdisableBtn(true)
                try {
                    const token = localStorage.getItem('token'); // Retrieve token from storage

                    const payload = {

                        name: insertionName,
                        budget_type: budgetSelect,
                        budget_segments: budgetSegments,
                        pacing_flight: pacingType,
                        pacing_ahead: pacingAhead,
                        pacing_price_value: dailyCost,
                        additional_option_types: additionalOptionType,
                        additional_option_price: additionalOptionPrice,
                        goal_cost: selectGoal,
                        goal_amount: goalAmt,
                        billable_outcome: billableOutcome,
                        optimization_type: optimiseType,
                        optimization_maximize_viewable: optimiseViewable,
                        is_automatically_optimize: isAutomaticallyOptimise,
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
                        extra_targeting: "",
                        additional_optional: note,
                        app_urls: appUrls ?? "",
                        environment: environmentData ?? "",
                        viewability: viewability ?? "",
                        device_types: deviceData.device_types ?? "",
                        operating_system: deviceData.operating_system ?? "",
                        make_model: deviceData.make_model ?? "",
                        keywords: keyword ?? "",
                        positions: position.positions ?? "",
                        positions_display: position.positions_display ?? "",
                        positions_native: position.positions_native ?? "",
                        day_time: dayData.day_time ?? "",
                        preset_schedule: dayData.preset_schedule ?? "",
                        time_zone: dayData.time_zone ?? "",
                        browser_list: selectBrowser ?? "",
                        connection_speed: connnectionData.netspeeds ?? "",
                        connection_speed_target_by: connnectionData.targetBy ?? "",
                        carrier_isp_list: carrierService ?? "",
                        included_assign_category_list: categoryData.included_assign_category_list && categoryData.included_assign_category_list.map(item => item.id),
                        excluded_assign_category_list: categoryData.excluded_assign_category_list && categoryData.excluded_assign_category_list.map(item => item.id),
                        insertion_status: insertionStatus === "Pause" ? 'Pause' : "Active",
                    };
                    if (insertion_id) {
                        payload.insertion_order_id = insertion_id;
                    } else {
                        payload.campaign_id = id;
                    }
                   
                    let response;
                    if (insertion_id) {
                        response = await fetch(`${Baseurl}update-insertion-order`, {
                            method: 'POST',
                            // mode: 'no-cors',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(payload),
                        });
                    } else {
                        response = await fetch(`${Baseurl}create-insertion-order`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(payload),

                        });
                    }
                    if (response.ok) {
                        const data = await response.json();
                        getNewToken(data)
                        setdisableBtn(true)
                        if (insertion_id) {

                            setsuccessMsg("Insertion Updated successfully")
                            setTimeout(() => {
                                setsuccessMsg("")
                            }, 2000)
                            setdisableBtn(false)
                            window.location.href = `/advertiser/all-insertion-orders?id=${data.data[0].campaign_id}`;


                        }
                        else {

                            setsuccessMsg("Insertion created successfully")
                            setdisableBtn(false)
                            setTimeout(() => {
                                setsuccessMsg("")
                            }, 2000)
                            window.location.href = `/advertiser/inserationorder?campaign_id=${data.data[0].campaign_id}&campaign_insertion_id=${data.data[0].id}`;

                        }
                    } else {
                        console.error('Failed to create campaign:', 'Unknown error');
                        setdisableBtn(false)
                    }
                } catch (error) {
                    console.error('Error creating campaign:', error);
                    setdisableBtn(false)
                }
            } else {
                // Handle validation failure
                console.error('Validation failed');
            }
        } catch (error) {
            console.error('Error during validation:', error);
            // Handle validation error scenario
        }

    };

    const handleReceiveTargettingData = (data) => {
        setReceivedData(data);
    };
    const handleEnvironment = (selectedData) => {
        setenvironmentData(selectedData)
    };
    const setStateByName = (data, functionName) => {
        if (functionName == 'category') {
            setcategoryData(data)
        } else if (functionName == 'environment') {
            setenvironmentData(data)
        } else if (functionName == 'carrier') {
            setcarrierService(data)
        } else if (functionName == 'device') {
            setDeviceData(data)
        } else if (functionName == 'positions') {
            setPosition(data)
        } else if (functionName == 'viewability') {
            setviewability(data)
        } else if (functionName == 'connectionspeed') {
            setConnectionData(data)
        } else if (functionName == 'browser') {
            setSelectBrowser(data)
        } else if (functionName == 'appurl') {
            setappsUrl(data)
        } else if (functionName == 'daydata') {
            setDayData(data)
        } else if (functionName == 'keywords') {
            setKeyword(data)
        }
    }
    useEffect(() => {
        setReceivedData({
            appUrls: appUrls,
            browserList: selectBrowser,
            selectBrowser: selectBrowser,
            carrierService: carrierService,
            categoryData: categoryData,
            connnectionData: connnectionData,
            dayData: dayData,
            deviceData: deviceData,
            environmentData: environmentData,
            keyword: keyword,
            position: position,
            viewability: viewability
        });
    }, [appUrls, carrierService, selectBrowser, categoryData, connnectionData, dayData, deviceData, environmentData, keyword, position, viewability])
    const filterItems = (data) => {
        if (!Array.isArray(data)) {
            console.error("Input data is not an array.");
            return { include: [], exclude: [] };
        }

        const includedItems = data.filter(item => item.type === 'include');
        const excludedItems = data.filter(item => item.type === 'exclude');

        return { include: includedItems, exclude: excludedItems };
    };
    return (
        <>

            <div className={`${FormCss.top_bar}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_title}`}>
                        <button type="button" onClick={handleCancel}><img src="../images/cancel.svg" alt="" /></button>
                        <h4>{page === "editInsertion" ? "Edit Insertion Order" : "New Insertion Order"}<span> (Campaign - {campaignName})</span></h4>
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
                                            <label htmlFor="insertionName" className='gap-0'>Insertion order name<span className='text-danger'>*</span></label>
                                            <input
                                                type="text"
                                                id="insertionName"
                                                name="insertionName"
                                                className={errors && errors.insertionName ? "border-danger" : ""}
                                                value={insertionName}
                                                placeholder="Enter Name"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        {errors && errors.insertionName && <div className="text-danger">{errors.insertionName}</div>}
                                    </div>

                                    <div className="col-md-6">
                                        <div className={`${FormCss.status}`}>
                                            <select id="status" className={insertionStatus === "Active" || insertionStatus === "active" ? "bg-sucess" : "bg-light"} name="status" value={insertionStatus} onChange={(e) => setinsertionStatus(e.target.value)}>
                                                <option value="Pause">● Draft</option>
                                                <option value="Active">● Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p><img src="/images/setting.svg" alt="" /> Budget and pacing depend on both insertion order and item settings.</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="budgetType">Select your budget type </label>
                                    <select id="budgetType" name="budgetType" value={budgetSelect} onChange={handleBudgetType}>
                                        <option value="impression" >Impressions</option>
                                        <option value="Amount">Amount</option>
                                    </select>
                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="inrLabel">Specify this insertion order’s flight dates and budget segments </label>
                                    {budgetSegments && budgetSegments.map((segment, index) => (
                                        <div className={`${FormCss.checkbox_feild}`} key={index} id={`budgetList-${index}`}>
                                            <div className={`${FormCss.form_feilds}`}>
                                                <label htmlFor="budget" className="cr">Budget</label>
                                                <div className='position-relative'>
                                                    {budgetSelect === "Amount" ?
                                                        <div className={`${FormCss.const_group}`}>
                                                            <p>₹</p>
                                                        </div>
                                                        : ""}
                                                    <input type="number" name="budget" id="budget" placeholder="2,694,680" value={segment.amount} onChange={(e) => handleSegmentChange(index, 'amount', e.target.value)} min="1"/>
                                                </div>
                                            </div>

                                            <div className={`${FormCss.form_feilds}`}>
                                                <label htmlFor="description" className="cr">Description</label>
                                                <input type="text" name="description" id="description" placeholder="Description" value={segment.description} onChange={(e) => handleSegmentChange(index, 'description', e.target.value)} />
                                            </div>

                                            <div className={`${FormCss.form_feilds} custom_date`}>
                                                <label htmlFor="startDate " className="cr">Start date </label>
                                                <input type="date" name="startdate" id="startdate" value={segment.start_date} min={new Date().toISOString().split('T')[0]} onChange={(e) => handleSegmentChange(index, 'start_date', e.target.value)} />
                                            </div>

                                            <div className={`${FormCss.form_feilds} custom_date`}>
                                                <label htmlFor="endDate" className="cr">End date</label>
                                                <input type="date" name="endDate" id="endDate" value={segment.end_date} min={segment.start_date || new Date().toISOString().split('T')[0]} onChange={(e) => handleSegmentChange(index, 'end_date', e.target.value)} />
                                            </div>
                                            {budgetSegments && budgetSegments.length > 1 && (
                                                <button
                                                    className={`${FormCss.delete_btn} p-0 bg-transparent border-0`}
                                                    onClick={(event) => handleDeleteSegment(index, event)}
                                                >
                                                    <Trash />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button className={`${FormCss.add_btn}`} onClick={handleAddSegment}>Add Segment <span><Plus /></span></button>
                                </div>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="pacing">Pacing</label>
                                    <label htmlFor="flightBudget">How do you want to spend the flight budget?</label>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <select id="pacingType" name="pacingType" value={pacingType} onChange={handlePacingType}>
                                                <option value="Flight">Flight (Recommended)</option>
                                                <option value="Daily">Daily</option>
                                            </select>
                                        </div>
                                        <div className={pacingType === 'Flight' ? "col-md-4" : "col-md-8"}>
                                            <div className={`${FormCss.select_pacing}`}>
                                                <select id="select_2" name="select_2" onChange={(e) => setpacingAhead(e.target.value)} value={pacingAhead}>
                                                    <option value="Asap">Asap</option>
                                                    <option value="Even">Even</option>
                                                    {pacingType === 'Flight' ? <option value="Ahead" >Ahead</option> : ""}
                                                </select>
                                                {pacingType === "Daily" ? <input type="number" name="number" id="number" value={dailyCost} placeholder="0" onChange={(e) => setDailyCost(e.target.value)} min="1"/> : ""}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="goal">Goal
                                        <OverlayTrigger placement="right" overlay={tooltip}>
                                            <img src="/images/ask-tooltip.svg" alt="" />
                                        </OverlayTrigger>
                                    </label>
                                    <label htmlFor="focusOn">What goal would you like to focus on?</label>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <select id="select_1" name="select_1" value={selectGoal} onChange={(e) => setSelectGoal(e.target.value)}>
                                                <option value="Cost per thousand impression (CPM)">Cost per thousand impression (CPM)</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="position-relative">
                                                <div className="input_group_prepend">
                                                    <p>₹</p>
                                                </div>
                                                <input type="text" name="impression" id="impression" placeholder="₹ 20" value={goalAmt} onChange={handleChange} className={errors && errors.impression ? 'border-danger' : ''} />
                                            </div>
                                            {errors && errors.impression && <div className="text-danger">{errors.impression}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="billableOutcome">Billable Outcome</label>
                                    <label htmlFor="billablePay">What would you like to pay for?</label>
                                    <div className="col-md-6">
                                        <select id="status" name="status" value={billableOutcome} onChange={(e) => setBillableOutcome(e.target.value)}>
                                            <option value="Impression" disabled>Impression</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="optimization">Optimization</label>
                                    <label htmlFor="billablePay">How would you like to Optimize?</label>
                                    <div className={`${FormCss.radio_options}`}>
                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio" name="automateBid" id="automateBid" value="Automate_bid_budget_at_insertion_order_level" checked={optimiseType === 'Automate_bid_budget_at_insertion_order_level'} onChange={handleOptimisationType} />
                                            <label htmlFor="automateBid">Automate bid & budget at insertion order level
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </label>
                                        </div>

                                        {optimiseType === "Automate_bid_budget_at_insertion_order_level" ?
                                            <div className={`${FormCss.radio_data}`}>
                                                <label>Allow system to automatically adjust bids and shift budget to better-performing line items.</label>
                                                <select id="select_2" name="select_2" value={optimiseViewable} onChange={(e) => setoptimiseViewable(e.target.value)}>
                                                    <option selected disabled>Performance</option>
                                                    <option value="Maximize conversions">Maximize conversions</option>
                                                    <option value="Maximize clicks">Maximize clicks</option>
                                                    <option disabled>Brand</option>
                                                    <option value="Maximize viewable impressions" >Maximize viewable impressions</option>
                                                    <option value="Maximize completed in-view and audible" >Maximize completed in-view and audible</option>
                                                    <option value="Maximize viewable for at least 10 second" >Maximize viewable for at least 10 second</option>
                                                </select>
                                                <label>While prioritizing spending my full budget(recommeded)</label>
                                                <Accordion className={`${FormCss.accordian_block}`}>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Additional options</Accordion.Header>
                                                        <Accordion.Body className={`${FormCss.accordian_body}`}>
                                                            <div className={`${FormCss.checkboxs}`}>
                                                                <input type="checkbox" name="averagCPM" value="do_not_exceed_avereage_cpm_of" id="averagCPM" onChange={handleAdditionalOption} checked={additionalOptionType && additionalOptionType.includes("do_not_exceed_avereage_cpm_of")} />
                                                                <label htmlFor="averagCPM" className="cr">Do not exceed average CPM of <div className="position-relative">
                                                <div className="input_group_prepend">
                                                    <p>₹</p>
                                                </div> <input type="number" name="impression" id="impression" placeholder="20" min="1" value={additionalOptionType ? additionalOptionPrice : ""} onChange={(e) => setadditionalOptionPrice(e.target.value)} /> </div></label>
                                                            </div>
                                                            <div className={`${FormCss.checkboxs}`}>
                                                                <input type="checkbox" name="prioritize" id="prioritize" checked={additionalOptionType && additionalOptionType.includes("prioritize_deals_over_open_auction_inventory")} value="prioritize_deals_over_open_auction_inventory" onChange={handleAdditionalOption} />
                                                                <label htmlFor="prioritize" className="cr">Prioritize deals over open auction inventory</label>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                            : ""}
                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio" name="controlBid" id="controlBid" value="Control_bid_and_budget_at_the_line_item_level" checked={optimiseType === 'Control_bid_and_budget_at_the_line_item_level'} onChange={handleOptimisationType} />
                                            <label htmlFor="controlBid">Control bid and budget at the line item level</label>
                                        </div>

                                        {optimiseType === 'Control_bid_and_budget_at_the_line_item_level' ?
                                            <div className={`${FormCss.radio_data}`}>
                                                <div className={`${FormCss.radio_check}`}>
                                                    <input type="checkbox" name="allocation" id="allocation" checked={isAutomaticallyOptimise} onChange={(e) => setAutomaticallyOptimise(!isAutomaticallyOptimise)} />
                                                    <label htmlFor="allocation" className="cr">Automatically optimize your budget allocation</label>
                                                </div>
                                            </div>
                                            : ""}
                                    </div>
                                </div>
                            </div>
                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="frequencyCap">Frequency Cap</label>

                                    <div className={`${FormCss.radio_feilds}`}>
                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio"
                                                name="NoLimit"
                                                id="NoLimit"
                                                value="no Limit"
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
                                            />
                                            <label htmlFor="LimitFrequency">Limit frequency to</label>
                                            {frequencyCap == "no Limit" ? "" : <><input className={`${FormCss.radio_input}`} type="number" name="LimitFrequency" min="1" value={limit} id="LimitFrequency" onChange={(e) => setLimit(e.target.value)} />
                                                <label className="form-check-label" >Exposures per</label>
                                                <select id="exposures" name="exposures" value={exposer} onChange={(e) => setexposer(e.target.value)}>
                                                    <option selected value="Lifetime of This Campaign">Lifetime of This Campaign</option>
                                                    <option value="Months">Months</option>
                                                    <option value="Weeks">Weeks</option>
                                                    <option value="Days">Days</option>
                                                    <option value="Hours">Hours</option>
                                                    <option value="Minutes">Minutes</option>
                                                </select>
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <p className={`${FormCss.additional_line}`}>You can also set specific frequency caps on each insertion order and line item in this campaign.</p>
                            </div>
                            <div className={`${FormCss.inner_titles}`}>
                                <h5>Inventory Source</h5>
                                <p><img src="/images/setting.svg" alt="" /> (New insertion orders and line terms in this campaign will inherit these settings.)</p>
                            </div>
                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="publicInventory">Public Inventory</label>
                                    <input type="text" id="publicInventory" name="publicInventory" readOnly placeholder="Select Exchanges And 0 Subexchanges Are Selected " value={`${selectedInventoryItems !== null ? selectedInventoryItems.length : "0"} Exchanges And 0 Subexchanges Are Selected `} />
                                    <PublicInventoryPopup id={insertion_id} onApply={handleApply} inventoryData={inventoryData} inventorySelectedList={selectedInventoryItems} />
                                </div>
                            </div>
                            <div className={`${FormCss.inner_titles}`}>
                                <h5>Targeting</h5>
                                <p><img src="/images/setting.svg" alt="" /> (New insertion orders and line terms in this campaign will inherit these settings.)</p>
                            </div>
                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="Demographics">Demographics</label>
                                    <input type="text" id="demographics" name="demographics" placeholder="All genders, ages, parental statuses and household incomes" readOnly />
                                    <DemographicsPopup onApply={handleDemographicData} id={insertion_id} parentStatus={parentalstatus} genderCat={gender} ageSelected={age} selectAgeRange={ageragevalue} incomeSelected={income} selectincomeRange={incomerangevalue} />
                                    {demographicData ?
                                        <>
                                            <div className="data-get d-block">
                                                <p className="d-flex">
                                                    {demographicData && demographicData.gender.length > 0 ?
                                                        <p className='mb-0'><b>Gender: </b>{demographicData.gender.join(', ')} , </p>
                                                        : ""
                                                    }
                                                    {demographicData.age ? <p className='mb-0'><b>Age :</b> {demographicData.age} ,  </p> : ""}
                                                    {demographicData.ageRange ? <p className='mb-0'><b>Age Range: </b>   {demographicData.ageRange} , </p> : ""}
                                                    {demographicData.income ? <p className='mb-0'><b>Income: </b>  {demographicData.income} , </p> : ""}
                                                    {demographicData.incomeRange ? <p className='mb-0'><b>Income Range:</b>    {demographicData.incomeRange} , </p> : ""}
                                                    {demographicData.parentalStatus ? <p className='mb-0'><b>Parental Status: </b>   {demographicData.parentalStatus}</p> : ""}
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
                                                            {value && value.length > 5 && (
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
                                    <BrandSafetyPopup id={insertion_id} onDataSubmit={handleReceiveData} receivedDigitalContentLabels={receivedDigitalContentLabels} receivedSensitiveCategories={receivedSensitiveCategories} />
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


                                {appUrls && appUrls.length > 0 ? <div className={`${FormCss.feilds_fg}`}>
                                    {appUrls && appUrls.length > 0 ? <div className={`${FormCss.form_feilds}`}>
                                        <label htmlFor="appsURLs">Apps & URLs</label>
                                        <input type="text" id="appsURLs" name="appsURLs" placeholder="Apps & URLs" />
                                        <AppsURLPopup isEdit={true} dataSelected={appUrls ?? ''} onApply={handleAppsURL} />

                                    </div> : ""
                                    }
                                </div> : ""}

                                {categoryData && (categoryData.included_assign_category_list.length > 0 || categoryData.excluded_assign_category_list.length > 0) ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="categories">Categories</label>
                                    <input type="text" id="categories" name="categories" placeholder="Categories" />
                                    <CategoriesPopup onApply={handleCategory} isEdit={true} dataSelected={categoryData ?? ""} />

                                </div> : ""}
                                {environmentData && environmentData.length > 0 ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="environment">Environment</label>
                                    <input type="text" id="environment" name="environment" placeholder="Environment" />
                                    <EnvironmentPopup isEdit={true} dataSelected={environmentData ?? ""} onApply={handleEnvironment} />


                                </div> : ""}

                                {receivedData.viewability && receivedData.viewability !== "Select Viewability" ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="viewability">Viewability</label>
                                    <input type="text" id="viewability" name="viewability" placeholder="Viewability" />
                                    <ViewabilityPopup isEdit={true} dataSelected={receivedData ? receivedData.viewability : ""} onApply={handleViewability} />

                                </div> : ""}


                                {receivedData.deviceData && (receivedData.deviceData.device_types != '' || receivedData.deviceData.make_model != '' || receivedData.deviceData.operating_system != '') ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="device">Device</label>
                                    <input type="text" id="device" name="device" placeholder="Device" />
                                    <DevicePopup isEdit={true} dataSelected={receivedData ? receivedData.deviceData : ""} onSave={handleSaveDeviceData} />

                                </div> : ""}
                                <KeywordField keyword={keyword} handleKeyword={handleKeyword} />
                                {receivedData.position && (receivedData.position.positions != '' || receivedData.position.positions_display != '' || receivedData.position.positions_native != '') ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="position">Position</label>
                                    <input type="text" id="position" name="position" placeholder="Position" />
                                    <PositionPopup onApply={handlePosition} isEdit={true} dataSelected={position ? position : receivedData ? receivedData.position : ""} />

                                </div> : ""}
                                {(dayData && dayData.day_time && dayData.day_time.length > 0) ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="dayTime">Day & Time</label>
                                    <input type="text" id="dayTime" name="dayTime" placeholder="Day & Time" />
                                    <DayTimePopup isEdit={true} dataSelected={dayData ? dayData : ""} onSave={handleSaveDayData} />
                                </div> : ''}

                                <ConnectionSpeedField connectionData={receivedData.connnectionData} handleSave={handleSave} className={FormCss.form_feilds} />

                                {(receivedData.selectBrowser && receivedData.selectBrowser.length > 0) ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="browser">Browser</label>
                                    <input type="text" id="browser" name="browser" placeholder="Browser" />
                                    <BrowserPopup onApply={handleBrowser} isEdit={true} dataSelected={selectBrowser ? selectBrowser : receivedData ? receivedData.selectBrowser : ""} />
                                </div> : ""}

                                {(carrierService && carrierService.length > 0) ? <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="carrierISP">Carrier & ISP</label>
                                    <input type="text" id="carrierISP" name="carrierISP" placeholder="Carrier & ISP" />
                                    <CarrierISPPopup isEdit={true} dataSelected={receivedData ? receivedData.carrierService : ""} onApply={handleCarrierService} />

                                </div> : ""}


                                <TargetingPopup onUpdateData={handleReceiveTargettingData} receivedData={receivedData} handleMultipleStates={setStateByName} />

                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="optional">Note</label>
                                    <textarea type="text" id="optional" name="optional" placeholder="Enter a note about this changed " value={note} onChange={(e) => setNote(e.target.value)} />
                                </div>
                            </div>

                            <div className={`${FormCss.feilds_btns}`}>
                                {disableBtn ?
                                    <div className='bg_page_white'>
                                        <span className="loader"></span>
                                    </div>
                                    : ""}
                                <button className={`${FormCss.create_btn}  ${disableBtn ? "pe-none opacity-50" : ""}`} disabled={disableBtn}>{insertion_id ? "Update" : "Create"}</button>
                                <button className={`${FormCss.cancel_btn}`}>Cancel</button>
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
