import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ViewColorTheme from './ViewColorTheme'
import EditColorTheme from './EditColorTheme'
import DeleteColorTheme from './DeleteColorTheme'
import { axiosClients } from '../../Apis/api'

function AllColorTheme() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedHeaderAds, setSelectedHeaderAds] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllColor`)
      setData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage
  const indexOfFirstAd = indexOfLastAd - adsPerPage
  const currentColor = datas.slice(indexOfFirstAd, indexOfLastAd)
  const totalPages = Math.ceil(datas.length / adsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageSelect = (page) => setCurrentPage(page)
  const toggleModal = () => setModal(!modal)
  const deleteToggle = (color) => {
    setSelectedHeaderAds(color)
    setDeleteModal(!deleteModal)
    fetchData()
  }

  const handleViewProduct = (color) => {
    setSelectedHeaderAds(color)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (color) => {
    setSelectedHeaderAds(color)
    fetchData()
    editToggle()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Color List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addcolortheme">
                        Add Color
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Background Color Name</th>
                      <th>Background Color</th>
                      <th>Text Color Name</th>
                      <th>Text Color</th>
                      <th>Status</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentColor?.map((color, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>{color.background_color_area_name || 'N/A'}</td>
                        <td>{color.background_color || 'N/A'}</td>
                        <td>{color.text_color_name || 'N/A'}</td>
                        <td>{color.text_color || 'N/A'}</td>
                        <td>
                          <span
                            className={`badge ${color.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                          >
                            {color.status}
                          </span>
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewProduct(color)}>
                              <a className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(color)}>
                              <a>
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(color)}>
                              <a>
                                <i className="ri-delete-bin-line text-danger"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
      </div>
      {selectedHeaderAds && (
        <>
          <ViewColorTheme modal={modal} toggle={toggleModal} data={selectedHeaderAds} />
          <EditColorTheme
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedHeaderAds}
            onSave={fetchData}
          />
          <DeleteColorTheme
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedHeaderAds}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  )
}

export default AllColorTheme
