import React from 'react'
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap'
import { axiosClients } from '../../Apis/api'

const DeleteNewsEmailLetter = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteNewsEmailLetterById/${data.email_id}`, {
        method: 'DELETE',
      })

      toast.success('Email Delete Successfully.')
      toggle()
      onSave()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Email Details</ModalHeader>
      <ModalBody>Are you sure to delete this Email ?</ModalBody>
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

export default DeleteNewsEmailLetter