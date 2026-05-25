import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';
import { apiGet } from '../../Api/apiMethods';

const initialState = {
  subcategoryName: '',
  description: '',
  status: '',

  image: null,
  categoryId: '',
};

const SubcategoryEditModal = ({ show, handleClose, data, onSave }) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [categoryData, setCategoryData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await apiGet('/getActiveCategories');
      setCategoryData(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    if (data) {
      setFormData({
        subcategoryName: data.subcategory_name || '',
        description: data.description || '',
        status: data.subcategory_status || '',

        image: null,
        categoryId: data.category_id || '',
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append('subcategoryId', data.subcategory_id);
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image' && value) {
          form.append('subCategoryImg', value);
        } else if (key !== 'image') {
          form.append(key, value);
        }
      });

      await axiosClients.put('/updateSubcategoryById', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Subcategory updated successfully.');
      handleClose();
      onSave();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update subcategory.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Subcategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group controlId="subcategoryName">
                <Form.Label>Subcategory Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter subcategory name"
                  name="subcategoryName"
                  value={formData.subcategoryName}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>

          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="image">
                <Form.Label>Subcategory Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleChange} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="categoryId">
                <Form.Label>Category Name</Form.Label>
                <Form.Select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>

                  {categoryData?.map((cat) => (
                    <option key={cat.category_id} value={cat.category_id}>
                      {cat.category_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SubcategoryEditModal;
