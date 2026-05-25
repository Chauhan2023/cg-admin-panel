import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClient } from '../../Apis/api';

const DeleteCareInstruction = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClient.delete(`/deleteCareInstructionById/${data.care_id}`, {
        method: 'DELETE',
      });
        toast.success("Care Instruction Delete Successfully.");
        onSave();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Care Instruction Details</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this Care Instruction?
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

export default DeleteCareInstruction; 