import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import EditBanner from './EditBanner';
import DeleteBanner from './DeleteBanner';
import { axiosClients } from '../../Apis/api';
import ErrorBoundary from '../ErrorBoundary';
import AppHeader from '../AppHeader';
import AppSidebar from '../AppSidebar';
import AppFooter from '../AppFooter';

function AllBanner() {
  const [datas, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editToggleModal, setEditToggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);
  const [zoomModal, setZoomModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const fetchData = async (isAdmin = 'true') => {
    try {
      const response = await axiosClients.get(`/getAllBanner?isAdmin=${isAdmin}`);
      setData(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentBanner = datas?.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(datas?.length / adsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (page) => setCurrentPage(page);
  const toggleModal = () => setModal(!modal);
  const deleteToggle = (banner) => {
    setSelectedBanner(banner);
    setDeleteModal(!deleteModal);
  };

  const handleViewBanner = (banner) => {
    setSelectedBanner(banner);
    toggleModal();
  };

  const editToggle = () => setEditToggleModal(!editToggleModal);
  const handleEditModal = (banner) => {
    setSelectedBanner(banner);
    editToggle();
  };

  const toggleZoomModal = () => {
    setZoomModal(!zoomModal);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex < selectedBanner.image.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <ErrorBoundary>

      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">

            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-12">
                  <div className="card card-table">
                    <div className="card-body">
                      <div className="title-header option-title d-sm-flex d-block">
                        <h5>Banner List</h5>
                      </div>
                      <div className="table-responsive">
                        <table className="table category-table dataTable no-footer" id="table_id">
                          <thead>
                            <tr>
                              <th>No.</th>
                              <th>Banner Image</th>
                              <th>heading</th>
                              <th>title</th>
                              <th>link</th>
                              <th>status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentBanner?.map((banner, i) => (
                              <tr key={i}>
                                <td>{indexOfFirstAd + i + 1}</td>
                                <td>
                                  <img
                                    src={banner.image}
                                    alt={banner.heading}
                                    onClick={() => {
                                      setSelectedBanner(banner); // Set selected product
                                      setSelectedImageIndex(0); // Assuming only 1 image per testimonial
                                      toggleZoomModal();
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
                                <td>{banner.heading ? banner.heading.length > 40 ? `${banner.heading.substring(0, 50)}...` : banner.heading : 'N/A'}</td>
                                <td>{banner.title ? banner.title.length > 40 ? `${banner.title.substring(0, 50)}...` : banner.title : 'N/A'}</td>
                                <td>{banner.link ? banner.link.length > 40 ? `${banner.link.substring(0, 50)}...` : banner.link : 'N/A'}</td>
                                <td>
                                  <span className={`badge ${banner.status === "active" ? "bg-success" : "bg-danger"}`}>{banner.status || 'N/A'}</span>
                                </td>
                                <td>
                                  <ul className="d-flex gap-3">
                                    <li onClick={() => handleViewBanner(banner)}>
                                      <a href="#" className="text-warning">
                                        <i className="ri-eye-line"></i>
                                      </a>
                                    </li>
                                    <li onClick={() => handleEditModal(banner)}>
                                      <a href="#">
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

              {selectedBanner && (
                <>

                  <EditBanner modal={editToggleModal} toggle={editToggle} data={selectedBanner} onSave={fetchData} />
                  <DeleteBanner modal={deleteModal} toggle={deleteToggle} data={selectedBanner} onSave={fetchData} />
                </>
              )}

              {selectedBanner && selectedImageIndex !== null && (
                <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
                  <ModalBody>
                    <img
                      src={selectedBanner.image} // Display only the selected testimonial image
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
                    <Button color="primary" onClick={handleNextImage} disabled={selectedImageIndex === selectedBanner.image.length - 1}>
                      Next <i className="ri-arrow-right-line"></i>
                    </Button>
                  </ModalFooter>
                </Modal>
              )}
            </div>

          </div>
          <AppFooter />
        </div>

      </div>
    </ErrorBoundary>
  );
}

export default AllBanner;