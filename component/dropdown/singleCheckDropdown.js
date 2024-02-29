import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SingleCheckDropdown({ title, className, value, name, id, dropdownitem }) {
  const [checkedId, setCheckedId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (id) => {
    setCheckedId(id === checkedId ? null : id);
  };

  const filteredItems = dropdownitem.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownButton
      key="start"
      drop="bottom"
      variant="bg-transparent remove_drop_icon"
      title={title}
      className={className}
      autoClose="outside"
    >
      <input
        type="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredItems.map((item, index) => (
        <div key={index} className="dropdown-item">
          <input
            type="checkbox"
            id={item.id}
            checked={item.id === checkedId}
            onChange={() => handleCheckboxChange(item.id)}
          />
          <label htmlFor={item.id} className="cr">
            {item.name}
          </label>
        </div>
      ))}
    </DropdownButton>
  );
}

export default SingleCheckDropdown;
