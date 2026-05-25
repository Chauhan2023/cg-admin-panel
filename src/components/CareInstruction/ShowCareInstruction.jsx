import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Card, CardBody } from 'reactstrap';

function ShowCareInstruction({ modal, toggle, data }) { 
  if (!data) return null;
  
  return (
    <Modal isOpen={modal}  toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Care Instruction Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col>
                <div className="mb-3">
                  <strong>Care Instruction:</strong>
                  <div className="text-muted">{data.care_instruction || 'N/A'}</div>
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

export default ShowCareInstruction; 