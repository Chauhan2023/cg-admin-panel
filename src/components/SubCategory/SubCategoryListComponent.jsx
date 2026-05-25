import React, { useState, useEffect } from 'react'
import SubcategoryViewModal from './SubcategoryViewModal'
import { Link } from 'react-router-dom'
import DeleteSubcategoryModal from './DeleteSubcategoryModal'
import SubcategoryEditModal from './SubcategoryEditModal'
import { axiosClients } from '../../Apis/api'
import { formatDate, shortenText } from '../../utils/formatDate'
import AddSubcategoryModal from './AddSubcategoryModal'
import { ShortText } from '@mui/icons-material'

function SubCategoryListComponent() {
  const [datas, setData] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState(null)
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [addToggleModal, setAddToggleModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async (isAdmin = 'true') => {
    try {
      const response = await axiosClients.get(`/getAllSubcategory`)
      setData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentSubcategories = datas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  const handleModal = (category) => {
    setSelectedSubcategory(category)
    setModal(true)
  }

  const deleteToggle = (category) => {
    setSelectedSubcategory(category)
    setDeleteModal(true)
    fetchData()
  }

  const handleEditModal = (category) => {
    setSelectedSubcategory(category)
    setEditToggleModal(true)
    fetchData()
  }

  const handleCloseEditModal = () => {
    setEditToggleModal(false)
    fetchData()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body overflow-auto">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Subcategory List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <button className="btn btn-dashed" onClick={() => {
                        setAddToggleModal(!addToggleModal)
                        console.log('Add clicked')
                      }}>
                        Add Subcategory
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead style={{ background: '#f5f5f5 !important' }}>
                    <tr>
                      <th style={{ width: '50px' }}>No.</th>
                      <th style={{ width: '50px' }}>Image.</th>
                      <th style={{ width: '150px' }}>Name</th>
                      <th style={{ width: '150px' }}>Description</th>
                      <th style={{ width: '120px' }}>Created Date</th>
                      <th style={{ width: '80px' }}>Status</th>
                      <th style={{ width: '80px' }}>Category Name</th>

                      <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentSubcategories.map((data, index) => (
                      <tr key={data.subcategory_id}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>
                          <a href={data.subcategy_url || 'https://via.placeholder.com/150x150'}>
                            <img
                              src={data.subcategy_url || 'https://via.placeholder.com/150x150'}
                              alt="Category"
                              className="img-fluid"
                              style={{
                                borderRadius: '50%',
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                              }}
                              onClick={() => openZoomModal(data.category_url)}
                            />
                          </a>
                        </td>
                        <td>{data.subcategory_name}</td>
                        <td>{shortenText(data.description)}</td>
                        <td>{formatDate(data.subcategory_created_at)}</td>
                        <td>
                          <span
                            className={`badge ${data.subcategory_status === 'active' ? 'bg-success' : 'bg-danger'
                              }`}
                          >
                            {data.subcategory_status}
                          </span>
                        </td>
                        <td>{data.category_name}</td>

                        <td>
                          <ul>
                            <li onClick={() => handleModal(data)}>
                              <a href="#">
                                <i className="ri-eye-line" />
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(data)}>
                              <a href="javascript:void(0)">
                                <i className="ri-pencil-line" />
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(data)}>
                              <a href="javascript:void(0)">
                                <i className="ri-delete-bin-line" />
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
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

      {addToggleModal && <AddSubcategoryModal show={addToggleModal} handleClose={() => setAddToggleModal(!addToggleModal)} onSave={fetchData} />}
      {selectedSubcategory && (
        <>

          {/* Subcategory View Modal */}
          <SubcategoryViewModal
            modal={modal}
            toggle={() => setModal(!modal)}
            data={selectedSubcategory}
          />
          <SubcategoryEditModal
            show={editToggleModal}
            handleClose={handleCloseEditModal}
            data={selectedSubcategory}
            onSave={fetchData}
          />
          <DeleteSubcategoryModal
            modal={deleteModal}
            toggle={() => setDeleteModal(!deleteModal)}
            data={selectedSubcategory}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  )
}

export default SubCategoryListComponent