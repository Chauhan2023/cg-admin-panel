import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrandViewModal from './BrandViewModal';
import DeleteBrandModal from './DeleteBrandModal';
import BrandEditModal from './BrandEditModal';
import { axiosClient } from '../../Apis/api';

function FoodListComponent() {
  const [data, setData] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editToggleModal, setEditToggleModal] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchData = async () => {
    try {
      const response = await axiosClient.get('/getAllBrand');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastBrand = currentPage * itemsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - itemsPerPage;
  const currentBrands = data.slice(indexOfFirstBrand, indexOfLastBrand);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageSelect = (page) => setCurrentPage(page);
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handleModal = (brand) => {
    setSelectedBrand(brand);
    setModal(true);
  };

  const deleteToggle = (brand) => {
    setSelectedBrand(brand);
    setDeleteModal(true);
  };

  const handleEditModal = (brand) => {
    setSelectedBrand(brand);
    setEditToggleModal(true);
  };

  const handleCloseEditModal = () => {
    setEditToggleModal(false);
    fetchData();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Brand List</h5>
                <div className="right-options">
                  <Link className="btn btn-dashed" to="/add-brand">
                    Add New Brand
                  </Link>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table category-table dataTable no-footer">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Brand Name</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentBrands.map((brand, index) => (
                      <tr key={brand.brand_id}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{brand.brand_name}</td>
                        <td>{new Date(brand.created_at).toLocaleDateString()}</td>
                        <td >
                          <span className={`badge ${brand.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>{brand.status}</span>
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleModal(brand)}>
                              <a href="#" className="text-warning">
                                <i className="ri-eye-line" />
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(brand)}>
                              <a href="#" className="text-success">
                                <i className="ri-pencil-line" />
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(brand)}>
                              <a href="#" className="text-danger">
                                <i className="ri-delete-bin-line" />
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
      {selectedBrand && (
        <>
          <BrandViewModal modal={modal} toggle={() => setModal(!modal)} data={selectedBrand} />
          <BrandEditModal show={editToggleModal} handleClose={handleCloseEditModal} data={selectedBrand} />
          <DeleteBrandModal modal={deleteModal} toggle={() => setDeleteModal(!deleteModal)} data={selectedBrand} />
        </>
      )}
    </div>
  );
}

export default FoodListComponent;
