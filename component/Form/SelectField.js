import React from "react";

const SelectField = ({ name, value, setValue, options, type,className ,placholder}) => {
  return (
    <>
      {type === "obj" ? <div className="create-form-feild">
        <select name={name} value={value} onChange={setValue} className={className}>
          <option selected disabled value={''}>{placholder !== undefined ? placholder : 'Please Select A Value'}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>{option.name}</option>
          ))}
        </select>
      </div>
        :
        <div className="create-form-feild">
          <select name={name} value={value} onChange={setValue} className={className}>
          <option selected disabled value={''}>{placholder !== undefined ? placholder : 'Please Select A Value'}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>
      }
    </>

  );
}
export default SelectField;
