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

function ViewModalKit({ modal, toggle, data }) {
  // Parse multiple images if available
  let multipleImages = [];
  try {
    if (data.multiple_image) {
      console.log("Parsing multiple_image:", data);
      multipleImages = JSON.parse(data?.multiple_image);
    }
  } catch (e) {
    console.error("Error parsing multiple_image:", e);
  }

  // Parse box property if available
  let boxProperty = '';
  try {
    if (data.box_property) {
      boxProperty = JSON.parse(data.box_property);
    }
  } catch (e) {
    console.error("Error parsing box_property:", e);
    boxProperty = data.box_property;
  }

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" className="modal-dialog-centered">
      <ModalHeader toggle={toggle}>View Kit Box Details</ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                <div className="mb-3">
                  <strong>Box Name:</strong>
                  <div className="text-muted">{data.box_name || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Description:</strong>
                  <div className="text-muted">{data.box_description || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Box Size:</strong>
                  <div className="text-muted">{data.box_size || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Box Property:</strong>
                  <div className="text-muted">{boxProperty || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Price:</strong>
                  <div className="text-muted">Rs.{parseFloat(data.box_price).toFixed(2) || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Dimensions (H×W×L):</strong>
                  <div className="text-muted">
                    {data.height || 'N/A'} × {data.width || 'N/A'} × {data.length || 'N/A'}
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Weight:</strong>
                  <div className="text-muted">{data.kit_weight || 'N/A'}</div>
                </div>
              </Col>

              <Col md="6">
                <div className="mb-3">
                  <strong>Status:</strong>
                  <span
                    className={`badge ${data.is_show === 'Y' ? 'bg-success' : 'bg-danger'} ms-2`}
                  >
                    {data.is_show === 'Y' ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="mb-3">
                  <strong>Created At:</strong>
                  <div className="text-muted">{formatDate(data.created_at) || 'N/A'}</div>
                </div>
                <div className="mb-3">
                  <strong>Updated At:</strong>
                  <div className="text-muted">{formatDate(data.updated_at) || 'N/A'}</div>
                </div>
                {data.die_image && (
                  <div className="mb-3">
                    <strong>Die Image:</strong>
                    <div>
                      <a href={data.die_image} target="_blank" rel="noopener noreferrer">
                        <img
                          src={data.die_image}
                          alt="Die Image"
                          className="img-fluid rounded border"
                          style={{ maxHeight: '100px', marginTop: '10px' }}
                        />
                      </a>
                    </div>
                  </div>
                )}
              </Col>
            </Row>


            {/* Multiple Images Gallery */}
            {multipleImages?.length > 0 && (
              <Row className="mt-3">
                <Col md="12">
                  <strong>Product Images:</strong>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {multipleImages?.map((img, index) => (
                      <a
                        key={index}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border rounded p-1"
                      >
                        <img
                          src={img}
                          alt={`Product ${index + 1}`}
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      </a>
                    ))}
                  </div>
                </Col>
              </Row>
            )}
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

export default ViewModalKit;