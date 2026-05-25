import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import ViewVideo from './ViewVideo'
import EditVideo from './EditVideo'
import DeleteVideo from './DeleteVideo'
import { axiosClients } from '../../Apis/api'

function AllVideo() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)
  const [zoomModal, setZoomModal] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllVideo')
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
  const currentVideo = datas.slice(indexOfFirstAd, indexOfLastAd)
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
  const deleteToggle = (banner) => {
    setSelectedProduct(banner)
    setDeleteModal(!deleteModal)
  }

  const handleViewBanner = (banner) => {
    setSelectedProduct(banner)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (ad) => {
    setSelectedProduct(ad)
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
                <h5>Video List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addvideo">
                        Add Video
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
                      <th>Video</th>
                      <th>Video Heading</th>
                      <th>Video Text</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVideo?.map((videos, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          <video
                            src={videos.video_url}
                            alt={videos.video_heading}
                            onClick={() => {
                              setSelectedVideo(videos)
                              toggleZoomModal()
                            }}
                            style={{
                              borderRadius: '50%',
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover',
                              cursor: 'pointer',
                            }}
                            controls
                          />
                        </td>

                        <td>{`${videos.video_heading.substring(0, 20)}...`}</td>
                        <td>{`${videos.video_text.substring(0, 20)}...`}</td>
                        <td>
                          <span
                            className={`badge ${videos.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                          >
                            {videos.status}
                          </span>
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewBanner(videos)}>
                              <a className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(videos)}>
                              <a>
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(videos)}>
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
      {selectedProduct && (
        <>
          <ViewVideo modal={modal} toggle={toggleModal} data={selectedProduct} />
          <EditVideo
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedProduct}
            onSave={fetchData}
          />
          <DeleteVideo
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedProduct}
            onSave={fetchData}
          />
        </>
      )}
      {selectedVideo && (
        <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
          <ModalBody>
            <video
              src={selectedVideo.video_url}
              alt={selectedVideo.video_heading}
              style={{
                width: '100%',
                height: 'auto',
              }}
              controls
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

export default AllVideo
