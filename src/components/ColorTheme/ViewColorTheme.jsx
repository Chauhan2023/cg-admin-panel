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

function ViewColorTheme({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} centered size="md">
      <ModalHeader toggle={toggle}>
        <h5 className="modal-title">Colours Details</h5>
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>Background Color Name:</strong>
                  <div className="text-muted">{data.background_color_area_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Background Color:</strong>
                  <div className="text-muted">{data.background_color || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Text Color Name:</strong>
                  <div className="text-muted">{data.text_color_name || 'N/A'}</div>
                </div>
              </Col>
              <Col md="6">
                <div className="mb-3">
                  <strong>Text Color:</strong>
                  <div className="text-muted">{data.text_color || 'N/A'}</div>
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

export default ViewColorTheme
