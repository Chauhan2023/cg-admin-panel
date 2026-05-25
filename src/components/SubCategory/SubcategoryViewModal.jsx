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

function SubcategoryViewModal({ modal, toggle, data }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg" className="modal-dialog-centered">
        <ModalHeader toggle={toggle}>View Subcategory Details</ModalHeader>
        <ModalBody>
          <Card className="shadow-sm">
            <CardBody>
              <Row>
                <Col md="6">
                  <div className="mb-3">
                    <strong>Subcategory Name:</strong>
                    <div className="text-muted">{data.subcategory_name || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Description:</strong>
                    <div className="text-muted">{data.description || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Category Name:</strong>
                    <div className="text-muted">{data.category_name || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Main Category Name:</strong>
                    <div className="text-muted">{data.main_category_name || 'N/A'}</div>
                  </div>
                </Col>
                <Col md="6">
                  <div className="mb-3">
                    <strong>Status:</strong>
                    <span
                      className={`badge m-2 ${data.subcategory_status === 'active' ? 'bg-success' : 'bg-danger'}`}
                    >
                      {data.subcategory_status}
                    </span>
                  </div>
                  <div className="mb-3">
                    <strong>Created Date:</strong>
                    <div className="text-muted">{formatDate(data.subcategory_created_at) || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Updated Date:</strong>
                    <div className="text-muted">{formatDate(data.subcategory_updated_at) || 'N/A'}</div>
                  </div>
                  <div className="mb-3">
                    <strong>Dimensions (HxW):</strong>
                    <div className="text-muted">{`${data.subcategory_height || 'N/A'} x ${data.subcategory_width || 'N/A'}`}</div>
                  </div>
                  {data.category_url && (
                    <div className="mb-3">
                      <strong>Category Image:</strong>
                      <div>
                        <a href={data.category_url} target="__blank" rel="noopener noreferrer">
                          <img
                            src={data.category_url}
                            alt="Category"
                            className="img-fluid rounded border"
                            style={{ maxHeight: '100px', marginTop: '10px' }}
                          />
                        </a>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </CardBody>
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default SubcategoryViewModal