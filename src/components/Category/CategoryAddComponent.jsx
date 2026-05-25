import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { apiPost, apiGet } from '../../Api/apiMethods'; // Import apiGet
import { Modal, Button, Col, Form, Row } from 'react-bootstrap';
import { slugify } from '../../utils/formatDate';

function CategoryAddComponent({ show, handleClose, fetchData }) {
  const [categoryName, setCategoryName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [files, setFiles] = useState([]);
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fittedImageHeight, setFittedImageHeight] = useState(0);
  const [fittedImageWidth, setFittedImageWidth] = useState(0);
  const [slotImage, setSlotImage] = useState([]); // State for slot image
  const [loading, setLoading] = useState(false);

  const [mainCategories, setMainCategories] = useState([]); // State for main categories
  const [selectedMainCategory, setSelectedMainCategory] = useState(''); // State for selected main category

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const { getRootProps: getSlotRootProps, getInputProps: getSlotInputProps, isDragActive: isSlotDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      setSlotImage(acceptedFiles);
    },
  });

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const response = await apiGet('/getActiveMainCategories');
        setMainCategories(response?.data);
      } catch (error) {
        console.error('Error fetching main categories:', error);
        toast.error('Failed to fetch main categories');
      }
    };

    fetchMainCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('categoryName', categoryName);
    formData.append('categoryDesc', description);
    formData.append('slug', slugify(slug));
    formData.append('status', status);
    formData.append('categoryHeight', height);
    formData.append('categoryWidth', width);
    formData.append('fittedImageHeight', fittedImageHeight);
    formData.append('fittedImageWidth', fittedImageWidth);
    formData.append('mainCategoryId', selectedMainCategory); // Append selected main category


    if (files.length > 0) {
      formData.append('categoryImage', files[0]);
    }

    if (slotImage.length > 0) {
      formData.append('slotImg', slotImage[0]);
    }

    setLoading(true);

    try {
      await apiPost('/createCategory', formData, true);
      toast.success('Category created successfully.');
      fetchData()

      // Reset form
      setCategoryName('');
      setDescription('');
      setStatus('');

      setFiles([]);
      setSlotImage([]);
      setSelectedMainCategory('');
      handleClose(); // Close modal
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Category Name <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Slug (please do not give space  use - ) <span className="text-danger">*</span></label>
              <input
                type="text"
                className="form-control"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="Enter slug name"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Status <span className="text-danger">*</span></label>
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Main Category <span className="text-danger">*</span></label>
              <select
                className="form-select"
                value={selectedMainCategory}
                onChange={(e) => setSelectedMainCategory(e.target.value)}
                required
              >
                <option value="">Select main category</option>
                {mainCategories?.map((mainCategory) => (
                  <option key={mainCategory.main_category_id} value={mainCategory.main_category_id}>
                    {mainCategory.main_category_name}
                  </option>
                ))}
              </select>
            </div>


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



            <div className="col-md-12 mb-3">
              <label className="form-label">Description <span className="text-danger">*</span></label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Upload Image</label>
              <div
                {...getRootProps()}
                className="dropzone border p-3 text-center"
                style={{ cursor: 'pointer' }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the image here...</p>
                ) : (
                  <p>Drag and drop or click to select image</p>
                )}
              </div>
              {files.length > 0 && (
                <p className="mt-2">Selected: {files[0].name}</p>
              )}
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label">Slot Image</label>
              <div
                {...getSlotRootProps()}
                className="dropzone border p-3 text-center"
                style={{ cursor: 'pointer' }}
              >
                <input {...getSlotInputProps()} />
                {isSlotDragActive ? (
                  <p>Drop the slot image here...</p>
                ) : (
                  <p>Drag and drop or click to select slot image</p>
                )}
              </div>
              {slotImage.length > 0 && (
                <p className="mt-2">Selected: {slotImage[0].name}</p>
              )}
            </div>

            <div className="col-12 mt-3 text-end">
              <Button variant="danger" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
export default CategoryAddComponent;