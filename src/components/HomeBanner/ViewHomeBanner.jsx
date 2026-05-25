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

function ViewHomeBanner({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="lg">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Home Banner Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <strong>Banner Heading:</strong>
                  <div className="text-muted">{data.banner_heading || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Banner Text:</strong>
                  <div className="text-muted">{data.banner_text || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Created Date:</strong>
                  <div className="text-muted">{formatDate(data.created_at) || 'N/A'}</div>
                </div>
              </Col>
              <Col md={6}>
                <div className="mb-3">
                  <strong>Banner Image:</strong>
                  <div>
                    {data.banner_image ? (
                      <img
                        src={data.banner_image}
                        alt="Banner"
                        className="img-fluid rounded"
                        style={{ maxHeight: '250px', objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="text-muted">No image available</div>
                    )}
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

export default ViewHomeBanner
