import React, { useState, useEffect } from 'react'
import { formatDate } from '../../utils/formatDate'
import { apiGet } from '../../Api/apiMethods'
import MainCategoryModal from './MainCategoryModal'
import toast from 'react-hot-toast'
import { axiosClients } from '../../Apis/api'

function MainCategoryListComponent() {
  const [datas, setData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [zoomModal, setZoomModal] = useState(false)
  const [zoomedImageUrl, setZoomedImageUrl] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await apiGet(`/getAllMainCategories`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openModal = (category = {}, editMode = false) => {
    setSelectedCategory(category)
    setIsEditMode(editMode)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedCategory({})
    setIsEditMode(false)
  }

  const deleteToggle = async (category) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      try {
        // Assuming you have a delete API endpoint
        await axiosClients.delete(`/deleteMainCategoryById/${category.main_category_id}`);
        toast.success('Category deleted successfully.');
        fetchData(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category. Please try again.');
      }
    }
  };

  const openZoomModal = (imageUrl) => {
    setZoomedImageUrl(imageUrl)
    setZoomModal(true)
  }

  // Pagination Logic
  const indexOfLastCategory = currentPage * itemsPerPage
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage
  const currentCategories = datas.slice(indexOfFirstCategory, indexOfLastCategory)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Main Category List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <button className="btn btn-dashed" onClick={() => openModal({}, false)}>
                        Add Main Category
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <table className="table table-responsive category-table dataTable no-footer" id="table_id">
                  <thead style={{ background: '#f5f5f5' }}>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Slug</th>
                      <th>Description</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCategories?.map((data, index) => (
                      <tr key={data.category_id}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{data.main_category_name}</td>
                        <td>
                          <a href={data.main_category_img || 'https://via.placeholder.com/50'}>
                            <img
                              src={data.main_category_img || 'https://via.placeholder.com/50'}
                              alt="Category"
                              className="img-fluid"
                              style={{
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                              }}
                            />
                          </a>
                        </td>

                        <td>{data.main_category_slug}</td>
                        <td>{data.main_category_description}</td>
                        <td>{formatDate(data.created_at)}</td>
                        <td>
                          <span className={`badge ${data.is_show === 'Y' ? 'bg-success' : 'bg-danger'}`}>
                            {data.is_show === 'Y' ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <ul>
                            <li onClick={() => openModal(data, true)}>
                              <a><i className="ri-pencil-line" /></a>
                            </li>
                            <li onClick={() => deleteToggle(data)}>
                              <a><i className="ri-delete-bin-line" /></a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end mt-4">
                  <li className="page-item">
                    <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
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
                          <span className="page-link">...</span>
                        </li>
                      )
                    }
                    return null
                  })}
                  <li className="page-item">
                    <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Modal for Add/Edit */}
      <MainCategoryModal
        show={modalVisible}
        handleClose={closeModal}
        data={selectedCategory}
        isEdit={isEditMode}
        onSave={fetchData}
        fetchData={fetchData}
      />
    </div>
  )
}

export default MainCategoryListComponent
