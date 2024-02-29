import React, { useState } from "react";

const CustomDatePicker = ({ keyTypeHandler, changeStartDate, changeEndDate, clearDaes, generteFile }) => {
    const [dateType, setDateType] = useState('custom');

    const options = [
        { value: 'custom', label: 'Custom' },
        { value: 'today', label: 'Today' },
        { value: 'yesterday', label: 'Yesterday' },
        { value: 'last7days', label: 'Last 7 days' },
        { value: 'last30days', label: 'Last 30 days' },
        { value: 'monthToDate', label: 'Month to date' },
        { value: 'quarterToDate', label: 'Quarter to date' },
        { value: 'yearToDate', label: 'Year to date' },
    ];
    const onclickHandler = (value) => {
        console.log(value,"")
        setDateType(value);
        keyTypeHandler(value);
    }
    return (
        <div className="date-range-picker">
            <div className="date-range-options">
                {options.map((option) => (
                    <div onClick={() => onclickHandler(option.value)} key={option.value}
                        className={`${dateType === option.value ? 'active' : ''} option`}>
                        {option.label}
                    </div>
                ))}
            </div>

            <div className="selected-date-range">
                {dateType === "custom" &&
                    <div className="date-range-report">
                        <div className="start-report-date custom_date">
                            <label htmlFor="start-date">Start Date:</label>
                            <input onChange={changeStartDate} type="date" />
                        </div>
                        <div className="end-report-date custom_date">
                            <label htmlFor="end-date">End Date:</label>
                            <input onChange={changeEndDate} type="date" />
                        </div>
                    </div>
                }
                <div className="btns-reports">
                    <button type="submit" onClick={generteFile} className="apply-btn">Apply</button>
                    <button onClick={clearDaes} className="clear-btn" >Clear</button>
                </div>
            </div>
        </div>
    );
};

export default CustomDatePicker;