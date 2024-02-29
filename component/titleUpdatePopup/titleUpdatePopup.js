// TitleUpdatePopup.js
import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormCss from '../../styles/form.module.css'
import { Baseurl } from '../Baseurl';

function TitleUpdatePopup({ onClose, onSave, data }) {
  const [newTitle, setNewTitle] = useState(data.name);
  console.log(data.id)
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
  const handleSave = () => {
    axios.post(`${Baseurl}update-creative`, {
      id: data.id,
      name: newTitle
    }, { headers })
      .then(response => {
        onSave(newTitle);
        onClose();
      })
      .catch(error => {
        console.error('Error updating title:', error);
      });
  };

  return (
    <div className="popup">
      <Modal
        show={true}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        className={`${FormCss.updatecretive_name} update_name`}
      >
        <Modal.Header className={`${FormCss.modal_header}`}>
          <Modal.Title className={`${FormCss.modal_title}`}>Update Title</Modal.Title>
          <button type="button" className={`${FormCss.cross_btn}`} onClick={onClose}>✕</button>
        </Modal.Header>

        <Modal.Body className={`${FormCss.modal_body}`} alwaysopen>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </Modal.Body>

        <Modal.Footer className={`${FormCss.modal_footer}`}>
          <div className={`${FormCss.feilds_btns}`}>
            <Button type="submit" className={`${FormCss.create_btn}`} onClick={handleSave}>Save</Button>
            <Button className={`${FormCss.cancel_btn}`} onClick={onClose}>Close</Button>
          </div>
        </Modal.Footer>
      </Modal>  
    </div>
  );
}

export default TitleUpdatePopup;
