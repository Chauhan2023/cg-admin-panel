import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClients } from '../../Apis/api';

const DeleteSubcategoryModal = ({ modal, toggle, data, onSave }) => {


  const handleDelete = async () => {
    try {
        const response = await axiosClients.delete(`/deleteSubcategoryById/${data.subcategory_id}`, {
            method: 'DELETE',
        });
        toast.success("Subcategory Delete Successfully.");
        onSave();
        toggle();
    } catch (error) {
        console.error('Error:', error);
    }
};

  
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Subcategory Details</ModalHeader>
      <ModalBody>
        Are you sure to delete this Subcategory ?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          No
        </Button>
        <Button onClick={handleDelete} color="primary">
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteSubcategoryModal;
