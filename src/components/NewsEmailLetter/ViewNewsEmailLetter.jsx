import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap'
import { formatDate } from '../../utils/formatDate';


function ViewNewsEmailLetter({ modal, toggle, data }) {
  if (!data) return null

  return (
    <Modal isOpen={modal} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Email Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
              <div className="mb-3">
                  <strong>Email:</strong>
                  <div className="text-muted">{data.email || 'N/A'}</div>
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <strong>Created Date:</strong>
                  <div className="text-muted">
                    {data.created_at ? formatDate(data.created_at) : 'N/A'}
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
  )
}

export default ViewNewsEmailLetter;