import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { axiosClients } from '../../Apis/api'
import toast from 'react-hot-toast'

function EditHeaderAds({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    adName: '',
    adDescription: '',
    adLink: '',
    status: '',
  })

  useEffect(() => {
    if (data) {
      setFormData({
        adName: data.ads_name || '',
        adDescription: data.ads_description || '',
        adLink: data.ads_link || '',
        status: data.status || '',
      })
    }
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axiosClients.put(`/editHeaderAdsById/${data.ads_id}`, formData)
      toast.success('Ads updated successfully.')
      onSave()
      toggle()
    } catch (error) {
      console.error('Error updating ad:', error)
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Header Ads</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Header Ads Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Ads Name</h6>
                            <input
                              type="text"
                              name="adName"
                              value={formData.adName}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Ads Description</h6>
                            <input
                              type="text"
                              name="adDescription"
                              value={formData.adDescription}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Ads Link</h6>
                            <input
                              type="text"
                              name="adLink"
                              value={formData.adLink}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Status</h6>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="form-control"
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
              </div>
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" type="submit">
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default EditHeaderAds
