import ConnectionSpeedPopup from '@/component/connectionspeedpopup';
import React from 'react';

function ConnectionSpeedField({ connectionData, handleSave, className }) {
  if (!connectionData || (connectionData.netspeeds === "" && connectionData.targetBy === "")) {
    return null;
  }

  return (
    <div className={className}>
      <label htmlFor="connectionSpeed">Connection Speed</label>
      <input type="text" id="connectionSpeed" name="connectionSpeed" placeholder="Connection Speed" />
      <ConnectionSpeedPopup onSave={handleSave} isEdit={true} dataSelected={connectionData} />
    </div>
  );
}

export default ConnectionSpeedField;
