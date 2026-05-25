import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import toast from 'react-hot-toast'
import { axiosClients } from '../../Apis/api'
import { apiGet } from '../../Api/apiMethods'
import { Form } from 'react-bootstrap'

function EditProductModal({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    description: '',
    productPrice: null,
    stockQuantity: '',
    discountPercentage: null,
    categoryId: '',
    subcategoryId: '',
    status: 'inactive',
    discountPrice: null,
    sku: '',
    tags: '',
    height: '',
    width: '',
    length: '',
    weight: '',
    images: [],
    fittedImage: null,
  })

  const [categoryData, setCategoryData] = useState([])
  const [subCategoryData, setSubCategoryData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (data) {
      setFormData({
        productId: data.product_id || '',
        productName: data.product_name || '',
        description: data.description || '',
        productPrice: data.variant_price || data.product_price || '',
        stockQuantity: data.stock || data.stock_quantity || '',
        discountPercentage: data.discount_percentage || '',
        categoryId: data.category_id || '',
        subcategoryId: data.subcategory_id || '',
        discountPrice: data.discount_price || '',
        sku: data.sku || '',
        status: data.status || '',
        tags: data.tags || '',
        height: data.height || '',
        width: data.width || '',
        length: data.length || '',
        weight: data.weight || '',
        images: [],
        fittedImage: null,
        variantId: data?.product_variant_id || '',

      })

      // Fetch subcategories for the selected category on modal open
      if (data.category_id) {
        fetchSubcategories(data.category_id)
      }
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    let newValue = type === 'checkbox' ? checked : type === 'file' ? files : value;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: newValue,
      };

      // Auto-calculate discount price
      const price = parseFloat(name === 'productPrice' ? newValue : prev.productPrice) || 0;
      const discountPercentage = parseFloat(name === 'discountPercentage' ? newValue : prev.discountPercentage) || 0;

      updated.discountPrice = (price - (price * discountPercentage) / 100).toFixed(2);

      return updated;
    });
  };


  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === 'fittedImage') {
      setFormData((prev) => ({ ...prev, fittedImage: files[0] }));
    } else if (name === 'images') {
      const selectedFiles = Array.from(files).slice(0, 7); // Max 7 images
      setFormData((prev) => ({ ...prev, images: selectedFiles }));
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await apiGet('/getAllCategories')
      setCategoryData(response.data)
      onSave()
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchSubcategories = async (category_id) => {
    try {
      const response = await apiGet(`/getSubcategoryByCategoryId/${category_id}`)
      setSubCategoryData(response.data || []) // Ensure fallback for empty data
    } catch (error) {
      console.error('Error fetching subcategories:', error)
    }
  }

  // Fetch categories on component load
  useEffect(() => {
    fetchCategories()
  }, [])

  const handleCategoryChange = (e) => {
    const { value } = e.target
    setFormData((prev) => ({
      ...prev,
      categoryId: value,
    }))
    setSubCategoryData([]) // Clear existing subcategories
    fetchSubcategories(value) // Fetch subcategories for the selected category
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Create FormData object for file upload
    const dataToSend = new FormData()
    for (const key in formData) {
      if (key === 'images' && formData[key].length > 0) {
        for (const file of formData[key]) {
          dataToSend.append('images', file)
        }
      } else if (key === 'fittedImage' && formData[key]) {
        dataToSend.append('fittedImage', formData[key])
      } else if (key !== 'images' && key !== 'fittedImage') {
        // Convert boolean to 1 or 0 before appending
        if (typeof formData[key] === 'boolean') {
          dataToSend.append(key, formData[key] ? 1 : 0)
        } else {
          dataToSend.append(key, formData[key])
        }
      }
    }

    try {
      await axiosClients.post(`/addProduct`, dataToSend)
      toggle()
    } catch (error) {
      console.error('Failed to update product:', error)
    } finally {
      setIsLoading(false)
    }

    toast.success('Product update successfully.')
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Product Update</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Product Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="input-items">
                        <div className="row gy-3">
                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>Product Name</h6>
                              <input
                                type="text"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>Category</h6>
                              <select
                                name="categoryId"
                                className="w-100"
                                value={formData.categoryId}
                                onChange={handleCategoryChange}
                              >
                                <option value="" disabled>
                                  Select Category
                                </option>
                                {categoryData?.map((item) => (
                                  <option key={item.category_id} value={item.category_id}>
                                    {item.category_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>Sub Category</h6>
                              <select
                                name="productType"
                                className="w-100"
                                value={formData.subcategoryId || ''}
                                onChange={handleChange}
                              >
                                {
                                  subCategoryData?.length > 0 ? subCategoryData?.map((item) => (
                                    <option key={item.subcategory_id} value={item.subcategory_id}>
                                      {item.subcategory_name}
                                    </option>
                                  )) : <option value="" disabled>No Subcategories found</option>
                                }
                              </select>
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>Status</h6>
                              <select
                                name="status"
                                className='w-100'
                                value={formData.status}
                                onChange={handleChange}

                              >
                                <option value="" disabled>
                                  Select Status
                                </option>
                                {['active', 'inactive']?.map((items) => (
                                  <option key={items} value={items}>
                                    {items}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3">
                    <div className="card-header">
                      <h5>Product Images</h5>
                    </div>
                    <div className="card-body">
                      <div className="input-box">
                        <h6>Images (Max 7)</h6>
                        <input
                          type="file"
                          multiple
                          name="images"
                          onChange={handleFileChange}
                        />
                         {data && data.image_url && (
                            <div className="mt-3 d-flex gap-2 flex-wrap">
                                {(() => {
                                    try {
                                        const parsedImages = JSON.parse(data.image_url);
                                        const imgArray = Array.isArray(parsedImages) ? parsedImages : [data.image_url];
                                        return imgArray.map((img, idx) => (
                                            <a key={idx} href={img} target='__blank'>
                                                <img 
                                                    src={img} 
                                                    alt={`product-${idx}`} 
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 5, border: '1px solid #ddd' }} 
                                                />
                                            </a>
                                        ));
                                    } catch (e) {
                                        return (
                                             <a href={data.image_url} target='__blank'>
                                                <img 
                                                    src={data.image_url} 
                                                    alt="product" 
                                                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 5, border: '1px solid #ddd' }} 
                                                />
                                            </a>
                                        );
                                    }
                                })()}
                            </div>
                        )}
                      </div>
                       <div className="input-box mt-4">
                        <h6>Fitted Image (Max 1)</h6>
                        <input
                          type="file"
                          name="fittedImage"
                          onChange={handleFileChange}
                        />
                         {data && data.fitted_image_url && (
                             <div className="mt-3">
                                <a href={data.fitted_image_url} target='__blank'>
                                    <img 
                                        src={data.fitted_image_url} 
                                        alt="fitted-product" 
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: 5, border: '1px solid #ddd' }} 
                                    />
                                </a>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Product Price */}
                  <div className="card mt-3">
                    <div className="card-header">
                      <h5>Product Price</h5>
                    </div>
                    <div className="card-body">
                      <div className="input-box">
                        <h6>
                          Price<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="number"
                          name="price"
                          placeholder="0"
                          value={formData.productPrice}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="input-box mt-4">
                        <h6>
                          Discount Price<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="number"
                          name="discountPrice"
                          placeholder="0"
                          value={formData.discountPrice}
                          onChange={handleChange}
                          disabled

                        />
                      </div>
                      <div className="input-box mt-4">
                        <h6>
                          Discount Percentage<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="number"
                          name="discountPercentage"
                          placeholder="0"
                          value={formData.discountPercentage}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Inventory */}
                  <div className="card mt-3">
                    <div className="card-header">
                      <h5>Product Inventory</h5>
                    </div>
                    <div className="card-body">
                      <div className="input-items">
                        <div className="row gy-3">
                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>
                                Stock Quantity <span className="text-danger">*</span>
                              </h6>
                              <input
                                type="number"
                                name="stockQuantity"
                                value={formData.stockQuantity}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>
                                SKU<span className="text-danger">*</span>
                              </h6>
                              <input
                                type="text"
                                name="sku"
                                value={formData.sku}
                                disabled
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-6">
                            <div className="input-box">
                              <h6>
                                Tags<span className="text-danger">*</span>
                              </h6>
                              <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3">
                    <div className="card-header">
                      <h5>Dimensions & Customization</h5>
                    </div>
                    <div className="card-body">
                      <div className="input-items">
                        <div className="row gy-3">
                          <div className="col-xl-3">
                            <div className="input-box">
                              <h6>Physical Height (cm)</h6>
                              <input
                                type="number"
                                name="height"
                                placeholder="0"
                                value={formData.height}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="input-box">
                              <h6>Physical Width (cm)</h6>
                              <input
                                type="number"
                                name="width"
                                placeholder="0"
                                value={formData.width}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="input-box">
                              <h6>Physical Length (cm)</h6>
                              <input
                                type="number"
                                name="length"
                                placeholder="0"
                                value={formData.length}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-xl-3">
                            <div className="input-box">
                              <h6>Weight (gram)</h6>
                              <input
                                type="number"
                                name="weight"
                                placeholder="0"
                                value={formData.weight}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card mt-3">
                    <div className="card-body">
                      <div className="input-box">
                        <h6>
                          Product Description<span className="text-danger">*</span>
                        </h6>
                        <textarea
                          name="description"
                          rows={4}
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Save Changes...' : 'Save Changes'}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditProductModal
