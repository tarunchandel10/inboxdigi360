import React from 'react'

export default function CustomToggle({status ,onChange ,name}) {
  
  return (
    <div><input defaultChecked={status} onChange={onChange} type="checkbox" id={name} name={name}  className="switch-button"/><label for={name}>Toggle</label></div>
  )
}
