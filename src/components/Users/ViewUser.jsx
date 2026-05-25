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
import { formatDate } from '../../utils/formatDate'

function ViewUser({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">User Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>Name:</strong>
                  <div className="text-muted">
                    {`${data.first_name || 'N/A'} ${data.last_name || ''}`.trim()}
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Mobile:</strong>
                  <div className="text-muted">{data.mobile_number || 'N/A'}</div>
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <strong>Email:</strong>
                  <div className="text-muted">{data.email || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Bio:</strong>
                  <div className="text-muted">{data.bio || 'N/A'}</div>
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

export default ViewUser
