import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

function MultiCheckDropdown({ title, className, value, name, id, dropdownitem ,onclick }) {
  return (
    <DropdownButton
      key="start"
      drop="bottom"
      variant="bg-transparent remove_drop_icon"
      title={title}
      className={className}
      autoClose="outside"
    >
      {dropdownitem.map((item, index) => (
        <div  key={index} className="dropdown-item">
          <input onChange={onclick !== undefined ? (e) =>onclick(item,index):()=>{}} type="checkbox" id={item.id} />
          <label htmlFor={item.id} className="cr">
            {item.name}
          </label>
        </div>
      ))}
    </DropdownButton>
  );
}

export default MultiCheckDropdown;