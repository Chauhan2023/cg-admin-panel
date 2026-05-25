import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosClients } from '../../Apis/api'

function AddHeaderAds() {
  const [formData, setFormData] = useState({
    adName: '',
    adDescription: '',
    adLink: '',
    status: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosClients.post('/createHeaderAds', formData)
      toast.success('Header ads created successfully.')
      navigate('/headerads')
    } catch (error) {
      toast.error('Error creating header ad.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Header Ads</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Ads Name<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="adName" // Correct name attribute
                          placeholder="Ads Name"
                          value={formData.adName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Ads Description<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="adDescription" // Correct name attribute
                          placeholder="Ads Description"
                          value={formData.adDescription}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Ads Link<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="adLink" // Correct name attribute
                          placeholder="Ads Link"
                          value={formData.adLink}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Select Status<span className="text-danger">*</span>
                        </h6>
                        <select
                          name="status"
                          className="w-100"
                          value={formData.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddHeaderAds
