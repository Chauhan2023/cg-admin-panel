import React, { useState, useEffect } from 'react';
import { axiosClients } from '../../Apis/api';
import { formatDate } from '../../utils/formatDate';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';

const DesignerList = () => {
  const [designers, setDesigners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchDesigners();
  }, []);

  const fetchDesigners = async () => {
    try {
      const response = await axiosClients.get('/getUsers');
      const allUsers = response.data.data || [];
      // If the backend adds a role field later, you can filter it here:
      // const filteredDesigners = allUsers.filter(user => user.role === 'Designer');
      setDesigners(allUsers);
    } catch (error) {
      console.error('Error fetching designers:', error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = designers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(designers.length / itemsPerPage);

  return (
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
                    <div className="title-header option-title">
                      <h5>Designer List</h5>
                      <a href="/designer-create" className="btn btn-primary">Add Designer</a>
                    </div>
                    <div className="table-responsive theme-scrollbar table-product">
                      <table className="table category-table dataTable no-footer">
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Created Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((designer, index) => {
                            const isActive = designer.is_active || designer.isActive || 'Y'; // default to Y if undefined
                            return (
                              <tr key={designer.user_id || designer.id || index}>
                                <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                <td>{designer.first_name || 'N/A'}</td>
                                <td>{designer.last_name || 'N/A'}</td>
                                <td>{designer.mobile_number || 'N/A'}</td>
                                <td>{designer.email || 'N/A'}</td>
                                <td>
                                  <span className={`badge ${isActive === 'Y' ? 'bg-success' : 'bg-danger'}`}>
                                    {isActive === 'Y' ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td>{formatDate(designer.created_at)}</td>
                              </tr>
                            );
                          })}
                          {currentItems.length === 0 && (
                            <tr>
                              <td colSpan="7" className="text-center">No Designers Found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    
                    {totalPages > 1 && (
                      <nav aria-label="Page navigation">
                        <ul className="pagination justify-content-end mt-4">
                          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                          </li>
                          {[...Array(totalPages)].map((_, idx) => (
                            <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                              <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                            </li>
                          ))}
                          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</button>
                          </li>
                        </ul>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DesignerList;
