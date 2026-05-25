import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import ShowProductModal from './ShowProductModal'
import EditProductModal from './EditProductModal'
import DeleteProductModal from './DeleteProductModal'
import { axiosClients } from '../../Apis/api'
import ProductVariantModal from './ProductVariantModal'
import AddProductModal from './AddProduct'

function AllProductTable() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [variantModal, setVariantModalModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [zoomModal, setZoomModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(10)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllProduct')
      setData(response?.data?.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = datas?.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(datas.length / productsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handlePageSelect = (page) => setCurrentPage(page)

  const toggleModal = () => setModal(!modal)
  const toggleEditModal = () => setEditToggleModal(!editToggleModal)
  const toggleDeleteModal = () => setDeleteModal(!deleteModal)
  const toggleVariantModal = () => setVariantModalModal(!variantModal)
  const toggleZoomModal = () => setZoomModal(!zoomModal)

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    toggleModal()
  }

  const handleEditModal = (product) => {
    setSelectedProduct(product)
    toggleEditModal()
  }

  const handleDeleteModal = (product) => {
    setSelectedProduct(product)
    toggleDeleteModal()
  }

  const handleVariantModal = (product) => {
    setSelectedProduct(product)
    toggleVariantModal()
  }

  const handleImageClick = (images) => {
    setSelectedProduct((prev) => ({ ...prev, product_images: images }))
    setSelectedImageIndex(0)
    toggleZoomModal()
  }

  const prevImage = () => {
    if (selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1)
  }

  const nextImage = () => {
    if (selectedProduct && selectedImageIndex < selectedProduct.product_images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Products List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <button className="btn btn-dashed" onClick={() => setAddModal(!addModal)} >
                        Add Product
                      </button>
                    </li>
                  </ul>
                </div>

              </div>
              <div className="table-responsive">
                <table className="table category-table dataTable no-footer">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>SKU</th>
                      <th>Status</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts?.map((product, i) => {
                      let images = [];
                      try {
                        const imgData = product.image_url || product.product_image;
                        images = imgData ? JSON.parse(imgData) : [];
                        if (!Array.isArray(images)) images = [imgData];
                      } catch (e) {
                         images = [product.image_url || product.product_image];
                      }
                      
                      const displayImage = images?.length > 0 ? images[0] : '';

                      return (
                        <tr key={i}>
                          <td>{indexOfFirstProduct + i + 1}</td>
                          <td>
                            <img
                              src={displayImage}
                              alt={product.product_name}
                              style={{
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleImageClick(images)}
                            />
                          </td>
                          <td>{product.variant_name || product.product_name}</td>
                          <td>{product.variant_price || product.product_price}</td>
                          <td>{product.sku}</td>
                          <td>
                            <span className={`badge ${product.is_show === 'Y' ? 'bg-success' :
                              product.is_show === 'N' ? 'bg-danger' :
                                'bg-secondary'
                              }`}>
                              {product.is_show === 'Y' ? 'Active' : 'Inactive'}
                            </span>
                          </td>

                          <td>
                            <ul className="d-flex gap-3">
                              <li onClick={() => handleViewProduct(product)}>
                                <a className="text-warning">
                                  <i className="ri-eye-line"></i>
                                </a>
                              </li>
                              <li onClick={() => handleEditModal(product)}>
                                <a>
                                  <i className="ri-pencil-line text-success"></i>
                                </a>
                              </li>
                              <li onClick={() => handleDeleteModal(product)}>
                                <a>
                                  <i className="ri-delete-bin-line text-danger"></i>
                                </a>
                              </li>

                              <li onClick={() => handleVariantModal(product)}>
                                <a>
                                  <i className="ri-palette-line text-primary"></i>
                                </a>
                              </li>
                            </ul>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end mt-4">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPages)].map((_, idx) => {
                    if (idx < 6) {
                      return (
                        <li
                          key={idx}
                          className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                        >
                          <button className="page-link" onClick={() => handlePageSelect(idx + 1)}>
                            {idx + 1}
                          </button>
                        </li>
                      )
                    }
                    if (idx === 6) {
                      return (
                        <li key={idx} className="page-item">
                          <span className="page-link">+</span>
                        </li>
                      )
                    }
                    return null // Don't render anything beyond the 6th page
                  })}
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {
        addModal && <AddProductModal show={addModal} handleClose={() => setAddModal(!addModal)} onSave={fetchData} />
      }
      {selectedProduct && (
        <>
          {modal && <ShowProductModal modal={modal} toggle={toggleModal} data={selectedProduct} />}
          {editToggleModal && <EditProductModal
            modal={editToggleModal}
            toggle={toggleEditModal}
            data={selectedProduct}
            onSave={fetchData}
          />}
          <ProductVariantModal
            show={variantModal}
            handleClose={toggleVariantModal}
            product={selectedProduct}

          />
          <DeleteProductModal
            modal={deleteModal}
            toggle={toggleDeleteModal}
            data={selectedProduct}
            onSave={fetchData}
          />
        </>
      )}
      {selectedProduct && selectedProduct.product_images && (
        <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
          <ModalBody>
            <img
              src={selectedProduct.product_images[selectedImageIndex]}
              alt="Zoomed"
              style={{ width: '100%', height: 'auto' }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={prevImage} disabled={selectedImageIndex === 0}>
              Prev
            </Button>
            <Button
              color="primary"
              onClick={nextImage}
              disabled={selectedImageIndex === selectedProduct.product_images.length - 1}
            >
              Next
            </Button>
            <Button color="secondary" onClick={toggleZoomModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default AllProductTable
