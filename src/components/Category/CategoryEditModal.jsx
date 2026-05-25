import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { apiGet } from '../../Api/apiMethods';
import { axiosClients } from '../../Apis/api';
import { slugify } from '../../utils/formatDate';

const CategoryEditModal = ({ show, handleClose, data, onSave }) => {
  const [categoryName, setCategoryName] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [slotImg, setSlotImg] = useState(null);
  const [description, setDescription] = useState('');
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fittedImageHeight, setFittedImageHeight] = useState(0);
  const [fittedImageWidth, setFittedImageWidth] = useState(0);

  const [mainCategories, setMainCategories] = useState([]); // State for main categories
  const [selectedMainCategory, setSelectedMainCategory] = useState(''); // State for selected main category
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setCategoryName(data.category_name || '');
      setSlug(data.slug || '');
      setStatus(data.status || '');
      setDescription(data.category_desc || '');
      setHeight(data.category_height || 0);
      setWidth(data.category_width || 0);
      setFittedImageHeight(data.fitted_image_height || 0);
      setFittedImageWidth(data.fitted_image_width || 0);

      setImage(data.category_url || '');
      setSlotImg(data.slot_img_url || ''); // Assuming slot_img_url is the field for slot image URL
      setSelectedMainCategory(data.main_category_id || '');
    }
  }, [data]);

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await apiGet('/getActiveMainCategories');
        setMainCategories(response.data);
      } catch (error) {
        console.error('Error fetching main categories:', error);
        toast.error('Failed to fetch main categories');
      }
    };

    fetchMainCategories();
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSlotFileChange = (e) => {
    setSlotImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('slug', slugify(slug));
    formData.append('status', status);
    formData.append('categoryDesc', description);
    formData.append('categoryHeight', height);
    formData.append('categoryWidth', width);
    formData.append('fittedImageHeight', fittedImageHeight);
    formData.append('fittedImageWidth', fittedImageWidth);
    formData.append('mainCategoryId', selectedMainCategory);


    if (image) {
      formData.append('categoryImage', image);
    } else if (typeof image === 'string') {
      formData.append('categoryImageURL', image);
    }

    if (slotImg) {
      formData.append('slotImg', slotImg);
    } else if (typeof slotImg === 'string') {
      formData.append('slotImgURL', slotImg);
    }

    try {
      await axiosClients.put(`/updateCategoryById/${data.category_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Category updated successfully.');
      onSave();
      handleClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Category not updated, there was a problem!', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCategoryImage">
            <div className="d-flex justify-content-center mb-3">
              {image && (
                <img
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt="Category"
                  className="img-fluid"
                  style={{ maxHeight: '200px', maxWidth: '200px' }}
                />
              )}
            </div>
            <Form.Label className='mb-0'>Category Image</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>

          <Form.Group controlId="formCategorySlotImage">
            <div className="d-flex justify-content-center mb-3">
              {slotImg && (
                <img
                  src={typeof slotImg === 'string' ? slotImg : URL.createObjectURL(slotImg)}
                  alt="Slot"
                  className="img-fluid"
                  style={{ maxHeight: '200px', maxWidth: '200px' }}
                />
              )}
            </div>
            <Form.Label className='mb-0'>Slot Image</Form.Label>
            <Form.Control type="file" onChange={handleSlotFileChange} />
          </Form.Group>

          <Form.Group controlId="formCategoryName">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formSlug">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formMainCategory">
            <Form.Label>Main Category</Form.Label>
            <Form.Control
              as="select"
              value={selectedMainCategory}
              onChange={(e) => setSelectedMainCategory(e.target.value)}
            >
              <option value="">Select main category</option>
              {mainCategories.map((mainCategory) => (
                <option key={mainCategory.main_category_id} value={mainCategory.main_category_id}>
                  {mainCategory.main_category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Row>

            <Col md={6}>
              <Form.Group controlId="height">
                <Form.Label>Inner Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Height"
                  name="height"
                  value={height}
                  min={0}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="width">
                <Form.Label>Inner Width</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Width"
                  name="width"
                  value={width}
                  min={0}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <Form.Group controlId="fittedImageHeight">
                <Form.Label>Fitted Image Height</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Fitted Image Height"
                  name="fittedImageHeight"
                  value={fittedImageHeight}
                  min={0}
                  onChange={(e) => setFittedImageHeight(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="fittedImageWidth">
                <Form.Label>Fitted Image Width</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Fitted Image Width"
                  name="fittedImageWidth"
                  value={fittedImageWidth}
                  min={0}
                  onChange={(e) => setFittedImageWidth(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>



          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? 'Save Changes...' : 'Save Changes'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryEditModal;