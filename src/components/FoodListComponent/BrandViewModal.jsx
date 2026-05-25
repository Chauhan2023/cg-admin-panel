import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody } from 'reactstrap'


function BrandViewModal({ modal, toggle, data }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg" className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>View Brand Details</ModalHeader>
        <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col >
                <div className="mb-3">
                  <strong>Brand Name:</strong>
                  <div className="text-muted">{data.brand_name || 'N/A'}</div>
                </div>
              </Col>
              <Col >
                <div className="mb-3 d-flex">
                  <strong>Status:</strong>
                  <div className={`text-muted badge ${data.status === "Active" ? "bg-success"  :"bg-danger"}`}>{data.status || 'N/A'}</div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default BrandViewModal
