import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowCareInstruction from './ShowCareInstruction';
import DeleteCareInstruction from './DeleteCareInstruction';
import EditCareInstruction from './EditCareInstruction';
import { axiosClient } from '../../Apis/api';

function AllCareInstruction() {
  const [datas, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editToggleModal, setEditToggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/getAllCareInstruction');
      setData(response.data);
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
  const careInstruction = datas.slice(indexOfFirstAd, indexOfLastAd);
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
  const deleteToggle = (care) => {
    setSelectedProduct(care);
    setDeleteModal(!deleteModal);
  };

  const handleViewCare = (care) => {
    setSelectedProduct(care);
    toggleModal();
  };

  const editToggle = () => setEditToggleModal(!editToggleModal);
  const handleEditModal = (care) => {
    setSelectedProduct(care);
    editToggle();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Care Instruction List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addcare">
                        Add Care
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
                      <th>Care Instruction Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careInstruction?.map((care, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          {
                            care.care_instruction ? care.care_instruction.length > 15 ? 
                            `${care.care_instruction.substring(0,90)}...`
                            : care.care_instruction
                            : 'N/A'
                          }
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewCare(care)}>
                              <a href="#" className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(care)}>
                              <a href="#">
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(care)}>
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
                  {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => handlePageSelect(idx + 1)}>
                        {idx + 1}
                      </button>
                    </li>
                  ))}
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
          <ShowCareInstruction modal={modal} toggle={toggleModal} data={selectedProduct} />
          <EditCareInstruction modal={editToggleModal} toggle={editToggle} data={selectedProduct} onSave={fetchData} />
          <DeleteCareInstruction modal={deleteModal} toggle={deleteToggle} data={selectedProduct} onSave={fetchData} />
        </>
      )}
    </div>
  );
}

export default AllCareInstruction;
