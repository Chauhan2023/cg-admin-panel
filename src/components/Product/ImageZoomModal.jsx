import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function ImageZoomModal({ modal, toggle, images, selectedImageIndex }) {
  const nextImage = () => {
    if (selectedImageIndex < images.length - 1) {
      toggle(selectedImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      toggle(selectedImageIndex - 1);
    }
  };

  return (
    <Modal isOpen={modal} toggle={() => toggle(null)} centered size="lg">
      <ModalHeader toggle={() => toggle(null)}>
        Product Image
      </ModalHeader>
      <ModalBody className="text-center">
        <img
          src={images[selectedImageIndex]}
          alt="Zoomed Product"
          className="img-fluid"
          style={{ maxHeight: '70vh', objectFit: 'contain' }}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={prevImage} disabled={selectedImageIndex === 0}>
          Previous
        </Button>
        <Button color="secondary" onClick={nextImage} disabled={selectedImageIndex === images.length - 1}>
          Next
        </Button>
        <Button color="primary" onClick={() => toggle(null)}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ImageZoomModal;
