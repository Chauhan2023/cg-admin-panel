import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import toast from 'react-hot-toast';
import { axiosClient } from '../../Apis/api'

function EditAdditionalnfo({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    specialty: '',
    IngredientType: '',
    brand: '',
    form: '',
    packageInformation: '',
    manufacture: ''
  })

  useEffect(() => {
    if (data) {
      setFormData({
        specialty: data.specialty || '',
        IngredientType: data.ingredient_type || '',
        brand: data.brand || '',
        form: data.form || '',
        packageInformation: data.package_information || '',
        manufacture: data.manufacture || ''
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
      const response = await axiosClient.put(
        `/editAdditionInfoId/${data.addition_id}`,
        formData
      )
      toast.success('additional Info updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating additional Info:', error)
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Additional Info Details</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Additional Info</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Specialty</h6>
                            <input
                              type="text"
                              name="specialty"
                              value={formData.specialty}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Ingredient Type</h6>
                            <input
                              type="text"
                              name="IngredientType"
                              value={formData.IngredientType}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Brand</h6>
                            <input
                              type="text"
                              name="brand"
                              value={formData.brand}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Form</h6>
                            <input
                              type="text"
                              name="form"
                              value={formData.form}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Package Information</h6>
                            <input
                              type="text"
                              name="packageInformation"
                              value={formData.packageInformation}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Manufacture</h6>
                            <input
                              type="text"
                              name="manufacture"
                              value={formData.manufacture}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
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

export default EditAdditionalnfo;