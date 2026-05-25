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

function ViewShowcasebox({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Showcasebox Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col>
                <div className="mb-3">
                  <strong>Heading:</strong>
                  <div className="text-muted">{data.heading || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Title:</strong>
                  <div className="text-muted">{data.title || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Link:</strong>
                  <div className="text-muted">{data.link || 'N/A'}</div>
                </div>
              </Col>
              <Col>
                <div className="mb-3">
                  <strong>Created Date:</strong>
                  <div className="text-muted">{formatDate(data.created_at) || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Status:</strong>
                  <td>
                    <span
                      className={`badge ${data.status === 'active' ? 'bg-success' : 'bg-danger'}`}
                    >
                      {data.status}
                    </span>
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
  )
}

export default ViewShowcasebox
