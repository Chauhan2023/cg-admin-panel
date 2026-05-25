import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ShowAdditionalnfo from './ShowAdditionalnfo';
import EditAdditionalnfo from './EditAdditionalnfo';
import DeleteAdditionalnfo from './DeleteAdditionalnfo';
import { axiosClient } from '../../Apis/api';

function AllAdditionalnfo() {
  const [datas, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [editToggleModal, setEditToggleModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [adsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/getAllAdditionInfo');
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
  const additionalInfo = datas.slice(indexOfFirstAd, indexOfLastAd);
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

  const handleViewInfo = (care) => {
    setSelectedProduct(care);
    toggleModal();
  };

  const editToggle = () => setEditToggleModal(!editToggleModal);
  const handleEditModal = (care) => {
    setSelectedProduct(care);
    editToggle();
    fetchData();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Additional Info List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addadditionalinfo">
                        Add Additional Info
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
                      <th>Specialty</th>
                      <th>Ingredient Type</th>
                      <th>Brand</th>
                      <th>Form</th>
                      <th>Package Information</th>
                      <th>Manufacture</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {additionalInfo?.map((info, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                        {
                            info.specialty ? info.specialty.length > 15 ?
                            `${info.specialty.substring(0,15)}...`
                            : info.specialty
                            : 'N/A'
                          }
                        </td>
                        <td>
                        {
                            info.ingredient_type ? info.ingredient_type.length > 15 ?
                            `${info.ingredient_type.substring(0,15)}...`
                            : info.ingredient_type
                            : 'N/A'
                          }
                        </td>
                    
                        <td>
                        {
                            info.brand ? info.brand.length > 15 ?
                            `${info.brand.substring(0,15)}...`
                            : info.brand
                            : 'N/A'
                          }
                        </td>
                        <td>
                        {
                            info.form ? info.form.length > 15 ?
                            `${info.form.substring(0,15)}...`
                            : info.form
                            : 'N/A'
                          }
                        </td>
                        <td>
                          {
                            info.package_information ? info.package_information.length > 15 ?
                            `${info.package_information.substring(0,15)}...`
                            : info.package_information
                            : 'N/A'
                          }
                          </td>
                          <td>
                          {
                            info.manufacture ? info.manufacture.length > 15 ?
                            `${info.manufacture.substring(0,15)}...`
                            : info.manufacture
                            : 'N/A'
                          }
                          </td>
                     
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewInfo(info)}>
                              <a href="#" className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(info)}>
                              <a href="#">
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(info)}>
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
                <ul className="pagination justify-content-end pt-4">
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
          <ShowAdditionalnfo modal={modal} toggle={toggleModal} data={selectedProduct} />
          <EditAdditionalnfo modal={editToggleModal} toggle={editToggle} data={selectedProduct} onSave={fetchData} />
          <DeleteAdditionalnfo modal={deleteModal} toggle={deleteToggle} data={selectedProduct} onSave={fetchData}/>
        </>
      )}
    </div>
  );
}

export default AllAdditionalnfo;