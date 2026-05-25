import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClients } from '../../Apis/api'
import EditLogo from './EditLogo'
import { formatDate } from '../../utils/formatDate'

function AllLogo() {
  const [datas, setData] = useState([])
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)
  const [zoomModal, setZoomModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllLogo')
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
  const currentLogo = datas.slice(indexOfFirstAd, indexOfLastAd)
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

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (ad) => {
    setSelectedLogo(ad)
    editToggle()
  }

  const toggleZoomModal = () => {
    setZoomModal(!zoomModal)
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Logo List</h5>
              </div>
              <div className="table-responsive">
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Logo Image</th>
                      <th>Logo Name</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLogo?.map((logo, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          <img
                            src={logo.logo_url}
                            alt={logo.logo_name}
                            onClick={() => {
                              setSelectedLogo(logo)
                              setSelectedImageIndex(0)
                              toggleZoomModal()
                            }}
                            style={{
                              borderRadius: '50%',
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                          />
                        </td>
                        <td>{logo.logo_name}</td>
                        <td>{formatDate(logo.created_at)}</td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleEditModal(logo)}>
                              <a>
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
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

      {selectedLogo && (
        <>
          <EditLogo
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedLogo}
            onSave={fetchData}
          />
        </>
      )}

      {selectedLogo && selectedImageIndex !== null && (
        <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
          <ModalBody>
            <img
              src={selectedLogo.logo_url}
              alt="Zoomed"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleZoomModal}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default AllLogo
