import React, { useState, useEffect } from 'react'
import DeleteOrderModal from './DeleteOrderModal'
import ViewOrderModal from './ViewOderModal'
import EditOrderModal from './EditOrderModal'
import { axiosClients } from '../../Apis/api'

import AuditModal from './AuditModal'

import OrderDetailModal from './OrderDetailModal'
import { formatDate } from '../../utils/formatDate'

function AllOrder() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [modal, setModal] = useState(false)
  const [auditModal, setAuditModal] = useState(false)
  const [selectedAuditOrderId, setSelectedAuditOrderId] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllOrder')
      setData(response.data.data)
      setFilteredData(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleFilterChange = (e) => {
    const { value } = e.target

    if (!value) {
      setFilteredData(data)
      return
    }

    const filtered = data.filter((order) => {
      const matchesUserNumber = order?.billing_user_number?.toString().includes(value);
      const matchesOrderStatus = order?.order_status?.toLowerCase().includes(value.toLowerCase());

      return matchesUserNumber || matchesOrderStatus;
    })

    setFilteredData(filtered)
    setCurrentPage(1) // Reset to the first page on filtering
  }

  const toggleEditModal = () => setEditToggleModal((prevState) => !prevState)
  const deleteToggle = (order) => {
    setSelectedOrder(order)
    setDeleteModal((prevState) => !prevState)
  }
  const toggle = () => setModal((prevState) => !prevState)
  const handleModal = (order) => {
    setSelectedOrder(order)
    toggle()
  }
  const toggleAudit = () => setAuditModal((prevState) => !prevState)
  const handleAudit = (order) => {
    setSelectedAuditOrderId(order.order_id)
    toggleAudit()
  }
  const handleEditModal = (order) => {
    setSelectedOrder(order)
    toggleEditModal()
  }

  // Pagination Logic
  const indexOfLastOrder = currentPage * itemsPerPage
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage
  const currentOrders = filteredData.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageSelect = (page) => setCurrentPage(page)
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>Orders List</h5>
                <div className="filter-section" style={{ marginRight: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search by User Number or Status"
                    onChange={handleFilterChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="table-responsive theme-scrollbar category-table">
                <table className="table all-package theme-table dataTable no-footer">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>User Number</th>
                      <th>Product Type</th>
                      <th>Total Amount</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders?.map((order, index) => {

                      return (
                        <tr key={order.order_id}>
                          <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                          <td>{order?.billing_user_number}</td>

                          <td>{order?.is_kit == "Y" ? "Kit" : "Product"}</td>
                          <td>{order?.total_price}</td>
                          <td>{formatDate(order.created_at)}</td>
                          <td className="text-center">
                            {order?.order_status}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={() => handleModal(order)}
                              >
                                View
                              </button>
                              {order?.order_status === 'Confirmed' && (
                                <button
                                  className="btn btn-warning btn-sm text-dark"
                                  onClick={() => handleAudit(order)}
                                >
                                  Audit
                                </button>
                              )}
                            </div>
                          </td>

                        </tr>
                      )
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
                  {[...Array(totalPages)].map((_, idx) => (
                    <li
                      key={idx}
                      className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                    >
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

      {selectedOrder && (
        <>
          <OrderDetailModal isOpen={modal} onClose={toggle} order={selectedOrder} />

        </>
      )}
      
      {selectedAuditOrderId && (
        <AuditModal isOpen={auditModal} onClose={toggleAudit} orderId={selectedAuditOrderId} />
      )}
    </div>
  )
}

export default AllOrder
