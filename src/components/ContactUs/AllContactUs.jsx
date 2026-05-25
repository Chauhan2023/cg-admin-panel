import React, { useEffect, useState } from 'react'
import ShowHeaderAds from './ViewContactUs'
import DeleteContactUs from './DeleteContactUs'
import { axiosClients } from '../../Apis/api'
import { formatDate } from '../../utils/formatDate'

function AllContactUs() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [selectedContactUs, setSelectedContactUs] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)

  const fetchData = async () => {
    try {
      const response = await axiosClients.get('/getAllContact')
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const toggleDeleteModal = () => setDeleteModal(!deleteModal)

  const handleDeleteContactUs = (contact) => {
    setSelectedContactUs(contact)
    setModal(false)
    toggleDeleteModal()
  }

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage
  const indexOfFirstAd = indexOfLastAd - adsPerPage
  const currentContactUs = datas.slice(indexOfFirstAd, indexOfLastAd)
  const totalPages = Math.ceil(datas.length / adsPerPage)

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handlePageSelect = (page) => setCurrentPage(page)
  const toggleModal = () => setModal(!modal)

  const handleViewContactus = (contact) => {
    setSelectedContactUs(contact)
    toggleModal()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Contact Us List</h5>
              </div>
              <div>
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Message</th>
                      <th>Created Date</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContactUs?.map((contact, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          {contact.first_name
                            ? contact.first_name.length > 40
                              ? `${contact.first_name.substring(0, 50)}...`
                              : contact.first_name
                            : 'N/A'}
                        </td>
                        <td>
                          {contact.last_name
                            ? contact.last_name.length > 40
                              ? `${contact.last_name.substring(0, 45)}...`
                              : contact.last_name
                            : 'N/A'}
                        </td>
                        <td>
                          {contact.phone
                            ? contact.phone.length > 40
                              ? `${contact.phone.substring(0, 45)}...`
                              : contact.phone
                            : 'N/A'}
                        </td>
                        <td>
                          {contact.email
                            ? contact.email.length > 40
                              ? `${contact.email.substring(0, 45)}...`
                              : contact.email
                            : 'N/A'}
                        </td>
                        <td>
                          {contact.message
                            ? contact.message.length > 40
                              ? `${contact.message.substring(0, 30)}...`
                              : contact.message
                            : 'N/A'}
                        </td>
                        <td>{formatDate(contact.created_at)}</td>

                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewContactus(contact)}>
                              <a className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleDeleteContactUs(contact)}>
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
      {selectedContactUs && (
        <>
          <ShowHeaderAds modal={modal} toggle={toggleModal} data={selectedContactUs} />
          <DeleteContactUs
            modal={deleteModal}
            toggle={toggleDeleteModal}
            data={selectedContactUs}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  )
}

export default AllContactUs
