import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Modal } from 'react-bootstrap'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'
import { apiGet } from '../../Api/apiMethods'
import ViewModalKit from './ViewModalKit'
import DeleteKitModal from './DeleteKitModal'
import KitAddComponent from './KitAddComponent'
import KitEditModal from './KitEditModal'
import ImageReorderModal from './ImageReorderModal'
import ThreeSixtyView from './ThreeSixtyView'

function KitListComponent() {
  const [datas, setData] = useState([])
  const [selectedKit, setSelectedKit] = useState(null)
  const [modal, setModal] = useState(false)
  const [modal360, setModal360] = useState(false)
  const [modalArrange, setModalArrange] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [addToggleModal, setAddToggleModal] = useState(false)
  const [zoomModal, setZoomModal] = useState(false)
  const [zoomedImageUrl, setZoomedImageUrl] = useState('')

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await apiGet('/getKitBoxes')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleEditModal = () => setEditToggleModal((prevState) => !prevState)
  const deleteToggle = (kit) => {
    setSelectedKit(kit)
    setDeleteModal((prevState) => !prevState)
  }
  const toggle = () => setModal((prevState) => !prevState)
  const handleModal = (kit) => {
    setSelectedKit(kit)
    toggle()
  }
  const handleEditModal = (kit) => {
    setSelectedKit(kit)
    toggleEditModal()
  }
  const openZoomModal = (imageUrl) => {
    setZoomedImageUrl(imageUrl)
    setZoomModal(true)
  }

  // Pagination Logic
  const indexOfLastKit = currentPage * itemsPerPage
  const indexOfFirstKit = indexOfLastKit - itemsPerPage
  const currentKits = datas.slice(indexOfFirstKit, indexOfLastKit)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table overflow-scroll">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Kit Box List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <button className="btn btn-dashed" onClick={() => setAddToggleModal(true)}>
                        Add Kit Box
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <table className="table table-responsive category-table dataTable no-footer" id="table_id">
                  <thead style={{ background: '#f5f5f5 !important' }}>
                    <tr>
                      <th>No.</th>
                      <th>Image</th>
                      <th>Box Name</th>
                      <th>Category Name</th>
                      <th>Box Size</th>
                      <th>Dimensions (H×W×L)</th>
                      <th>Price</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentKits?.map((kit, index) => {
                      // Parse the multiple_image JSON string to get the first image
                      let displayImage = kit.die_image;
                      try {
                        const multipleImages = JSON.parse(kit.multiple_image);
                        if (multipleImages && multipleImages.length > 0) {
                          displayImage = multipleImages[0];
                        }
                      } catch (e) {
                        console.error("Error parsing multiple_image:", e);
                      }

                      return (
                        <tr key={kit.kit_box_id}>
                          <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                          <td>
                            <img
                              src={displayImage}
                              alt="Kit Box"
                              className="img-fluid"
                              style={{
                                borderRadius: '5px',
                                width: '50px',
                                height: '50px',
                                objectFit: 'cover',
                                cursor: 'pointer',
                              }}
                              onClick={() => openZoomModal(displayImage)}
                            />
                          </td>
                          <td>{kit.box_name}</td>
                          <td>{kit.category_name}</td>
                          <td>{kit.box_size}</td>
                          <td>
                            {kit.physical_height && kit.physical_width && kit.physical_length
                              ? `${kit.physical_height} × ${kit.physical_width} × ${kit.physical_length}`
                              : 'N/A'}
                          </td>
                          <td>Rs.{parseFloat(kit.box_price).toFixed(2)}</td>
                          <td>{formatDate(kit.created_at)}</td>
                          <td>
                            <span
                              className={`badge ${kit.is_show === 'Y' ? 'bg-success' : 'bg-danger'}`}
                            >
                              {kit.is_show === 'Y' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <ul>
                              <li onClick={() => handleModal(kit)}>
                                <a>
                                  <i className="ri-eye-line" />
                                </a>
                              </li>
                              <li onClick={() => handleEditModal(kit)}>
                                <a>
                                  <i className="ri-pencil-line" />
                                </a>
                              </li>
                              <li onClick={() => deleteToggle(kit)}>
                                <a>
                                  <i className="ri-delete-bin-line  text-danger" />
                                </a>
                              </li>
                              {/* <li title='image order' onClick={() => {
                                setModalArrange(true)
                                setSelectedKit(kit)
                              }}>
                                <a>
                                  <i class="ri-sort-asc text-info"></i>
                                </a>
                              </li> */}
                              {/* <li onClick={() => {
                                setModal360(true)
                                setSelectedKit(kit)
                                title = 'image 360 order'
                              }}>
                                <a>
                                  <i class="ri-anticlockwise-2-line text-primary"></i>
                                </a>
                              </li> */}




                            </ul>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
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

      {/* Image Zoom Modal */}
      <Modal show={zoomModal} onHide={() => setZoomModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Kit Box Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={zoomedImageUrl} alt="Zoomed Kit Box" style={{ maxWidth: '100%' }} />
        </Modal.Body>
      </Modal>

      {modal && <ViewModalKit modal={modal} toggle={toggle} data={selectedKit} />}

      {/* You'll need to update these modal components to work with kit box data */}
      {modal && <ViewModalKit modal={modal} toggle={toggle} data={selectedKit} />}
      {editToggleModal && (
        <KitEditModal modal={editToggleModal} toggle={toggleEditModal} data={selectedKit} onSave={fetchData} />
      )}
      {deleteModal && (
        <DeleteKitModal modal={deleteModal} toggle={deleteToggle} data={selectedKit} onDelete={fetchData} />
      )}
      {addToggleModal && <KitAddComponent modal={addToggleModal} toggle={() => setAddToggleModal(false)} onSave={fetchData} />}

      {
        <ImageReorderModal
          show={modalArrange}
          handleClose={() => setModalArrange(false)}
          imageArray={selectedKit?.multiple_image ? JSON.parse(selectedKit.multiple_image) : []}
          api={`/arrangeMultipleKitImg/${selectedKit?.kit_box_id}/`}
          fetch={fetchData}
        />



      }
      {modal360 &&
        <ThreeSixtyView
          api={`/get360ImagesByKitBoxId/${selectedKit?.kit_box_id}/`}
          show={modal360}
          handleClose={() => setModal360(false)}
          data={selectedKit}
          onSave={fetchData}
          kitId={selectedKit?.kit_box_id}

        />
      }
    </div>
  )
}

export default KitListComponent