import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClients } from '../../Apis/api';
import { apiGet } from '../../Api/apiMethods';
import { IoIosRefresh } from "react-icons/io";

const AddProductModal = ({ show, handleClose }) => {
  const [data, setData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    productPrice: '',
    stockQuantity: '',
    discountPercentage: '',
    categoryId: '',
    subcategoryId: '',
    discountPrice: '',
    sku: '',
    tags: '',
    height: '',
    width: '',
    weight: '',
    length: '',
    status: 'active',
    images: [],
    fittedImage: null,
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await apiGet('/getActiveCategories');
      setData(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    try {
      const response = await apiGet(`/getSubcategoryByCategoryId/${categoryId}`);
      setSubCategoryData(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    fetchSubcategories(value);
    handleChange(e);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let updatedValue = type === 'checkbox' ? checked : type === 'file' ? files : value;

    setFormData((prev) => {
      const updatedForm = {
        ...prev,
        [name]: updatedValue,
      };

      // Auto-calculate discountPrice when price or discountPercentage changes
      if (name === 'productPrice' || name === 'discountPercentage') {
        const price = parseFloat(name === 'productPrice' ? value : prev.productPrice);
        const discount = parseFloat(name === 'discountPercentage' ? value : prev.discountPercentage);

        if (!isNaN(price) && !isNaN(discount)) {
          const discountAmount = (price * discount) / 100;
          updatedForm.discountPrice = (price - discountAmount).toFixed(2);
        } else {
          updatedForm.discountPrice = '';
        }
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();
    for (const key in formData) {
      if (key === 'images' && formData[key] instanceof FileList) {
        for (const file of formData[key]) {
          data.append('images', file);
        }
      } else if (key === 'fittedImage' && formData[key] instanceof FileList && formData[key].length > 0) {
        data.append('fittedImage', formData[key][0]);
      } else if (key !== 'images' && key !== 'fittedImage') {
        data.append(key, typeof formData[key] === 'boolean' ? (formData[key] ? 1 : 0) : formData[key]);
      }
    }


    console.log(data)


    try {
      await axiosClients.post('/addProduct', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Product added successfully.');
      navigate('/product');
      handleClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error:', error);
      toast.error('Product not added!');
    } finally {
      setIsLoading(false);
    }
  };

  const generateUniqueProductCode = () => {
    const randomTenDigit = Math.floor(1000000000 + Math.random() * 9000000000); // ensures 10 digits
    return `DG-P-${randomTenDigit}`;
  };

  function refreshCode() {
    const uniqueSKU = generateUniqueProductCode();
    setFormData((prev) => ({
      ...prev,
      sku: uniqueSKU,
    }));
  }

  useEffect(() => {
    const uniqueSKU = generateUniqueProductCode();
    setFormData((prev) => ({
      ...prev,
      sku: uniqueSKU,
    }));
  }, []);

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <div className="container-fluid px-0">
            {/* Product Information */}
            <div className="card mb-3 border-0 shadow-sm">
              <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-primary">Product Information</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-12">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Product Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control type="text" name="productName" placeholder="Enter product name" value={formData.productName} onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Category <span className="text-danger">*</span></Form.Label>
                      <Form.Select name="categoryId" value={formData.categoryId} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {data.length > 0 && data.map((cat) => (
                          <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Subcategory</Form.Label>
                      <Form.Select name="subcategoryId" value={formData.subcategoryId} onChange={handleChange} disabled={!formData.categoryId}>
                        <option value="">Select Subcategory</option>
                        {subCategoryData.length > 0 && subCategoryData.map((sub) => (
                          <option key={sub.subcategory_id} value={sub.subcategory_id}>{sub.subcategory_name}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-12">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Tags</Form.Label>
                      <Form.Control type="text" name="tags" placeholder="e.g. fashion, electronics" value={formData.tags} onChange={handleChange} />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Inventory */}
            <div className="row g-3 mb-3">
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                    <h6 className="mb-0 fw-bold text-primary">Pricing</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-12">
                        <Form.Group>
                          <Form.Label className="small text-muted mb-1">Price <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="number" name="productPrice" placeholder="0.00" value={formData.productPrice} onChange={handleChange} />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label className="small text-muted mb-1">Discount %</Form.Label>
                          <Form.Control type="number" name="discountPercentage" placeholder="0" value={formData.discountPercentage} onChange={handleChange} />
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group>
                          <Form.Label className="small text-muted mb-1">Discount Price</Form.Label>
                          <Form.Control type="number" name="discountPrice" placeholder="0.00" value={formData.discountPrice} onChange={handleChange} disabled className="bg-light" />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                    <h6 className="mb-0 fw-bold text-primary">Inventory</h6>
                  </div>
                  <div className="card-body">
                    <div className="row g-3">
                      <div className="col-md-12">
                        <Form.Group>
                          <Form.Label className="small text-muted mb-1">Stock Quantity <span className="text-danger">*</span></Form.Label>
                          <Form.Control type="number" name="stockQuantity" placeholder="0" value={formData.stockQuantity} onChange={handleChange} />
                        </Form.Group>
                      </div>
                      <div className="col-md-12">
                        <Form.Group>
                          <Form.Label className="small text-muted mb-1">SKU <span className="text-danger">*</span></Form.Label>
                          <div className="input-group">
                            <Form.Control type="text" name="sku" placeholder="SKU" value={formData.sku} disabled className="bg-light" />
                            <Button variant="outline-primary" type="button" onClick={refreshCode}>
                              <IoIosRefresh />
                            </Button>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Details */}
            <div className="card mb-3 border-0 shadow-sm">
              <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-primary">Dimensions & Customization</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-3">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Physical Height (cm)</Form.Label>
                      <Form.Control type="number" name="height" placeholder="0" value={formData.height} onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div className="col-md-3">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Physical Width (cm)</Form.Label>
                      <Form.Control type="number" name="width" placeholder="0" value={formData.width} onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div className="col-md-3">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Physical Length (cm)</Form.Label>
                      <Form.Control type="number" name="length" placeholder="0" value={formData.length} onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div className="col-md-3">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Weight (gram)</Form.Label>
                      <Form.Control type="number" name="weight" placeholder="0" value={formData.weight} onChange={handleChange} />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Media */}
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-white border-bottom-0 pt-3 pb-0">
                <h6 className="mb-0 fw-bold text-primary">Media & Description</h6>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Product Description</Form.Label>
                      <Form.Control as="textarea" name="description" rows="4" placeholder="Enter detailed product description..." value={formData.description} onChange={handleChange} />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Product Images (Max 7)</Form.Label>
                      <Form.Control type="file" name="images" multiple onChange={handleChange} className="form-control-lg bg-light" />
                    </Form.Group>
                  </div>
                  <div className="col-12">
                    <Form.Group>
                      <Form.Label className="small text-muted mb-1">Fitted Image (Max 1)</Form.Label>
                      <Form.Control type="file" name="fittedImage" onChange={handleChange} className="form-control-lg bg-light" />
                    </Form.Group>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Submit Product'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddProductModal;