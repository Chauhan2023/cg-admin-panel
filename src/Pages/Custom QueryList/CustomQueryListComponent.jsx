import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { apiGet, apiPost, apiPut } from '../../Api/apiMethods'
import { formatDate } from '../../utils/formatDate'
import { AppFooter, AppHeader, AppSidebar } from '../../components'

function CustomQueryListComponent() {
    const [requests, setRequests] = useState([])
    const [zoomModal, setZoomModal] = useState(false)
    const [dateSearch, setDateSearch] = useState(new Date().toISOString().split('T')[0])
    const [selectedRequest, setSelectedRequest] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredData, setFilteredData] = useState([])
    const [statusFilter, setStatusFilter] = useState("")
    const itemsPerPage = 10

    const fetchData = async () => {
        try {
            const res = await apiGet('/getAllNeedCustomDesign')
            setRequests(res.data)
            setFilteredData(res.data)
        } catch (error) {
            console.error('Error fetching requests:', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleModal = (request) => {
        setSelectedRequest(request)
        setZoomModal(true)
    }

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentRequests = requests.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(requests.length / itemsPerPage)

    const handlePageSelect = (page) => setCurrentPage(page)
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))


    const handleStatusChange = (requestId, status) => {
        const payload = {
            requestId: requestId,
            requestStatus: status
        };

        // Example: Send to backend
        console.log('Payload to send:', payload);


        apiPut('/updateQueryById', payload)
            .then(res => { console.log('Status updated:', res.data); fetchData(); })
            .catch(err => console.error('Error updating status:', err));
    };


    useEffect(() => {

        if (!statusFilter || statusFilter === "all") {
            // Show all requests if no filter or "all" selected
            fetchData()
        } else {

            // Filter by the selected status
            const result = requests?.filter(
                (request) => request.query_type === statusFilter
            );
            setFilteredData(result);
        }
    }, [statusFilter]);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table">
                                <div className="card-header d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                    {/* Title */}
                                    <h5 className="mb-0">Custom Design Requests</h5>

                                    {/* Filters container */}
                                    <div className="d-flex align-items-center gap-3">
                                        {/* Status Select */}
                                        <select
                                            className="form-select"
                                            aria-label="Filter by status"
                                            style={{ minWidth: '150px' }}
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="">All</option>
                                            <option value="I">Enquery</option>
                                            <option value="D">Design</option>

                                        </select>

                                        {/* Date Input */}
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="dateTime"
                                            value={dateSearch}
                                            max={new Date().toISOString().split('T')[0]}
                                            onChange={(e) => setDateSearch(e.target.value)}
                                            style={{ minWidth: '180px' }}
                                        />
                                    </div>
                                </div>

                                <div className="card-body">

                                    <div className='table-responsive'>
                                        <table className="table  dataTable no-footer overflow-auto" id="table_id">
                                            <thead style={{ background: '#f5f5f5 !important' }}>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Full Name</th>
                                                    <th>Email</th>
                                                    <th>Phone Number</th>
                                                    <th>Design Details</th>
                                                    <th>Request Date</th>
                                                    <th>Status</th>
                                                    <th>Action</th>

                                                    <th>View</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredData?.map((req, index) => (
                                                    <tr key={req.request_id}>
                                                        <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                                                        <td>{req.full_name}</td>
                                                        <td>{req.email}</td>
                                                        <td>{req.phone_number}</td>
                                                        <td style={{ maxWidth: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            {req.design_details}
                                                        </td>
                                                        <td>{formatDate(req.request_date)}</td>
                                                        <td>
                                                            <span
                                                                className={`badge ${req.request_status === 'pending' ? 'bg-warning' :
                                                                    req.request_status === 'completed' ? 'bg-success' :
                                                                        req.request_status === 'cancelled' ? 'bg-danger' :
                                                                            'bg-secondary'
                                                                    }`}
                                                            >
                                                                {req.request_status.charAt(0).toUpperCase() + req.request_status.slice(1)}
                                                            </span>

                                                        </td>
                                                        <td>
                                                            <select
                                                                className="form-select "
                                                                aria-label="Default select example"
                                                                style={{ width: '150px' }}
                                                                value={req.request_status}
                                                                onChange={(e) =>
                                                                    handleStatusChange(req.request_id, e.target.value)
                                                                }
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="completed">Completed</option>
                                                                <option value="cancelled">Cancelled</option>
                                                            </select>
                                                        </td>

                                                        <td>
                                                            <ul>
                                                                <li onClick={() => handleModal(req)}>
                                                                    <a style={{ cursor: 'pointer' }}>
                                                                        <i className="ri-eye-line" />
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                ))}


                                                {filteredData.length === 0 && <tr><td colSpan="9">No data found</td></tr>}
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
                                                            <span className="page-link">...</span>
                                                        </li>
                                                    )
                                                }
                                                return null
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

                    {/* View Modal */}
                    <Modal show={zoomModal} onHide={() => setZoomModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Request Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedRequest && (
                                <div className="">
                                    <div className="mb-3">
                                        <strong>Full Name:</strong>
                                        <div>{selectedRequest.full_name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Email:</strong>
                                        <div>{selectedRequest.email}</div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Phone Number:</strong>
                                        <div>{selectedRequest.phone_number}</div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Product/Service:</strong>
                                        <div>{selectedRequest.product_or_service_name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Design Details:</strong>
                                        <div style={{ whiteSpace: 'pre-wrap' }}>{selectedRequest.design_details}</div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Status:</strong>
                                        <div>{selectedRequest.request_status}</div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Request Date:</strong>
                                        <div>{formatDate(selectedRequest.request_date)}</div>
                                    </div>
                                </div>

                            )}
                        </Modal.Body>
                    </Modal>
                </div>

            </div>
            <AppFooter />
        </div>


    )
}

export default CustomQueryListComponent
