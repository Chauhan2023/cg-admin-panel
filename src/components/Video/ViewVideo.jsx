import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody } from 'reactstrap';

function ViewVideo({ modal, toggle, data }) { 
  if (!data) return null;

  return (
    <Modal isOpen={modal}  toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Video Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col >
                <div className="mb-3">
                  <strong>Video Heading:</strong>
                  <div className="text-muted">{data.video_heading || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Video Text:</strong>
                  <div className="text-muted">{data.video_text || 'N/A'}</div>
                </div>
              </Col>
              <Col >
                <div className="mb-3">
                  <strong>Status:</strong>
                  <div >
                    <span className={`badge text-white ${data.status === "active" ? "bg-success" : "bg-danger"}`}>{data.status || 'N/A'}</span>
                  </div>
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

export default ViewVideo;