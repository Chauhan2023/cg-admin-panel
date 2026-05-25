import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ShowHeaderAds from './ShowHeaderAds'
import EditHeaderAds from './EditHeaderAds'
import DeleteHeaderAds from './DeleteHeaderAds'
import { axiosClients } from '../../Apis/api'

function AllHeaderAdsTable() {
  const [datas, setData] = useState([])
  const [modal, setModal] = useState(false)
  const [editToggleModal, setEditToggleModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedHeaderAds, setSelectedHeaderAds] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [adsPerPage] = useState(10)

  const fetchData = async (isAdmin = 'true') => {
    try {
      const response = await axiosClients.get(`/getAllHeaderAds?isAdmin=${isAdmin}`)
      setData(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Pagination logic
  const indexOfLastAd = currentPage * adsPerPage
  const indexOfFirstAd = indexOfLastAd - adsPerPage
  const currentAds = datas.slice(indexOfFirstAd, indexOfLastAd)
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
  const deleteToggle = (ads) => {
    setSelectedHeaderAds(ads)
    setDeleteModal(!deleteModal)
    fetchData()
  }

  const handleViewProduct = (ads) => {
    setSelectedHeaderAds(ads)
    toggleModal()
  }

  const editToggle = () => setEditToggleModal(!editToggleModal)
  const handleEditModal = (ads) => {
    setSelectedHeaderAds(ads)
    fetchData()
    editToggle()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <div className="card card-table">
            <div className="card-body">
              <div className="title-header option-title d-sm-flex d-block">
                <h5>Ads List</h5>
                <div className="right-options">
                  <ul>
                    <li>
                      <Link className="btn btn-dashed" to="/addheaderads">
                        Add Ads
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <table className="table category-table dataTable no-footer" id="table_id">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Ads Name</th>
                      <th>Ads Description</th>
                      <th>Status</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAds.map((ad, i) => (
                      <tr key={i}>
                        <td>{indexOfFirstAd + i + 1}</td>
                        <td>
                          {ad.ads_name
                            ? ad.ads_name.length > 40
                              ? `${ad.ads_name.substring(0, 50)}...`
                              : ad.ads_name
                            : 'N/A'}
                        </td>
                        <td>
                          {ad.ads_description
                            ? ad.ads_description.length > 40
                              ? `${ad.ads_description.substring(0, 45)}...`
                              : ad.ads_description
                            : 'N/A'}
                        </td>
                        <td>
                          <span
                            className={`badge ${ad.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                          >
                            {ad.status}
                          </span>
                        </td>
                        <td>
                          <ul className="d-flex gap-3">
                            <li onClick={() => handleViewProduct(ad)}>
                              <a href="#" className="text-warning">
                                <i className="ri-eye-line"></i>
                              </a>
                            </li>
                            <li onClick={() => handleEditModal(ad)}>
                              <a href="#">
                                <i className="ri-pencil-line text-success"></i>
                              </a>
                            </li>
                            <li onClick={() => deleteToggle(ad)}>
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
      {selectedHeaderAds && (
        <>
          <ShowHeaderAds modal={modal} toggle={toggleModal} data={selectedHeaderAds} />
          <EditHeaderAds
            modal={editToggleModal}
            toggle={editToggle}
            data={selectedHeaderAds}
            onSave={fetchData}
          />
          <DeleteHeaderAds
            modal={deleteModal}
            toggle={deleteToggle}
            data={selectedHeaderAds}
            onSave={fetchData}
          />
        </>
      )}
    </div>
  )
}

export default AllHeaderAdsTable
