import React, { useState, useEffect } from 'react'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'
import ViewComplaintModal from './ViewComplaintModal'
import EditComplaintModal from './EditComplaintModal'
import DeleteComplaintModal from './DeleteComplaintModal'
import { AppHeader, AppSidebar } from '../../components'

function ComplaintPage() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedReport, setSelectedReport] = useState(null)
  
  const [viewModal, setViewModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/allOrderReports')
      const records = response.data?.data || response.data || []
      setData(records)
      setFilteredData(records)
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

    const filtered = data.filter((report) => {
      const matchesOrderId = (report?.order_id || report?.orderId)?.toString().includes(value)
      const matchesComplaintType = (report?.complaint_type || report?.complaintType)?.toLowerCase().includes(value.toLowerCase())
      const matchesStatus = report?.status?.toLowerCase().includes(value.toLowerCase())
      return matchesOrderId || matchesComplaintType || matchesStatus
    })

    setFilteredData(filtered)
    setCurrentPage(1)
  }

  const toggleViewModal = () => setViewModal((prevState) => !prevState)
  const toggleEditModal = () => setEditModal((prevState) => !prevState)
  const toggleDeleteModal = () => setDeleteModal((prevState) => !prevState)

  const handleView = (report) => {
    setSelectedReport(report)
    toggleViewModal()
  }

  const handleEdit = (report) => {
    setSelectedReport(report)
    toggleEditModal()
  }

  const handleDelete = (report) => {
    setSelectedReport(report)
    toggleDeleteModal()
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
      <div>
           <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
           <AppHeader />
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title">
                <h5>Order Complaints</h5>
                <div className="filter-section" style={{ marginRight: '10px' }}>
                  <input
                    type="text"
                    placeholder="Search Order ID, Type or Status"
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
                      <th>Order Number</th>
                      <th>Complaint Type</th>
                      <th>Description</th>
                      <th>Admin Response</th>
                      <th>Created Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((report, index) => (
                      <tr key={report?.report_id || report?._id || index}>
                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{report?.order_number}</td>
                        <td>{report?.complaint_type || report?.complaintType}</td>
                        <td>
                           {report?.description?.length > 30 
                             ? report.description.substring(0, 30) + "..."
                             : report?.description}
                        </td>
                        <td>
                           {(report?.admin_response || report?.adminResponse)?.length > 30 
                             ? (report?.admin_response || report?.adminResponse).substring(0, 30) + "..."
                             : report?.admin_response || report?.adminResponse || "-"}
                        </td>
                        <td>{formatDate(report?.created_at || report?.createdAt)}</td>
                        <td className="text-center">
                          <span className={`badge ${report?.status === 'Resolved' || report?.status === 'Closed' ? 'bg-success' : 'bg-warning'}`}>
                            {report?.status || 'Pending'}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <button className="btn btn-primary btn-sm" onClick={() => handleView(report)}>
                              View
                            </button>
                            <button className="btn btn-info btn-sm text-white" onClick={() => handleEdit(report)}>
                              Edit
                            </button>
                            <button className="btn btn-danger btn-sm text-white" onClick={() => handleDelete(report)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-end mt-4">
                  <li className="page-item">
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button>
                  </li>
                  {[...Array(totalPages)].map((_, idx) => (
                    <li key={idx} className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(idx + 1)}>{idx + 1}</button>
                    </li>
                  ))}
                  <li className="page-item">
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0}>Next</button>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </div>

      {selectedReport && viewModal && (
        <ViewComplaintModal isOpen={viewModal} toggle={toggleViewModal} report={selectedReport} />
      )}
      {selectedReport && editModal && (
        <EditComplaintModal isOpen={editModal} toggle={toggleEditModal} report={selectedReport} refreshData={fetchData} />
      )}
      {selectedReport && deleteModal && (
        <DeleteComplaintModal modal={deleteModal} toggle={toggleDeleteModal} data={selectedReport} refreshData={fetchData} />
      )}
    </div>
      </div>
      </div>
  )
}

export default ComplaintPage
