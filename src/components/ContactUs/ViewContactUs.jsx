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

function ViewContactUs({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Contact Us Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>First Name:</strong>
                  <div className="text-muted">{data.first_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Last Name:</strong>
                  <div className="text-muted">{data.last_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Phone:</strong>
                  <div className="text-muted">{data.phone || 'N/A'}</div>
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <strong>Email:</strong>
                  <div className="text-muted">{data.email || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Message:</strong>
                  <div className="text-muted">{data.message || 'N/A'}</div>
                </div>
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

export default ViewContactUs;