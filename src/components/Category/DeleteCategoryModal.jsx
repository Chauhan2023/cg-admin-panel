import React from 'react';
import toast from 'react-hot-toast';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Row,
  Col
} from 'reactstrap';
import { apiDelete } from '../../Api/apiMethods';

const DeleteCategoryModal = ({ modal, toggle, data, onSave }) => {
  const handleDelete = async () => {
    try {
      await apiDelete(`/deleteCategoryById/${data.category_id}`);
      toast.success('Category deleted successfully.');
      toggle();
      onSave();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to delete category.');
    }
  };

  return (
    <Modal isOpen={modal} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>Confirm Delete</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete the following category?</p>
        <Row className="rounded p-2 ">
          <Col md="4" className="text-center">
            <img
              src={data.category_url}
              alt="Category"
              className="img-fluid rounded"
              style={{ maxHeight: '100px' }}
            />
          </Col>
          <Col md="8">
            <div>
              <strong>Name:</strong> {data.category_name || 'N/A'}
            </div>
            <div>
              <strong>Description:</strong> {data.category_desc || 'N/A'}
            </div>
            <div>
              <strong>Status:</strong>{' '}
              <span className={`badge ${data.status === 'inactive' ? 'bg-danger' : 'bg-success'}`}>
                {data.status}
              </span>
            </div>
            <div>
              <strong>Dimensions (HxW):</strong>{' '}
              {data.height || 'N/A'} × {data.width || 'N/A'}
              {data.length ? ` × ${data.length}` : ''}
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          No, Cancel
        </Button>
        <Button color="danger" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteCategoryModal;
