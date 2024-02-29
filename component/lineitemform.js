import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import validate from 'validate.js'; // Import validate.js
import FormCss from '../styles/form.module.css';
import NewCss from '../styles/newform.module.css';
import Accordion from 'react-bootstrap/Accordion';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import GeographyPopup from '@/component/geographypopup';
import DemographicsPopup from '@/component/demographicspopup';
import BrandSafetyPopup from '@/component/brandsafetypopup';
import PublicInventoryPopup from '@/component/publicinventorypopup';
import LanguagePopup from '@/component/languagepopup';
import TargetingPopup from '@/component/targetingpopup';
import CreativePopup from '@/component/creativepopup';
import { Baseurl } from '@/component/Baseurl';
import AppsURLPopup from './appsurlpopup';
import CarrierISPPopup from './carrierISPpopup';
import BrowserPopup from './browserpopup';
import DayTimePopup from './daytimepopup';
import PositionPopup from './positionpopup';
import DevicePopup from './devicepopup';
import ViewabilityPopup from './viewabilitypopup';
import EnvironmentPopup from './environmentpopup';
import CategoriesPopup from './categoriespopup';
import { scrollToError } from './common';
import ConnectionSpeedField from './targetingFields/connectionSpeed/connectionSpeed';
import KeywordField from './targetingFields/keyword/keyword';
import { getNewToken } from '@/pages/api/bulkUpload';
export default function LineItemForm({ page, campaign_id, campaign_insertion_id, lineItemId }) {
    const [lineItemName, setLineItemName] = useState('')
    const [campaignName, setcampaignName] = useState('');
    const [insertionName, setInsertionName] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [lineItemStatus, setLineItemStatus] = useState("Pause" );
    const [selectedInventoryItems, setSelectedInventoryItems] = useState([]);
    const [receivedDigitalContentLabels, setReceivedDigitalContentLabels] = useState([]);
    const [receivedSensitiveCategories, setReceivedSensitiveCategories] = useState([]);
    const [optimiseViewable, setoptimiseViewable] = useState('')
    const [assignedItems, setAssignedItems] = useState([]);
    const [geographyData, setGeographyData] = useState('')
    const [additionalOptionType, setAdditionalOptionType] = useState([]);
    const [additionalOptionPrice, setadditionalOptionPrice] = useState('');
    const [demographicData, setDemographicData] = useState('')
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')
    const [ageragevalue, setageragevalue] = useState('')
    const [parentalstatus, setparentalstatus] = useState('')
    const [income, setincome] = useState('')
    const [incomerangevalue, setincomerangevalue] = useState('')
    const [startDate, setstartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [customStartDate, setCustomStartDate] = useState('')
    const [customEndDate, setCustomEndDate] = useState('')
    const [SelectPacingType, setSelectPacingType] = useState('')
    const [pacingAhead, setpacingAhead] = useState('')
    const [dailyCost, setDailyCost] = useState('')
    const [PacingTypeValue, setPacingTypeValue] = useState('')
    const [frequencyCap, setfrequencyCap] = useState('no Limit');
    const [CampaignId, setCampaignId] = useState([]);
    const [exposer, setexposer] = useState("Lifetime of This Campaign");
    const [limit, setLimit] = useState('');
    const [note, setNote] = useState('');
    const [errors, setErrors] = useState({});
    const [successMsg, setsuccessMsg] = useState('');
    const [carrierService, setcarrierService] = useState('')
    const [appUrls, setappsUrl] = useState('')
    const [selectBrowser, setSelectBrowser] = useState([])
    const [categoryData, setcategoryData] = useState('')
    const [dayData, setDayData] = useState('')
    const [connnectionData, setConnectionData] = useState('')
    const [viewability, setviewability] = useState('')
    const [environmentData, setenvironmentData] = useState('')
    const [keyword, setKeyword] = useState('')
    const [deviceData, setDeviceData] = useState('')
    const [position, setPosition] = useState('')
    const [receivedData, setReceivedData] = useState('');
    const [disableBtn, setdisableBtn] = useState(false)

    const router = useRouter();

    const inventoryData = ["Ad Colony", "Ad Media", "Ad Mob", "Ad Unity", "Adtelligent", "AOL (enx)", "AppLovin", "AppNexus", "Baidu", "Bidswitch", "C Exchange", "CheetahMobileAdx", "EPOM", "Geniee", "Google AdX", "Huawei", "HueAds",
        "Index Exchange", "inneractive", "IronSource", "Media.net", "MGID", "Mobfox", "MoPub", "One by AOL", "Open X", "Opera", "Outbrain", "PubMatic", "PubNative", "ReklamStore", "RTBDemand", "Rubicon", "Samsung", "silvermob", "Smaato", "Smart Ads", "SmartyAds", "SpotXchange", "Taboola", "TripleLift", "UC Browser", "Unity Ads", "Verizon",
        "VertaMedia", "Vungle", "Yahoo Exchange", "Fyber", "Appodeal", "Chartboost", "MobilityWare", "Adjoe"]

    useEffect(() => {
        setCampaignId(campaign_id)
    }, [campaign_id])


    const tooltip = (
        <Tooltip id="tooltip">
            You can also set specific frequency caps on each insertion order and line item in this campaign learn more.
        </Tooltip>
    );

    const [pacingType, setPacingType] = useState('Flight');
    const [budgetpacingType, setBudgetPacingType] = useState('Automatically adjust budget');
    const [bidstrategyType, setBidStrategyType] = useState('Automate bidding');
    const [bidstrategyRecommended, setbidstrategyRecommended] = useState(null);
    const [flightdatesType, setFlightDatesType] = useState('Same Date As Insertion');
    const [bidStrategyPrice, setbidStrategyPrice] = useState();

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


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token && lineItemId) {
                    const response = await fetch(`${Baseurl}view-insertion-order-line-item?insertion_line_item_id=${lineItemId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            // Other headers as needed
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
                    }
                    const data = await response.json();
                    getNewToken(data)
                    const dataVal = data.data[0];
                    if (lineItemId) {
                        setCampaignId(dataVal.campaign_id)
                    }
                    setcampaignName(dataVal.campaign_name)
                    setInsertionName(dataVal.name)
                    const formatDate = (isoDateString) => {
                        const date = new Date(isoDateString);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');

                        return `${year}-${month}-${day}`;
                    };
                    setLineItemName(dataVal.name)
                    setLineItemStatus(dataVal.line_item_status)
                    setSelectedInventoryItems(JSON.parse(dataVal.public_inventory))
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

                    const languagesArray = JSON.parse(dataVal.languages);
                    const result = { [dataVal.language_type]: languagesArray };
                    setAssignedItems(dataVal.assigned_line_item_list)
                    setSelectedLanguages(result)
                    setReceivedDigitalContentLabels(JSON.parse(dataVal.brand_digital_content))
                    setReceivedSensitiveCategories(JSON.parse(dataVal.brand_sensitive_category))
                    setFlightDatesType(dataVal.flight_date)
                    setCustomStartDate(formatDate(dataVal.flight_date_custom_date_to))
                    setCustomEndDate(formatDate(dataVal.flight_date_custom_date_from))
                    setfrequencyCap(dataVal.frequency_cap)
                    setLimit(dataVal.frequency_cap_value)
                    setexposer(dataVal.exposures_per)
                    setNote(dataVal.note)
                    setBudgetPacingType(dataVal.budget_and_pacing)
                    setSelectPacingType(dataVal.budget_and_pacing_type)
                    setPacingTypeValue(dataVal.budget_and_pacing_type_value)
                    setPacingType(dataVal.budget_and_pacing_daily)
                    setpacingAhead(dataVal.budget_and_pacing_even)
                    setDailyCost(dataVal.budget_and_pacing_daily_even_value)
                    setBidStrategyType(dataVal.bid_strategy)
                    setbidStrategyPrice(dataVal.bid_strategy_fixed_bid_value)
                    setoptimiseViewable(dataVal.bid_strategy_maximize_impressions)
                    setbidstrategyRecommended(dataVal.bidstrategyRecommended)
                    setadditionalOptionPrice(dataVal.bid_strategy_additional_price)
                    setAdditionalOptionType(dataVal.bid_strategy_additional)
                    setappsUrl(JSON.parse(dataVal.app_urls));
                    setSelectBrowser(JSON.parse(dataVal.browser_list))
                    setcarrierService(JSON.parse(dataVal.carrier_isp_list))
                    setConnectionData({
                        targetBy: dataVal.connection_speed_target_by,
                        netspeeds: dataVal.connection_speed
                    })
                    setDayData({
                        day_time: JSON.parse(dataVal.day_time),
                        preset_schedule: dataVal.preset_schedule,
                        time_zone: dataVal.time_zone
                    })
                    setDeviceData({
                        device_types: JSON.parse(dataVal.device_types),
                        make_model: JSON.parse(dataVal.make_model),
                        operating_system: JSON.parse(dataVal.operating_system),
                    })
                    setenvironmentData(JSON.parse(dataVal.environment))
                    setKeyword(JSON.parse(dataVal.keywords))
                    setPosition({
                        positions: JSON.parse(dataVal.positions),
                        positions_display: JSON.parse(dataVal.positions_display),
                        positions_native: JSON.parse(dataVal.positions_native)
                    })
                    setviewability(dataVal.viewability)
                    setcategoryData({
                        included_assign_category_list: dataVal.included_assign_category_list,
                        excluded_assign_category_list: dataVal.excluded_assign_category_list,
                    })

                    setReceivedData({
                        appUrls: JSON.parse(dataVal.app_urls),
                        browserList: JSON.parse(dataVal.browser_list),
                        carrierService: JSON.parse(dataVal.carrier_isp_list),

                        connnectionData: {
                            targetBy: dataVal.connection_speed_target_by,
                            netspeeds: dataVal.connection_speed
                        },
                        dayData: {
                            day_time: JSON.parse(dataVal.day_time),
                            preset_schedule: dataVal.preset_schedule,
                            time_zone: dataVal.time_zone
                        },
                        deviceData: {
                            device_types: JSON.parse(dataVal.device_types),
                            make_model: JSON.parse(dataVal.make_model),
                            operating_system: JSON.parse(dataVal.operating_system),
                        },
                        environmentData: JSON.parse(dataVal.environment),
                        keyword: JSON.parse(dataVal.keywords),
                        position: {
                            positions: JSON.parse(dataVal.positions),
                            positions_display: JSON.parse(dataVal.positions_display),
                            positions_native: JSON.parse(dataVal.positions_native)
                        },
                        selectBrowser: JSON.parse(dataVal.browser_list),
                        viewability: dataVal.viewability,
                        categoryData: {
                            included_assign_category_list: dataVal.included_assign_category_list,
                            excluded_assign_category_list: dataVal.excluded_assign_category_list,
                        },
                    });
                }
            } catch (error) {
                console.error('Error fetching campaign data:', error);
                // Handle errors if necessary
            }
        };
        if (lineItemId) {
            fetchData();
        }
    }, [lineItemId]);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    useEffect(() => {


        const fetchInsertionData = async () => {
            try {
                const token = localStorage.getItem('token');

                if (token && campaign_insertion_id) {
                    const response = await fetch(`${Baseurl}view-insertion-order?insertion_order_id=${campaign_insertion_id}`, {
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
                    setSelectedInventoryItems(JSON.parse(dataVal.public_inventory))
                    setcampaignName(dataVal.campaign_name)
                    setInsertionName(dataVal.name)
                    setDemographicData({
                        gender: JSON.parse(dataVal.gender),
                        parentalStatus: dataVal.parental_status,
                        age: dataVal.age,
                        ageRange: dataVal.age_rage_value,
                        incomeRange: dataVal.income_range_value,
                        income: dataVal.income,
                    })
                    setappsUrl(JSON.parse(dataVal.app_urls));
                    setSelectBrowser(JSON.parse(dataVal.browser_list))
                    setcarrierService(JSON.parse(dataVal.carrier_isp_list))
                    setConnectionData({
                        targetBy: dataVal.connection_speed_target_by,
                        netspeeds: dataVal.connection_speed
                    })
                    setDayData({
                        day_time: JSON.parse(dataVal.day_time),
                        preset_schedule: dataVal.preset_schedule,
                        time_zone: dataVal.time_zone
                    })
                    setDeviceData({
                        device_types: JSON.parse(dataVal.device_types),
                        make_model: JSON.parse(dataVal.make_model),
                        operating_system: JSON.parse(dataVal.operating_system),
                    })
                    setenvironmentData(JSON.parse(dataVal.environment))
                    setKeyword(JSON.parse(dataVal.keywords))
                    setPosition({
                        positions: JSON.parse(dataVal.positions),
                        positions_display: JSON.parse(dataVal.positions_display),
                        positions_native: JSON.parse(dataVal.positions_native)
                    })
                    setviewability(dataVal.viewability)
                    setcategoryData({
                        included_assign_category_list: dataVal.included_assign_category_list,
                        excluded_assign_category_list: dataVal.excluded_assign_category_list,
                    })
                    setGeographyData(JSON.parse(dataVal.geography_address))
                    setGender(JSON.parse(dataVal.gender))
                    setAge(dataVal.age)
                    setageragevalue(dataVal.age_rage_value)
                    setparentalstatus(dataVal.parental_status)
                    setincome(dataVal.income)
                    setincomerangevalue(dataVal.income_range_value)
                    const languagesArray = JSON.parse(dataVal.languages);
                    const result = { [dataVal.language_type]: languagesArray };
                    setSelectedLanguages(result)
                    setReceivedDigitalContentLabels(JSON.parse(dataVal.brand_digital_content))
                    setReceivedSensitiveCategories(JSON.parse(dataVal.brand_sensitive_category))
                    const budgetSegment = JSON.parse(dataVal.budget_segments)
                    const firstArrayKey = Object.keys(budgetSegment)[0];
                    const startDate = budgetSegment[firstArrayKey].start_date;
                    setstartDate(startDate)

                    const lastArrayKey = Object.keys(budgetSegment)[Object.keys(budgetSegment).length - 1];
                    const endDate = budgetSegment[lastArrayKey].end_date;
                    setEndDate(endDate)

                    setReceivedData({
                        appUrls: JSON.parse(dataVal.app_urls),
                        browserList: JSON.parse(dataVal.browser_list),
                        carrierService: JSON.parse(dataVal.carrier_isp_list),

                        connnectionData: {
                            targetBy: dataVal.connection_speed_target_by,
                            netspeeds: dataVal.connection_speed
                        },
                        dayData: {
                            day_time: JSON.parse(dataVal.day_time),
                            preset_schedule: dataVal.preset_schedule,
                            time_zone: dataVal.time_zone
                        },
                        deviceData: {
                            device_types: JSON.parse(dataVal.device_types),
                            make_model: JSON.parse(dataVal.make_model),
                            operating_system: JSON.parse(dataVal.operating_system),
                        },
                        environmentData: JSON.parse(dataVal.environment),
                        keyword: JSON.parse(dataVal.keywords),
                        position: {
                            positions: JSON.parse(dataVal.positions),
                            positions_display: JSON.parse(dataVal.positions_display),
                            positions_native: JSON.parse(dataVal.positions_native)
                        },
                        selectBrowser: JSON.parse(dataVal.browser_list),
                        viewability: dataVal.viewability,
                        categoryData: {
                            included_assign_category_list: dataVal.included_assign_category_list,
                            excluded_assign_category_list: dataVal.excluded_assign_category_list,
                        },
                    });
                }
            } catch (error) {
                console.error('Error fetching campaign data:', error);
            }
        };
        if (!lineItemId && campaign_insertion_id) {
            fetchInsertionData();
        }
    }, [campaign_insertion_id]);


    useEffect(() => {
        setSelectedInventoryItems(inventoryData);
    }, []);

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
    const handleRemoveLocation = (locationToRemove) => {
        // Filter out the location to remove
        const updatedGeographyData = geographyData.filter(location => location !== locationToRemove);
        setGeographyData(updatedGeographyData);
    };

    const handlePacingTypeChange = (e) => {
        setpacingAhead("")
        setDailyCost("")
        setPacingType(e.target.value)
    };
    const handleBudgetPacingTypeChange = (e) => {
        setBudgetPacingType(e.target.value);
    };
    const handleBidStrategyTypeChange = (e) => {
        setBidStrategyType(e.target.value);
    };
    const handleFlightDatesTypeChange = (e) => {
        setFlightDatesType(e.target.value);
    };
    const handleReceiveTargettingData = (data) => {
        setReceivedData(data);
    };
    //   get inventory data from child component
    const handleApply = (selectedInventoryItems) => {
        setSelectedInventoryItems(selectedInventoryItems);
    };

    const handleDemographicData = (data) => {
        setDemographicData(data);
    };

    // handle geography data
    const handleGeographyData = (location) => {
        setGeographyData(location)
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
    const handleSaveDeviceData = (formData) => {
        setDeviceData(formData);
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
    const handleEnvironment = (selectedData) => {
        setenvironmentData(selectedData)
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


    const handleCreativeData = (selectedItems) => {
        // Add the selected eligible items to the assignedItems state
        setAssignedItems(selectedItems);
    };



    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'LineItemName') {
            setLineItemName(value);
            validateField(name, value);
        } else if (name === 'optional') {
            setNote(value)
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
        LineItemName: {
            presence: { allowEmpty: false, message: 'is required' }
        }
    };

    const validateFormData = () => {
        const validationResult = validate({
            LineItemName: lineItemName,
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


    const handleDeleteItem = (index) => {
        const updatedItems = [...assignedItems];
        updatedItems.splice(index, 1);
        setAssignedItems(updatedItems);
    };

    const handleSave = (selectedValues) => {
        setConnectionData(selectedValues)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setdisableBtn(true)
        try {
            const isValid = validateFormData();
            if (isValid) {
                setErrors({})
                try {
                    let assignedItemsArray = assignedItems && assignedItems.map(item => item.id);
                    const token = localStorage.getItem('token'); // Retrieve token from storage
                    const formatData = (locations, type) => {
                        // Map through the locations and transform each item
                        return locations.map(location => ({
                            address: location.name, // Use the name as the address
                            lng: location.latLng.lng.toString(), // Convert longitude to string
                            lat: location.latLng.lat.toString(), // Convert latitude to string
                            type: type // Set the type (include/exclude)
                        }));
                    };
                    const payload = {
                        campaign_id: campaign_id,
                        campaign_insertion_id: campaign_insertion_id,
                        name: lineItemName,
                        line_item_status: lineItemStatus === "Pause" ? 'Pause' : "Active",
                        public_inventory: selectedInventoryItems,
                        gender: demographicData.gender,
                        age: demographicData.age,
                        age_rage_value: demographicData.ageRange,
                        parental_status: demographicData.parentalStatus,
                        income: demographicData.income,
                        income_range_value: demographicData.incomerangevalue,
                        geography_address: geographyData,
                        languages: Object.values(selectedLanguages)[0],
                        language_type: Object.keys(selectedLanguages)[0],
                        brand_digital_content: receivedDigitalContentLabels,
                        brand_sensitive_category: receivedSensitiveCategories,
                        extra_targeting: "",
                        flight_date: flightdatesType,
                        flight_date_custom_date_to: customStartDate,
                        flight_date_custom_date_from: customEndDate,
                        budget_and_pacing: budgetpacingType,
                        budget_and_pacing_type: SelectPacingType,
                        budget_and_pacing_type_value: PacingTypeValue,
                        budget_and_pacing_daily: pacingType,
                        budget_and_pacing_even: pacingAhead,
                        budget_and_pacing_daily_even_value: dailyCost,
                        bid_strategy: bidstrategyType,
                        bid_strategy_fixed_bid_value: bidStrategyPrice,
                        bid_strategy_maximize_impressions: optimiseViewable,
                        bid_strategy_recomm_budget: bidstrategyRecommended,
                        bid_strategy_additional: additionalOptionType,
                        bid_strategy_additional_price: additionalOptionPrice,
                        frequency_cap: frequencyCap,
                        frequency_cap_value: frequencyCap === 'LimitFrequency' ? limit : '',
                        exposures_per: frequencyCap === 'LimitFrequency' ? exposer : '',
                        note: note,
                        assigned_line_item_list: assignedItemsArray,
                        app_urls: receivedData ? receivedData.appUrls !== "" ? appUrls : "" : "",
                        environment: receivedData ? receivedData.environmentData || environmentData : "",
                        viewability: receivedData ? receivedData.viewability : "",
                        device_types: receivedData ? receivedData.deviceData.device_types : "",
                        operating_system: receivedData ? receivedData.deviceData.operating_system : "",
                        make_model: receivedData ? receivedData.deviceData.make_model : "",
                        keywords: receivedData ? receivedData.keyword : "",
                        positions: receivedData ? receivedData.position.positions : "",
                        positions_display: receivedData ? receivedData.position.positions_display : "",
                        positions_native: receivedData ? receivedData.position.positions_native : "",
                        day_time: receivedData ? receivedData.dayData.day_time : "",
                        preset_schedule: receivedData ? receivedData.dayData.preset_schedule : "",
                        time_zone: receivedData ? receivedData.dayData.time_zone : "",
                        browser_list: receivedData ? receivedData.selectBrowser : "",
                        connection_speed: receivedData ? receivedData.connnectionData.netspeeds : "",
                        connection_speed_target_by: receivedData ? receivedData.connnectionData.targetBy : "",
                        carrier_isp_list: receivedData ? receivedData.carrierService : "",
                        included_assign_category_list: receivedData ? receivedData.categoryData ? receivedData.categoryData.included_assign_category_list.map(item => item.id) : "" : "",
                        excluded_assign_category_list: receivedData ? receivedData.categoryData ? receivedData.categoryData.excluded_assign_category_list.map(item => item.id) : "" : "",
                    };
                    if (lineItemId) {
                        payload.insertion_line_item_id = lineItemId;
                    }
                    let response;
                    if (lineItemId) {
                        response = await fetch(`${Baseurl}update-insertion-line-item`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify(payload),
                        });
                    } else {
                        response = await fetch(`${Baseurl}create-insertion-line-item`, {
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
                        if (lineItemId) {
                            setsuccessMsg("insertion line item Updated successfully")
                            setTimeout(() => {
                                setsuccessMsg("")
                            }, 2000)

                            window.location.href = `/advertiser/all-insertion-orders?id=${campaign_id}&campaign_insertion_id=${campaign_insertion_id}`;


                        }
                        else {
                            setsuccessMsg("insertion line item created successfully")
                            setTimeout(() => {
                                setsuccessMsg("")
                            }, 2000)
                            window.location.href = `/advertiser/dashboard`;
                        }

                        // Perform actions after successful API call
                    } else {
                        console.error('Failed to create campaign:', data.message || 'Unknown error');
                        // Handle error scenario
                        setdisableBtn(false)
                    }
                } catch (error) {
                    console.error('Error creating campaign:', error);
                    // Handle error scenario
                    setdisableBtn(false)

                }
            } else {
                // Handle validation failure
                console.error('Validation failed');
                setdisableBtn(false)

            }
        } catch (error) {
            console.error('Error during validation:', error);
            setdisableBtn(false)

            // Handle validation error scenario
        }

    };

    const handleCancel = () => {
        router.push(`/advertiser/dashboard`);
    }

    return (
        <>

            <div className={`${FormCss.top_bar}`}>
                <div className={`${FormCss.container} container`}>
                    <div className={`${FormCss.form_title}`}>
                        <button type="button" onClick={handleCancel}><img src="../images/cancel.svg" alt="" /></button>
                        <h4>{page === "editLineItem" ? "Edit Line Item" : "New Line Item"}<span> (Campaign  -  {campaignName}, Insertion Order - {insertionName})</span></h4>
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
                                            <label htmlFor="LineItemName">Line item name</label>
                                            <input type="text" id="LineItemName" name="LineItemName" placeholder="Enter Name" className={errors && errors.LineItemName ? "border-danger" : ""} value={lineItemName} onChange={handleChange} />
                                            {errors && errors.LineItemName && <div className="text-danger">{errors.LineItemName}</div>}

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={`${FormCss.status}`}>
                                            <select className={lineItemStatus === 'Active' ? "bg-sucess" : "bg-light"} id="status" name="status" value={lineItemStatus} onChange={(e) => setLineItemStatus(e.target.value)}>
                                                <option value="Pause">● Draft</option>
                                                <option value="Active">● Active</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                {/* <p className={`${FormCss.additional_line}`}>Copy settings from an existing campaign.</p> */}
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <h5>Inventory Source</h5>
                                <p><img src="/images/setting.svg" alt="" /> (New insertion orders and line terms in this campaign will inherit these settings.)</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="publicInventory">Public Inventory</label>
                                    <input type="text" id="publicInventory" readOnly name="publicInventory" placeholder="Select Exchanges And 0 Subexchanges Are Selected " value={`${selectedInventoryItems !== null ? selectedInventoryItems.length : "0"} Exchanges And 0 Subexchanges Are Selected `} />
                                    <PublicInventoryPopup id={campaign_insertion_id} onApply={handleApply} inventoryData={inventoryData} inventorySelectedList={selectedInventoryItems} />
                                </div>
                                {/* {selectedInventoryItems.map((item)=>{
                                    return(
                                        <>
                                         <span>{item} , </span>
                                        </>
                                    )
                                })} */}
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <h5>Targeting</h5>
                                <p><img src="/images/setting.svg" alt="" /> (New insertion orders and line terms in this campaign will inherit these settings.)</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="Demographics">Demographics</label>
                                    <input type="text" id="demographics" name="demographics" placeholder="All genders, ages, parental statuses and household incomes" readOnly />
                                    <DemographicsPopup onApply={handleDemographicData} id={lineItemId || campaign_insertion_id} parentStatus={parentalstatus} genderCat={gender} ageSelected={age} selectAgeRange={ageragevalue} incomeSelected={income} selectincomeRange={incomerangevalue} />

                                    {demographicData ?
                                        <>
                                            <div className="data-get d-block">
                                                <p className="d-flex"> 
                                                    {demographicData.gender && demographicData.gender.length > 0 ?
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
                                    <input type="text" id="geography" name="geography" placeholder="All locations " />
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
                                    <BrandSafetyPopup id={lineItemId || campaign_insertion_id} onDataSubmit={handleReceiveData} receivedDigitalContentLabels={receivedDigitalContentLabels} receivedSensitiveCategories={receivedSensitiveCategories} />
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

                                <KeywordField keyword={keyword} handleKeyword={handleKeyword} className={FormCss.form_feilds} />
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
                                    <label htmlFor="flightDates">Flight Dates</label>
                                    <div className={`${FormCss.radio_feilds}`}>
                                        <div className={`${FormCss.radio_options}`}>
                                            <div className={`${FormCss.radio_btn}`}>
                                                <input type="radio" name="sameDates" id="sameDates" value="Same Date As Insertion" checked={flightdatesType === 'Same Date As Insertion'} onChange={handleFlightDatesTypeChange} />
                                                <label htmlFor="sameDates">User same dates as insertion order
                                                    <OverlayTrigger placement="right" overlay={tooltip}>
                                                        <img src="/images/ask-tooltip.svg" alt="" />
                                                    </OverlayTrigger>
                                                </label>
                                            </div>

                                            {flightdatesType === 'Same Date As Insertion' && (
                                                <div className={`${FormCss.radio_data}`}>
                                                    <label>{startDate} - {endDate}</label>
                                                </div>
                                            )}

                                            <div className={`${FormCss.radio_btn}`}>
                                                <input type="radio" name="customDate" id="customDate" value="Custom Date" checked={flightdatesType === 'Custom Date'} onChange={handleFlightDatesTypeChange} />
                                                <label htmlFor="customDate">Custom Date</label>
                                            </div>

                                            {flightdatesType === 'Custom Date' && (
                                                <div className={`${FormCss.radio_data}`}>
                                                    <div className={`${FormCss.date_feilds}`}>
                                                        <div className={`${FormCss.date_box} custom_date`}>
                                                            <label htmlFor="startDate">Start date</label>
                                                            <input type="date" name="startdate" id="startdate" value={customStartDate} onChange={(e) => setCustomStartDate(e.target.value)} />
                                                        </div>
                                                        <p>to</p>
                                                        <div className={`${FormCss.date_box} custom_date`}>
                                                            <label htmlFor="endDate">End date (Optional)</label>
                                                            <input type="date" name="endDate" id="endDate" value={customEndDate} onChange={(e) => setCustomEndDate(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${FormCss.inner_titles}`}>
                                <p><img src="/images/setting.svg" alt="" /> Budget and pacing depend on both insertion order and item settings.</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="budgetPacing">Budget And Pacing</label>
                                    <div className={`${FormCss.form_feilds}`}>
                                        <div className={`${FormCss.radio_options}`}>
                                            <div className={`${FormCss.radio_btn}`}>
                                                <input type="radio" name="automateBudget" id="automateBudget" value="Automatically adjust budget" checked={budgetpacingType === 'Automatically adjust budget'} onChange={handleBudgetPacingTypeChange} />
                                                <label htmlFor="automateBudget">Automatically adjust budget
                                                    <OverlayTrigger placement="right" overlay={tooltip}>
                                                        <img src="/images/ask-tooltip.svg" alt="" />
                                                    </OverlayTrigger>
                                                </label>
                                            </div>

                                            {budgetpacingType === 'Automatically adjust budget' && (
                                                <div className={`${FormCss.radio_data}`}>
                                                    <label>The system will move budget from lower - to higher-performing line items once a day</label>
                                                </div>
                                            )}

                                            <div className={`${FormCss.radio_btn}`}>
                                                <input type="radio" name="fixedBudget" id="fixedBudget" value="Fixed Budget" checked={budgetpacingType === 'Fixed Budget'} onChange={handleBudgetPacingTypeChange} />
                                                <label htmlFor="fixedBudget">Fixed budget</label>
                                            </div>

                                            {budgetpacingType === 'Fixed Budget' && (
                                                <div className={`${FormCss.radio_data}`}>
                                                    <label>The line item’s budget will not be modified by the system</label>
                                                    <div className={`${FormCss.radio_btn}`}>
                                                        <input type="radio" name="unlimitedBudger" id="unlimitedBudger" value="Unlimited up to the insertion order’s budget." checked={SelectPacingType === "Unlimited up to the insertion order’s budget."} onChange={(e) => setSelectPacingType(e.target.value)} />
                                                        <label htmlFor="unlimitedBudger">Unlimited up to the insertion order’s budget.</label>
                                                    </div>

                                                    <div className={`${FormCss.radio_btn}`}>
                                                        <input type="radio" name="Impressions" id="Impressions" value="Impressions" checked={SelectPacingType === "Impressions"} onChange={(e) => setSelectPacingType(e.target.value)} />
                                                        <label htmlFor="Impressions" className="cr">
                                                            <input type="number" name="impressionVal" min="1" id="impressionVal" placeholder="0" className={`${FormCss.setWidth}`} value={PacingTypeValue} onChange={(e) => setPacingTypeValue(e.target.value)} /> Impressions</label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <select id="pacingType" name="pacingType" value={pacingType} onChange={handlePacingTypeChange}>
                                                    <option selected={pacingType === "Flight"} value="Flight">Flight (Recommended)</option>
                                                    <option selected={pacingType === "Daily"} value="Daily">Daily</option>
                                                </select>
                                            </div>

                                            <div className={pacingType === 'Flight' ? "col-md-4" : "col-md-8"}>
                                                <div className={`${FormCss.select_pacing}`}>
                                                    <select id="select_2" name="select_2" onChange={(e) => setpacingAhead(e.target.value)} value={pacingAhead}>
                                                        <option selected={pacingAhead === "Asap"} value="Asap">Asap</option>
                                                        <option selected={pacingAhead === "Even"} value="Even">Even</option>
                                                        {pacingType === 'Flight' ? <option value="Ahead" selected={pacingAhead === "Ahead"}>Ahead</option> : ""}
                                                    </select>
                                                    {pacingType === "Daily" ? <input type="number" min="1" name="number" id="number" value={dailyCost} placeholder="0" onChange={(e) => setDailyCost(e.target.value)} /> : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="bidStrategy">Bid Strategy</label>
                                    <div className={`${FormCss.radio_options}`}>
                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio" name="automateBid" id="automateBid" value="Automate bidding" checked={bidstrategyType === 'Automate bidding'} onChange={handleBidStrategyTypeChange} />
                                            <label htmlFor="automateBid">Automate bidding
                                                <OverlayTrigger placement="right" overlay={tooltip}>
                                                    <img src="/images/ask-tooltip.svg" alt="" />
                                                </OverlayTrigger>
                                            </label>
                                        </div>

                                        {bidstrategyType === 'Automate bidding' && (
                                            <div className={`${FormCss.radio_data}`}>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <select id="select_2" name="select_2" value={optimiseViewable} onChange={(e) => setoptimiseViewable(e.target.value)}>
                                                            <option selected disabled>Performance</option>
                                                            <option selected={optimiseViewable === "Maximize conversions"} value="Maximize conversions">Maximize conversions</option>
                                                            <option selected={optimiseViewable === "Maximize clicks"} value="Maximize clicks">Maximize clicks</option>
                                                            <option disabled>Brand</option>
                                                            <option value="Maximize viewable impressions" selected={optimiseViewable === "Maximize viewable impressions"} >Maximize viewable impressions</option>
                                                            <option value="Maximize completed in-view and audible" selected={optimiseViewable === "Maximize completed in-view and audible"} >Maximize completed in-view and audible</option>
                                                            <option value="Maximize viewable for at least 10 second" selected={optimiseViewable === "Maximize viewable for at least 10 second"} >Maximize viewable for at least 10 second</option>
                                                        </select>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <select id="select_3" name="select_3" value={bidstrategyRecommended} onChange={(e) => setbidstrategyRecommended(e.target.value)}>
                                                            <option value="While prioritizing spending my full budget (recommended)" selected={bidstrategyRecommended === "While prioritizing spending my full budget (recommended)"}>While prioritizing spending my full budget (recommended)</option>
                                                            <option value="While prioritizing a target viewable CPM" selected={bidstrategyRecommended === "While prioritizing a target viewable CPM"}>While prioritizing a target viewable CPM</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <Accordion className={`${FormCss.accordian_block}`}>
                                                    <Accordion.Item eventKey="0">
                                                        <Accordion.Header>Additional options</Accordion.Header>
                                                        <Accordion.Body className={`${FormCss.accordian_body}`}>
                                                            <div className={`${FormCss.checkboxs}`}>
                                                                <input type="checkbox" name="averagCPM" value="do_not_exceed_avereage_cpm_of" id="averagCPM" onChange={handleAdditionalOption} checked={additionalOptionType && additionalOptionType.includes("do_not_exceed_avereage_cpm_of")} />
                                                                <label htmlFor="averagCPM" className="cr">Do not exceed average CPM of <div className="position-relative">
                                                                    <div className="input_group_prepend">
                                                                        <p>₹</p>
                                                                    </div> <input type="text" name="impression" id="impression" placeholder=" 20" value={additionalOptionType ? additionalOptionPrice : ""} onChange={(e) => setadditionalOptionPrice(e.target.value)} /> </div></label>
                                                            </div>
                                                            <div className={`${FormCss.checkboxs}`}>
                                                                <input type="checkbox" name="prioritize" id="prioritize" checked={additionalOptionType && additionalOptionType.includes("prioritize_deals_over_open_auction_inventory")} value="prioritize_deals_over_open_auction_inventory" onChange={handleAdditionalOption} />
                                                                <label htmlFor="prioritize" className="cr">Prioritize deals over open auction inventory</label>
                                                            </div>
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                </Accordion>
                                            </div>
                                        )}

                                        <div className={`${FormCss.radio_btn}`}>
                                            <input type="radio" name="fixedBid" id="fixedBid" value="Fixed Bid" checked={bidstrategyType === 'Fixed Bid'} onChange={handleBidStrategyTypeChange} />
                                            <label htmlFor="fixedBid">Fixed Bid</label>
                                        </div>

                                        {bidstrategyType === 'Fixed Bid' && (
                                            <div className={`${FormCss.radio_data}`}>
                                                <div className={`${FormCss.checkboxs}`}>
                                                    <div className="position-relative">
                                                        <div className="input_group_prepend">
                                                            <p>₹</p>
                                                        </div>
                                                        <input type="text" name="fixedINR" id="fixedINR" placeholder="0.00" value={bidStrategyPrice} onChange={(e) => setbidStrategyPrice(e.target.value)} />
                                                    </div>

                                                </div>
                                            </div>
                                        )}
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
                                            {frequencyCap == "no Limit" ? "" : <><input className={`${FormCss.radio_input}`} type="number" min="1" name="LimitFrequency" value={limit} id="LimitFrequency" onChange={(e) => setLimit(e.target.value)} />
                                                <label className="form-check-label" >Exposures per</label>
                                                <select id="exposures" name="exposures" value={exposer} onChange={(e) => setexposer(e.target.value)}>
                                                    <option selected value="Lifetime of This Campaign">Lifetime of This Campaign</option>
                                                    <option selected={exposer == "Months"} value="Months">Months</option>
                                                    <option selected={exposer == "Weeks"} value="Weeks">Weeks</option>
                                                    <option selected={exposer == "Days"} value="Days">Days</option>
                                                    <option selected={exposer == "Hours"} value="Hours">Hours</option>
                                                    <option selected={exposer == "Minutes"} value="Minutes">Minutes</option>
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
                                <p><img src="/images/setting.svg" alt="" /> Creatives</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.creative_box}`}>
                                    <div className={`${FormCss.row}`}>
                                        <div className="col-md-6">
                                            <div className={`${FormCss.feilds_btns} justify-content-start`}>
                                                <CreativePopup onAssignedData={handleCreativeData} campId={CampaignId} assignedItems={assignedItems} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className={`${NewCss.creative}`}>
                                                <label>Creative optimization
                                                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                                                        <img src="/images/ask-tooltip.svg" alt="" />
                                                    </OverlayTrigger>
                                                </label>
                                                <select id="exposures" name="exposures">
                                                    <option selected value="1">Click </option>
                                                    <option value="2">Conversion</option>
                                                    <option value="3">Even</option>
                                                </select>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="row mt-4">
                                        {assignedItems && assignedItems.length >= 1 ? <div className="col-md-12">
                                            <table className="table table-borderless ">
                                                <thead>
                                                    <tr>
                                                        <th>name</th>
                                                        <th>ID</th>
                                                        <th>Type</th>
                                                        <th>Format</th>
                                                        <th>Dimension</th>
                                                        <th>Exchange status</th>
                                                        <th>Status</th>
                                                        <th>Created</th>
                                                        <th className='text-center'>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {assignedItems ? assignedItems.map((item, index) => {
                                                        return (

                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.id}</td>
                                                                <td>{item.creative_type}</td>
                                                                <td>{item.creative_upload_type}</td>
                                                                <td>{item.dimension}</td>
                                                                <td>{item.exchange_status}</td>
                                                                <td>{item.status}</td>
                                                                <td>{item.created_at}</td>
                                                                <td className='text-center'><img src='/images/delete.svg' alt="delete" onClick={() => handleDeleteItem(index)} /></td>
                                                            </tr>

                                                        )
                                                    }) : ""}
                                                </tbody>
                                            </table>
                                        </div> : ""}
                                    </div>
                                    {/* <div className={`${NewCss.feilds_img}`}>
                                        <img src="/images/creative.svg" alt="" />
                                    </div> */}
                                </div>
                            </div>

                            {/* 
                            <div className={`${FormCss.inner_titles}`}>
                                <p><img src="/images/setting.svg" alt="" /> Conversions</p>
                            </div>

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="conversionTracking">Conversion tracking
                                        <OverlayTrigger placement="right" overlay={tooltip}>
                                            <img src="/images/ask-tooltip.svg" alt="" />
                                        </OverlayTrigger>
                                    </label>
                                    <div className={`${FormCss.radio_feilds}`}>
                                        <label>Select the activity or conversion that represents a successful conversion </label>
                                    </div>
                                    <button className={`${FormCss.add_btn}`}>Select Conversions </button>
                                </div>
                            </div> */}

                            <div className={`${FormCss.feilds_box}`}>
                                <div className={`${FormCss.form_feilds}`}>
                                    <label htmlFor="optional">Optional</label>
                                    <textarea type="text" className={errors && errors.optional ? 'border-danger' : ''} id="optional" name="optional" placeholder="Enter a note about this changed " value={note} onChange={handleChange} />
                                    {errors && errors.optional && <div className="text-danger">{errors.optional}</div>}
                                </div>

                            </div>


                            <div className={`${FormCss.feilds_btns}`}>
                                {disableBtn ?
                                    <div className='bg_page_white'>
                                        <span className="loader"></span>
                                    </div>
                                    : ""}
                                <button className={`${FormCss.create_btn}`}>{lineItemId ? "Update" : "Create"}</button>
                                <button className={`${FormCss.cancel_btn}`} >Cancel</button>
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
