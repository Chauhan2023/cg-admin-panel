import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody } from 'reactstrap';

function ShowAdditionalnfo({ modal, toggle, data }) {
  if (!data) return null;
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
    <ModalHeader toggle={toggle}>
      <h5 className="modal-title">Ads Details</h5>
    </ModalHeader>
    <ModalBody>
      <Card className="shadow-sm">
        <CardBody>
          <Row>
            <Col md="6">
              <div className="mb-3">
                <strong>Specialty:</strong>
                <div className="text-muted">{data.specialty || 'N/A'}</div>
              </div>
              <div className="mb-3">
                <strong>Ingredient Type:</strong>
                <div className="text-muted">{data.ingredient_type || 'N/A'}</div>
              </div>
              <div className="mb-3">
                <strong>Brand:</strong>
                <div>
                  {data.brand || 'N/A'}
                </div>
              </div>
            </Col>
            <Col md="6">
            <div className="mb-3">
                <strong>Form:</strong>
                <div>
                  {data.form || 'N/A'}
                </div>
              </div>
              <div className="mb-3">
                <strong>Package Information:</strong>
                <div>
                  {data.package_information || 'N/A'}
                </div>
              </div>
              <div className="mb-3">
                <strong>Manufacture:</strong>
                <div>
                  {data.manufacture || 'N/A'}
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

export default ShowAdditionalnfo; 