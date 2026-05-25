import React, { useEffect, useState } from 'react';
import ViewNewsEmailLetter from './ViewNewsEmailLetter';
import DeleteNewsEmailLetter from './DeleteNewsEmailLetter';
import { axiosClients } from '../../Apis/api';
import { formatDate } from '../../utils/formatDate';

function NewsEmailLetter() {
  const [datas, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedNewsEmail, setSelectedNewsEmail] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllNewsEmailLetter');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleDeleteNewsEmail = (newsemail) => {
    setSelectedNewsEmail(newsemail);
    setModal(false);
    toggleDeleteModal();
  };

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentNewsEmail = datas.slice(indexOfFirstAd, indexOfLastAd);
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

  const handleViewNewsEmail = (newsemail) => {
    setSelectedNewsEmail(newsemail);
    toggleModal();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>News Email List</h5>
              </div>
              <div>
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Email</th>
                      <th>Created Date</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentNewsEmail?.map((newsemail, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          {newsemail.email || 'N/A' }
                        </td>
                        <td>
                          {formatDate(newsemail.created_at)}
                        </td>
                        
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewNewsEmail(newsemail)}>
                              <a className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleDeleteNewsEmail(newsemail)}>
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
      {selectedNewsEmail && (
        <>
          <ViewNewsEmailLetter modal={modal} toggle={toggleModal} data={selectedNewsEmail} />
          <DeleteNewsEmailLetter modal={deleteModal} toggle={toggleDeleteModal} data={selectedNewsEmail} onSave={fetchData} />
        </>
      )}
    </div>
  );
}

export default NewsEmailLetter;