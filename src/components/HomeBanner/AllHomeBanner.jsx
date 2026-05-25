import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClients } from '../../Apis/api'
import ViewHomeBanner from './ViewHomeBanner'
import EditHomeBanner from './EditHomeBanner'
import DeleteHomeBanner from './DeleteHomeBanner'

function AllHomeBanner() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedHomeBanner, setSelectedAdsBanner] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)
  const [zoomModal, setZoomModal] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllHomeBanners`)
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
  const currentHomeBanner = datas.slice(indexOfFirstAd, indexOfLastAd)
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
  const deleteToggle = (adsbanner) => {
    setSelectedAdsBanner(adsbanner)
    setDeleteModal(!deleteModal)
  }

  const handleViewBanner = (adsbanner) => {
    setSelectedAdsBanner(adsbanner)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (adsbanner) => {
    setSelectedAdsBanner(adsbanner)
    editToggle()
  }

  const toggleZoomModal = () => {
    setZoomModal(!zoomModal)
  }

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const handleNextImage = () => {
    if (selectedImageIndex < selectedHomeBanner.banner_image.length - 1) {
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
                <h5>Home Banner List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/add-home-banner">
                        Add Home Banner
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Banner Image</th>
                      <th>Banner heading</th>
                      <th>Banner title</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentHomeBanner?.map((homebanner, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          <img
                            src={homebanner.banner_image}
                            alt={homebanner.banner_heading}
                            onClick={() => {
                                setSelectedAdsBanner(homebanner)
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
                        <td>{homebanner.banner_heading}</td>
                        <td>
                          {homebanner.banner_text ? homebanner.banner_text.substring(0, 15) + '...' : 'N/A'}
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewBanner(homebanner)}>
                              <a className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(homebanner)}>
                              <a>
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(homebanner)}>
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

      {selectedHomeBanner && (
        <>
          <ViewHomeBanner modal={modal} toggle={toggleModal} data={selectedHomeBanner} />
          <EditHomeBanner
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedHomeBanner}
            onSave={fetchData}
          />
          <DeleteHomeBanner
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedHomeBanner}
            onSave={fetchData}
          />
        </>
      )}

      {selectedHomeBanner && selectedImageIndex !== null && (
        <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
          <ModalBody>
            <img
              src={selectedHomeBanner.banner_image}
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
            <Button color="primary" onClick={handlePrevImage} disabled={selectedImageIndex === 0}>
              <i className="ri-arrow-left-line"></i> Prev
            </Button>
            <Button
              color="primary"
              onClick={handleNextImage}
              disabled={selectedImageIndex === selectedHomeBanner.banner_image.length - 1}
            >
              Next <i className="ri-arrow-right-line"></i>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  )
}

export default AllHomeBanner