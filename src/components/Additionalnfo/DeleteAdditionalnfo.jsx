import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClient } from '../../Apis/api';

const DeleteAdditionalnfo = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClient(`/deleteAdditionInfoById/${data.addition_id}`, {
        method: 'DELETE',
      });
        toast.success("Additional Info Delete Successful");
        onSave();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Additional Info Details</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this Additional Info?
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggle}>
          No
        </Button>
        <Button color="primary" onClick={handleDelete}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteAdditionalnfo; 