import React from 'react';
import toast from 'react-hot-toast';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { axiosClients } from '../../Apis/api';

const DeleteVideo = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      const response = await axiosClients.delete(`/deleteVideoById/${data.video_id}`, {
        method: 'DELETE',
      });

      toast.success("Video Delete Successfully.");
      onSave()

      if (response.ok) {
        const responseData = await response.json();
      } else {
        console.error('Failed to delete video:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("There was an error deleting the video");
    } finally {
      toggle();
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Delete Video Details</ModalHeader>
      <ModalBody>
        Are you sure you want to delete this video?
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

export default DeleteVideo; 