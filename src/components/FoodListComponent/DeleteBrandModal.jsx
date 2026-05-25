import React from 'react';
import { toast } from 'react-toastify';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClient } from '../../Apis/api';

const DeleteBrandModal = ({ modal, toggle, data}) => {


  const handleDelete = async () => {
    try {
        const response = await axiosClient.delete(`/deleteBrandById/${data.brand_id}`, {
            method: 'DELETE',
        });
        toast.success("Brand Delete Successful")
        toggle();
    } catch (error) {
        console.error('Error:', error);
    }
};

  
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Brand Details</ModalHeader>
      <ModalBody>
        Are you sure to delete this Brand ?
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

export default DeleteBrandModal;
