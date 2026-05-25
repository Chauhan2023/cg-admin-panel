import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { apiPost } from '../../Api/apiMethods';

const ThreeSixtyViewUpload = ({ show, handleClose, kitBoxId, fetch }) => {
    const [kitImages, setKitImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setKitImages(files);
    };

    const handleUpload = async () => {
        if (!kitImages.length) {
            toast.warning('Please select at least one image.');
            return;
        }

        const formData = new FormData();
        formData.append('kitBoxId', kitBoxId);
        kitImages.forEach((file) => formData.append('kitImages', file));

        try {
            await apiPost('/addMultipleKitImg', formData,true); // Replace with correct API route
            fetch()
            toast.success('Images uploaded successfully!');
            setKitImages([]);
            handleClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Upload failed!');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="sm" centered>
            <Modal.Header closeButton>
                <Modal.Title>Upload 360° Images</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Select Images</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                        />
                    </Form.Group>
                </Form>
                {kitImages.length > 0 && (
                    <div className="mt-2 small text-muted">
                        {kitImages.length} image(s) selected
                    </div>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ThreeSixtyViewUpload;
