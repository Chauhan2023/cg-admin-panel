import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import toast from 'react-hot-toast';
import { axiosClient } from '../../Apis/api'

function EditCareInstruction({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    careInstruction: '',
  })

  useEffect(() => {
    if (data) {
      setFormData({
        careInstruction: data.care_instruction || ''
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
        `/editCareInstructionById/${data.care_id}`,
        formData
      )
      toast.success('Care Instruction updated successfully.')
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating Care Instruction:', error)
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Care Instruction</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Care Instruction Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Care Instruction</h6>
                            <input
                              type="text"
                              name="careInstruction"
                              value={formData.careInstruction}
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

export default EditCareInstruction
