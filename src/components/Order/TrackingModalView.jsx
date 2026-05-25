import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { axiosClients } from '../../Apis/api';
import { formatDate } from '../../utils/formatDate';

const TrackingModal = ({ trackingModal, closeTrackingModal, trackingData }) => {
  const [status, setStatus] = useState(trackingData.status);
  const [location, setLocation] = useState(trackingData.location);

  const handleUpdate = async () => {
    const updatedTracking = {
      status,
      location,
    };
    
    try {
      await axiosClients.put(`/trackingById/${trackingData.tracking_id}`, updatedTracking);
      alert('Tracking information updated successfully.');
      closeTrackingModal();
    } catch (error) {
      console.error('Error updating tracking:', error);
    }
  };

  return (
    <Modal show={trackingModal} onHide={closeTrackingModal} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Tracking Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Order Confirmed">Order Confirmed</option>
                  <option value="Order Placed">Order Placed</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                  type="text" 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)} 
                  placeholder="Enter location" 
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Tracking Information</Card.Title>
            <Card.Text>
              <strong>Status:</strong> {trackingData.tracking_status}<br />
              <strong>Current Location:</strong> {trackingData.location}<br />
              <strong>Tracking ID:</strong> {trackingData.tracking_id}<br />
              <strong>Order ID:</strong> {trackingData.order_id}<br />
              <strong>Last Updated:</strong> {formatDate(trackingData.updated_at).toLocaleString()}
            </Card.Text>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Delivery Address</Card.Title>
            <Card.Text>
              <strong>Name:</strong> {trackingData.first_name} {trackingData.last_name}<br />
              <strong>Phone:</strong> {trackingData.user_number}<br />
              <strong>Address:</strong> {trackingData.address_line1}, {trackingData.address_line2}, {trackingData.city}<br />
              <strong>State:</strong> {trackingData.state}<br />
              <strong>Postal Code:</strong> {trackingData.postal_code}
            </Card.Text>
          </Card.Body>
        </Card>
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
