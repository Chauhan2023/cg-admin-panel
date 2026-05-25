import React from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClient } from '../../Apis/api'

const DeleteComplaintModal = ({ modal, toggle, data, refreshData }) => {
  const handleDelete = async () => {
    try {
      const reportId = data.report_id || data._id || data.reportId || data.id;
      await axiosClient.delete(`/delete/${reportId}`)
      toast.success('Complaint Deleted Successfully.')
      refreshData()
      toggle()
    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete complaint')
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Complaint</ModalHeader>
      <ModalBody>Are you sure you want to delete this complaint?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          No
        </Button>
        <Button onClick={handleDelete} color="danger">
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteComplaintModal
