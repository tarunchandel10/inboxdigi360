import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import FormCss from '../styles/form.module.css';

const AgeRange = ({ min, max, rangeValue, type, onChange ,minimumVal,maximumVal}) => {
  // const min = 15;
  // const max = 65;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const [data, setData] = useState("");
  const [isUpdateMin, setIsUpdateMin] = useState(false);
  const [isUpdateMax, setIsUpdateMax] = useState(false);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  
  useEffect(()=>{

    if(minimumVal !== ""){
      setMinVal(minimumVal)
      setMaxVal(maximumVal)
      setIsUpdateMin(true)
      setIsUpdateMax(true)
    }
   
  },[minimumVal,maximumVal])
  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }


  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);
  
  useEffect(() => {
      let val = "";
      if (type === "age") {
        val = `${minVal}-${maxVal}`;
      }
      if(isUpdateMin && isUpdateMax){
        if (type === "income" ) {
          val = `${minVal}-${maxVal}`;
        }
      } else{
        if (type === "income" ) {
          if (minVal === 10  ) {
            val = `${minVal}-${maxVal + 10}`;
          } else {
            if(isUpdateMin){
              val = `${minVal}-${maxVal + 10}`;
            }
            else{
              val = `${minVal - 9}-${maxVal + 10}`;
            }
            
          }
        }
      }
      
  
      setData(val);
      onChange({ type, data: val }); // Pass type and data to the parent onChange
     // Pass type and data to the parent onChange
  }, [minVal, maxVal, type, onChange ,minimumVal, maximumVal]);
  return (
    <div className={`${FormCss.age_range}`}>
      <div className={`${FormCss.range_slider} rangeSlider`}>
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 10);
            setMinVal(value);
            minValRef.current = value;
            setIsUpdateMin(false)
          }}
          className={`${FormCss.thumb}`}
          style={{ zIndex: minVal > max - 100 && "5" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={maxVal}
          onChange={(event) => {
            const newMinVal = Number(minVal) + 10; // Convert minVal to a number and add 10
            const value = Math.max(Number(event.target.value), newMinVal);
            setMaxVal(value);
            setIsUpdateMax(false)
            maxValRef.current = value;
          }}
          className={`${FormCss.thumb}`}
        />
        <div className={`${FormCss.slider}`} >
          <div className={`${FormCss.slider__track}`} />
          <div ref={range} className={`${FormCss.slider__range} sliderBlueBar`} />
        </div>
      </div>
      <div className={`${FormCss.slider_numbering}`} >
        <ul>
          {rangeValue.map((item, index) => (
            <li key={index}>
              <p>
                {type === "age" && index === rangeValue.length - 1 ? `${item}+` : item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className={`${FormCss.slider_value}`} >
      <p>
    {type === "income" ? "Income" : "Ages"} {type === "age" && maxVal === 65 ? `${data}+` : data}
  </p>

        {/* <div className={`${FormCss.slider__left_value}`}>{minVal}</div>
        <p>-</p>
        <div className={`${FormCss.slider__right_value}`}>{maxVal}</div> */}
      </div>
    </div>
  );
};

AgeRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AgeRange;