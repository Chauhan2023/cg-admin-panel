import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import TrackingModalView from './TrackingModalView';
import { axiosClients } from '../../Apis/api';
import { formatDate } from '../../utils/formatDate'

const ViewOrderModal = ({ modal, toggle, data }) => {
  const [trackingData, setTrackingData] = useState(null);
  const [trackingModal, setTrackingModal] = useState(false);
  const products = JSON.parse(data.product);
  

  const fetchTrackingDetails = async (orderId) => {
    try {
      const response = await axiosClients.get(`/trackingByOrderId/${orderId}`);
      setTrackingData(response.data.tracking);
    } catch (error) {
      console.error('Error fetching tracking details:', error);
    }
  };

  const handleTrackingModal = async () => {
    await fetchTrackingDetails(data.order_id);
    setTrackingModal(true);
  };

  const closeTrackingModal = () => {
    setTrackingModal(false);
  };

  return (
    <>
      <Modal show={modal} onHide={toggle} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Order Details - ID: {data.order_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-3">
            <Card.Header>Customer Information</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Name:</strong> {data.first_name} {data.last_name}</ListGroup.Item>
              <ListGroup.Item><strong>Phone:</strong> {data.user_number}</ListGroup.Item>
              <ListGroup.Item><strong>Payment Mode:</strong> {data.payment_mode}</ListGroup.Item>
              <ListGroup.Item><strong>Address Type:</strong> {data.address_type}</ListGroup.Item>
              <ListGroup.Item>
                <strong>Delivery Address:</strong><br />
                {data.address_line1}, {data.address_line2}, {data.city}, {data.state}, {data.postal_code}
              </ListGroup.Item>
              <ListGroup.Item><strong>Order Date:</strong> {formatDate(data.created_at)}</ListGroup.Item>
            </ListGroup>
          </Card>

          <h5>Products</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr key={index}>
                  <td>
                    {product.item.product_image && (
                      <img src={JSON.parse(product.item.product_image)[0]} alt={product.item.product_name} style={{ width: '50px', height: '50px' }} />
                    )}
                  </td>
                  <td>{product.item.product_name}</td>
                  <td>{product.item.price}</td>
                  <td>{product.item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={handleTrackingModal}>
            Tracking
          </Button>
        </Modal.Footer>
      </Modal>

      {trackingData && (
        <TrackingModalView
          trackingModal={trackingModal} 
          closeTrackingModal={closeTrackingModal} 
          trackingData={trackingData} 
        />
      )}
    </>
  );
};

export default ViewOrderModal;
