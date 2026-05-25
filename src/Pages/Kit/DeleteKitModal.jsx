import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { apiDelete } from '../../Api/apiMethods';
import toast from 'react-hot-toast';

function DeleteKitModal({ modal, toggle, data, onDelete }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!data || !data.kit_box_id) {
            toast.error('Invalid kit box data');
            return;
        }

        setIsDeleting(true);
        try {
            const response = await apiDelete(`/deleteKitBox/${data.kit_box_id}`);

            if (response.status === 200) {
                toast.success('Kit box deleted successfully');
                onDelete(); // Refresh the list
                toggle(); // Close the modal
            } else {
                toast.error('Failed to delete kit box');
            }
        } catch (error) {
            console.error('Error deleting kit box:', error);
            toast.error(error.response?.data?.message || 'Failed to delete kit box');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} centered>
            <ModalHeader toggle={toggle}>Delete Kit Box</ModalHeader>
            <ModalBody>
                <p>Are you sure you want to delete the kit box "{data?.box_name}"?</p>
                <p className="text-danger">This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={handleDelete} disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default DeleteKitModal;