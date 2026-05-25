import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClient } from '../../Apis/api'

const EditComplaintModal = ({ isOpen, toggle, report, refreshData }) => {
  const [status, setStatus] = useState('')
  const [adminResponse, setAdminResponse] = useState('')

  useEffect(() => {
    if (report) {
      setStatus(report.status || 'Pending')
      setAdminResponse(report.admin_response || report.adminResponse || '')
    }
  }, [report])

  const handleUpdate = async () => {
    try {
      const reportId = report.report_id || report._id || report.reportId || report.id;
      const response = await axiosClient.put(`/orderReportUpdate/${reportId}`, {
        status,
        adminResponse
      })
      toast.success('Complaint Updated Successfully.')
      refreshData()
      toggle()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to update complaint')
    }
  }

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Complaint</ModalHeader>
      <ModalBody>
        <div className="form-group mb-3">
          <label className="fw-bold mb-2">Status</label>
          <select 
            className="form-control" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="form-group mb-3">
           <label className="fw-bold mb-2">Admin Response</label>
           <textarea
             className="form-control"
             rows="4"
             value={adminResponse}
             onChange={(e) => setAdminResponse(e.target.value)}
             placeholder="Enter response for user..."
           ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditComplaintModal
