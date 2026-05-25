import React, { useEffect, useState } from "react";
import ViewProductReview from "./ViewProductReview";
import { axiosClients } from "../../Apis/api";
import DeleteProductReview from "./DeleteProductReview";
import { formatDate } from '../../utils/formatDate';

function AllProductReview() {
  const [datas, setData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProductReview, setSelectedProductReview] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axiosClients.get("/getAllReview");
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
  const currentProductReview = datas.slice(indexOfFirstAd, indexOfLastAd);
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

  // Separate modal toggle functions
  const toggleViewModal = () => setViewModal(!viewModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleViewReview = (review) => {
    setSelectedProductReview(review);
    setDeleteModal(false); // Ensure delete modal is closed
    toggleViewModal();
  };

  const handleDeleteReview = (review) => {
    setSelectedProductReview(review);
    setViewModal(false); // Ensure view modal is closed
    toggleDeleteModal();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Product Review List</h5>
              </div>
              <div>
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Product Name</th>
                      <th>User Name</th>
                      <th>Comment</th>
                      <th>Rating</th>
                      <th>Email</th>
                      <th>Create Date</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProductReview?.map((review, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          {review.product_name
                            ? review.product_name.length > 40
                              ? `${review.product_name.substring(0, 50)}...`
                              : review.product_name
                            : "N/A"}
                        </td>
                        <td>
                          {review.name
                            ? review.name.length > 40
                              ? `${review.name.substring(0, 50)}...`
                              : review.name
                            : "N/A"}
                        </td>
                        <td>
                          {review.comment
                            ? review.comment.length > 40
                              ? `${review.comment.substring(0, 45)}...`
                              : review.comment
                            : "N/A"}
                        </td>
                        <td>
                          {review.rating
                            ? review.rating.length > 40
                              ? `${review.rating.substring(0, 45)}...`
                              : review.rating
                            : "N/A"}
                        </td>
                        <td>
                          {review.email
                            ? review.email.length > 40
                              ? `${review.email.substring(0, 45)}...`
                              : review.email
                            : "N/A"}
                        </td>
                        <td>{formatDate(review.created_at)}</td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewReview(review)}>
                              <a className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleDeleteReview(review)}>
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

      {selectedProductReview && (
        <>
          <ViewProductReview modal={viewModal} toggle={toggleViewModal} data={selectedProductReview} />
          <DeleteProductReview
            modal={deleteModal}
            toggle={toggleDeleteModal}
            data={selectedProductReview}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  );
}

export default AllProductReview;
