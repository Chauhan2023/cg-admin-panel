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

function ShowHeaderAds({ modal, toggle, data }) {
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
                  <strong>Ads Name:</strong>
                  <div className="text-muted">{data.ads_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Description:</strong>
                  <div className="text-muted">{data.ads_description || 'N/A'}</div>
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
              <Col md="6">
                <div className="mb-3">
                  <strong>Ads Link:</strong>
                  <div className="text-muted">
                    <a href={data.ads_link || '#'} target="_blank" rel="noopener noreferrer">
                      {data.ads_link || 'N/A'}
                    </a>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Created On:</strong>
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

export default ShowHeaderAds
