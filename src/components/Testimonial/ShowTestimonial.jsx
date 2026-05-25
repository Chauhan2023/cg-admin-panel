import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody } from 'reactstrap';

function ShowTestimonial({ modal, toggle, data }) { 
  if (!data) return null;

  return (
    <Modal isOpen={modal}  toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Testimonial Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col >
                <div className="mb-3">
                  <strong>Name:</strong>
                  <div className="text-muted">{data.name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Position:</strong>
                  <div className="text-muted">{data.position || 'N/A'}</div>
                </div>
              </Col>
              <Col >
                <div className="mb-3">
                  <strong>Title:</strong>
                  <div className="text-muted">{data.title || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Status:</strong>
                  <td>
                          <span className={`badge ${data.status === "active" ? "bg-success" : "bg-danger"}`}>{data.status}</span>
                        </td>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ShowTestimonial;