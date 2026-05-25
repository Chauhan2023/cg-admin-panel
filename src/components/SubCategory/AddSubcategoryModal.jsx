import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { apiGet } from '../../Api/apiMethods';
import { axiosClients } from '../../Apis/api';

const AddSubcategoryModal = ({ show, handleClose, onSave }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');

  const [subcategoryImage, setSubcategoryImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await apiGet('/getActiveCategories');
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSubcategoryImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('subcategoryName', subcategoryName);
    formData.append('description', description);
    formData.append('status', status);

    formData.append('categoryId', categoryId);
    if (subcategoryImage) {
      formData.append('subCategoryImg', subcategoryImage);
    }

    setLoading(true);

    try {
      const response = await axiosClients.post('/createSubcategory', formData);
      toast.success('Subcategory added successfully.');
      handleClose();
      onSave();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add subcategory. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Subcategory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Subcategory Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subcategory name"
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Category Name</Form.Label>
                <Form.Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {data.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>


          <Row className="mt-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Subcategory Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            'Add Subcategory'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddSubcategoryModal;
