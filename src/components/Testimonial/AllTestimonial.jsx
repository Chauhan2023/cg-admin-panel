import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import ShowTestimonial from "./ShowTestimonial";
import EditTestimonial from "./EditTestimonial";
import DeleteTestimonial from "./DeleteTestimonial";
import { axiosClients } from "../../Apis/api";

function AllTestimonial() {
  const [datas, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editToggleModal, setEditToggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);
  const [zoomModal, setZoomModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Fetch testimonials with admin query parameter
  const fetchData = async () => {
    try {
      const response = await axiosClients.get("/getAllTestimonials?isAdmin=true");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentTestimonial = datas.slice(indexOfFirstAd, indexOfLastAd);
  const totalPages = Math.ceil(datas.length / adsPerPage);

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
  const deleteToggle = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setDeleteModal(!deleteModal);
  };

  const handleViewBanner = (testimonial) => {
    setSelectedTestimonial(testimonial);
    toggleModal();
  };

  const editToggle = () => setEditToggleModal(!editToggleModal);
  const handleEditModal = (ad) => {
    setSelectedTestimonial(ad);
    editToggle();
  };

  const toggleZoomModal = () => {
    setZoomModal(!zoomModal);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Testimonial List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addtestimonialpage">
                        Add Testimonial
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="table-responsive">
                <table
                  className="table category-table dataTable no-footer"
                  id="table_id"
                >
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Testimonial Image</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTestimonial?.map((testimonial, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          <img
                            src={testimonial.testimonial_pic}
                            alt={testimonial.name}
                            onClick={() => {
                              setSelectedTestimonial(testimonial);
                              setSelectedImageIndex(0);
                              toggleZoomModal();
                            }}
                            style={{
                              borderRadius: "50%",
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        </td>
                        <td>{testimonial.name}</td>
                        <td>{testimonial.position}</td>
                        <td>
                          {testimonial.title
                            ? testimonial.title.substring(0, 15) + "..."
                            : "N/A"}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              testimonial.status === "active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {testimonial.status}
                          </span>
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewBanner(testimonial)}>
                              <a href="#" className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(testimonial)}>
                              <a href="#">
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(testimonial)}>
                              <a href="#">
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

      {selectedTestimonial && (
        <>
          <ShowTestimonial
            modal={modal}
            toggle={toggleModal}
            data={selectedTestimonial}
          />
          <EditTestimonial
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedTestimonial}
            onSave={fetchData}
          />
          <DeleteTestimonial
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedTestimonial}
            onSave={fetchData}
          />
        </>
      )}

      {selectedTestimonial && selectedImageIndex !== null && (
        <Modal isOpen={zoomModal} toggle={toggleZoomModal} centered>
          <ModalBody>
            <img
              src={selectedTestimonial.testimonial_pic}
              alt="Zoomed"
              style={{
                width: "100%",
                height: "auto",
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
  );
}

export default AllTestimonial;
