import React, { useEffect, useState } from 'react'
import DeleteUser from './DeleteUser'
import ViewUser from './ViewUser'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'

function AllUsersComponents() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Toggle modal for viewing user
  const toggle = () => {
    setModal(!modal)
  }

  // Toggle modal for deleting user
  const deleteToggle = (user) => {
    setSelectedUser(user)
    setDeleteModal(!deleteModal)
  }

  // Fetch user data from API
  const fetchData = async () => {
    try {
      const response = await axiosClients.get(`/getAllUser`)
      setData(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleViewUser = (user) => {
    setSelectedUser(user)
    toggle()
  }

  // Pagination Calculations
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = datas.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(datas.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>User List</h5>
              </div>

              <div className="table-responsive theme-scrollbar table-product">
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>No.</th>
                      <th>User Name</th>
                      <th>Mobile</th>
                      <th>Email</th>
                      <th>Bio</th>
                      <th>Created Date</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers?.map((data, index) => (
                      <tr key={data.id}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>
                          <div className="d-flex gap-1">
                            <div className="user-name">
                              <span>{data.first_name || 'N/A'}</span>
                            </div>
                            <div className="user-name">
                              <span>{data.last_name}</span>
                            </div>
                          </div>
                        </td>
                        <td>{data.mobile_number || 'N/A'}</td>
                        <td>{data.email || 'N/A'}</td>
                        <td>
                          {data.bio
                            ? data.bio.length > 40
                              ? `${data.bio.substring(0, 50)}...`
                              : data.bio
                            : 'N/A'}
                        </td>
                        <td>{formatDate(data.created_at)}</td>
                        <td>
                          <ul>
                            <li onClick={() => handleViewUser(data)}>
                              <a>
                                <i className="ri-eye-line" />
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(data)}>
                              <a>
                                <i className="ri-delete-bin-line text-danger" />
                              </a>
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
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

      {selectedUser && (
        <>
          <ViewUser modal={modal} toggle={toggle} data={selectedUser} />
          <DeleteUser modal={deleteModal} toggle={deleteToggle} data={selectedUser} />
        </>
      )}
    </div>
  )
}

export default AllUsersComponents
