import React from 'react'
import toast from 'react-hot-toast'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClient } from '../../Apis/api'

const DeleteOrderModal = ({ modal, toggle, data }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClient.delete(`/deleteOrderById/${data.order_id}`, {
        method: 'DELETE',
      })

      toast.success('Order Delete Successfully.')
      toggle()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Order Details</ModalHeader>
      <ModalBody>Are you sure to delete this Order ?</ModalBody>
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

export default DeleteOrderModal
