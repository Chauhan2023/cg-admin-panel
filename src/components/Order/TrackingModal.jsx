import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TrackingModal = ({ trackingModal, closeTrackingModal, trackingData, updateTracking }) => {
  const [status, setStatus] = useState(trackingData.status);
  const [location, setLocation] = useState(trackingData.location);

  const handleUpdate = async () => {
    const updatedTracking = {
      status,
      location,
    };
    await updateTracking(trackingData.tracking_id, updatedTracking);
    closeTrackingModal();
  };

  return (
    <Modal show={trackingModal} onHide={closeTrackingModal}>
      <Modal.Header closeButton>
        <Modal.Title>Tracking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h5>Status</h5>
          <input 
            type="text" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
          />
        </div>
        <div>
          <h5>Location</h5>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeTrackingModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TrackingModal;