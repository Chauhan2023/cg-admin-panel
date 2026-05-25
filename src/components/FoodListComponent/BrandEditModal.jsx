import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { axiosClient } from '../../Apis/api';

const BrandEditModal = ({ show, handleClose, data }) => {
  const [brandName, setBrandName] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
        setBrandName(data.brand_name || '');
      setStatus(data.status || '');
      
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
        brandName,
        status,
    
    };

    setLoading(true); // Set loading to true when the submission starts

    try {
      const response = await axiosClient.put(
        `/editBrandById/${data.brand_id}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Success:', response.data);
      toast.success('Brand updated successfully!');
      handleClose(); // Close the modal on successful save
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update Brand. Please try again.');
    } finally {
      setLoading(false); // Set loading to false when the submission ends
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Brand</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryName">
            <Form.Label>Brand Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Active</option>
              <option>Inactive</option>
            </Form.Control>
          </Form.Group>

          
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          disabled={loading} // Disable the button when loading
        >
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Save Changes'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BrandEditModal;
