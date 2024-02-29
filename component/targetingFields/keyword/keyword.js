import KeywordPopup from '@/component/keywordspopup';
import React from 'react';

function KeywordField({ keyword, handleKeyword, className, data }) {
  if (!keyword) {
    return null;
  }
  return (
    <div className={className}>
      <label htmlFor="keyword">Keyword</label>
      <input type="text" id="keyword" name="keyword" placeholder="Keyword" />
      <KeywordPopup isEdit={true} dataSelected={keyword} onApply={handleKeyword} />
    </div>
  );
}

export default KeywordField;
