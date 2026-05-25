import React from 'react';
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

function ViewModalCategory({ modal, toggle, data }) {
  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>View Category Details</ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>Category Name:</strong>
                  <div className="text-muted">{data.category_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Description:</strong>
                  <div className="text-muted">{data.category_desc || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Main Category Name:</strong>
                  <div className="text-muted">{data.main_category_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Slug:</strong>
                  <div className="text-muted">{data.slug || 'N/A'}</div>
                </div>
              </Col>

              <Col md="6">
                <div className="mb-3">
                  <strong>Status:</strong>
                  <span
                    className={`badge ${data.status === 'inactive' ? 'bg-danger' : 'bg-success'} ms-2`}
                  >
                    {data.status}
                  </span>
                </div>

                {data.category_url && (
                  <div className="mb-3">
                    <strong>Image Preview:</strong>
                    <div>
                      <a href={data.category_url} target="__blank">
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
  );
}

export default ViewModalCategory;