import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import FormCss from '../styles/form.module.css';

const AgeRange = ({ onChange }) => {

  const min = 15;
  const max = 65;

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

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

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className={`${FormCss.age_range}`}>
      <div className={`${FormCss.range_slider}`}>
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;
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
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={`${FormCss.thumb}`}
        />

        <div className={`${FormCss.slider}`} >
          <div className={`${FormCss.slider__track}`} />
          <div ref={range} className={`${FormCss.slider__range}`} />
        </div>
      </div>

      <div className={`${FormCss.slider_numbering}`} >
        <ul>
          <li><p>15</p></li>
          <li><p>25</p></li>
          <li><p>35</p></li>
          <li><p>45</p></li>
          <li><p>55</p></li>
          <li><p>65</p></li>
        </ul>
      </div>

      <div className={`${FormCss.slider_value}`} >
        <p>Ages</p>
        <div className={`${FormCss.slider__left_value}`}>{minVal}</div>
        <p> </p>
        <div className={`${FormCss.slider__right_value}`}>{maxVal}</div>
      </div>
    </div>
  );
};

AgeRange.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default AgeRange;
