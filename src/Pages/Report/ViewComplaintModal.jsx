import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { formatDate } from '../../utils/formatDate'

const ViewComplaintModal = ({ isOpen, toggle, report }) => {
  if (!report) return null;

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={toggle}>Complaint Details</ModalHeader>
      <ModalBody>
        <div className="container">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Order Number:</strong> {report.order_number}
            </div>
            <div className="col-md-6">
              <strong>Status:</strong> {report.status || 'Pending'}
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Complaint Type:</strong> {report.complaint_type || report.complaintType}
            </div>
            <div className="col-md-6">
              <strong>Created Date:</strong> {formatDate(report.created_at || report.createdAt)}
            </div>
          </div>
          <div className="row mb-3">
             <div className="col-md-12">
               <strong>Description:</strong>
               <p className="mt-2 p-2 border rounded bg-light">{report.description}</p>
             </div>
          </div>
          <div className="row mb-3">
             <div className="col-md-12">
               <strong>Admin Response:</strong>
               <p className="mt-2 p-2 border rounded bg-light">{(report.admin_response || report.adminResponse) ? (report.admin_response || report.adminResponse) : 'No response yet.'}</p>
             </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewComplaintModal
