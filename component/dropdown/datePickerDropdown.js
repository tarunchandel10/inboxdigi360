import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import CustomDatePicker from '../datePicker/customDatePicker';

function DatePickerDropdown({ title, className, dropdownitem ,keyTypeHandler,changeStartDate ,changeEndDate ,clearDaes ,generteFile ,setkeyType}) {
  return (
    <DropdownButton
      key="start"
      drop="bottom"
      variant="bg-transparent remove_drop_icon"
      title={title}
      className={className}
      autoClose="outside"
    >
      <div className="dropdown-item">
          <CustomDatePicker keyTypeHandler={keyTypeHandler} changeStartDate={changeStartDate} changeEndDate={changeEndDate} clearDaes={clearDaes} generteFile={generteFile} setkeyType={setkeyType} />
        </div>
    </DropdownButton>
  );
}

export default DatePickerDropdown;