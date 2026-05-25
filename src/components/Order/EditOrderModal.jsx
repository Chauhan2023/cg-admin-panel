import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditOrderModal({ show, handleClose, data, onSave }) {
  const [formData, setFormData] = useState({
    orderStatus : '',
  })

  useEffect(() => {
    if (data) {
      setFormData({
        orderStatus: data.order_status || ''
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
      const response = await axiosClients.put(
        `/editOrderById/${data.order_id}`,
        formData
      )
      toast.success('Status updated successfully.')
      onSave();
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }
  
  return (
    <div>
      <Modal isOpen={show} toggle={handleClose} size="md" className="modal-dialog-centered">
        <ModalHeader toggle={handleClose}>Edit Order Status</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Status</h6>
                            <select
                              name="orderStatus"
                              value={formData.orderStatus}
                              onChange={handleChange}
                              className="form-control"
                              required
                            >
                              <option value="">Select Status</option>
                              <option value="Pending">Pending</option>
                              {/* <option value="Processing">Processing</option> */}
                              <option value="Shipped">Shipped</option>
                              {/* <option value="Delivered">Delivered</option> */}
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleClose}>
            Close
          </Button>
          <Button color="primary" type="submit" onClick={handleSubmit}>
            Save Changes
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditOrderModal;
