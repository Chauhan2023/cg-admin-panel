import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClients } from '../../Apis/api';

const DeleteColorTheme = ({ modal, toggle, data, onSave }) => {

  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteColorById/${data.id}`, {
        method: 'DELETE',
      });
        toast.success("Color Delete Successfully.");
        onSave();
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error deleting the product");
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Color Details</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this color?
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

export default DeleteColorTheme;