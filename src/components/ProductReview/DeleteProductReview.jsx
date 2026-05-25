import React from 'react'
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClients } from '../../Apis/api'

const DeleteProductReview = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteReviewById/${data.review_id}`, {
        method: 'DELETE',
      })

      toast.success('Review Delete Successfully.')
      toggle()
      onSave()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Review Details</ModalHeader>
      <ModalBody>Are you sure to delete this Review ?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          No
        </Button>
        <Button onClick={handleDelete} color="primary">
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DeleteProductReview