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
} from 'reactstrap';
import { formatDate } from '../../utils/formatDate';


function ViewProductReview({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Product Review Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>Product Name:</strong>
                  <div className="text-muted">{data.product_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>User Name:</strong>
                  <div className="text-muted">{data.name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Email:</strong>
                  <div className="text-muted">{data.email || 'N/A'}</div>
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <strong>Comment:</strong>
                  <div className="text-muted">{data.comment || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Rating:</strong>
                  <div className="text-muted">{data.rating || 'N/A'}</div>
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

export default ViewProductReview;