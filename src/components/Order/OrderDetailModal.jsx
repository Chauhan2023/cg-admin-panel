import React from 'react';
import { Modal, Button, Row, Col, Image, Badge, Card } from 'react-bootstrap';
import { formatDate } from '../../utils/formatDate';
import OrderKitPreview from './OrderKitPreview';

function OrderDetailModal({ isOpen, onClose, order }) {
    if (!isOpen || !order) return null;

    const products = order?.product || [];
    const isKit = order?.is_kit === "Y";

    // Calculate total kit quantity
    let kitQuantity = 0;
    if (isKit) {
        let productsArray = order?.product;
        // Parse variant_image_url if it's a JSON string
        if (typeof productsArray === 'string') {
            try {
                productsArray = JSON.parse(productsArray);
            } catch (e) {
                // Ignore parsing errors
            }
        }
        
        if (Array.isArray(productsArray)) {
            productsArray.forEach(p => {
                if (p?.mainBox?.quantity) {
                    kitQuantity += Number(p.mainBox.quantity);
                }
            });
        }
    }

    const renderOrderDetails = () => (
        <Card className="mt-3">
            <Card.Body>
                <Card.Title>Order Details</Card.Title>
                <Row className="mb-2">
                    <Col sm={4} className="text-muted">Order Number:</Col>
                    <Col>{order?.order_number}</Col>
                </Row>
                <Row className="mb-2">
                    <Col sm={4} className="text-muted">Booking Date:</Col>
                    <Col>{formatDate(order?.created_at)}</Col>
                </Row>
                {isKit && kitQuantity > 0 && (
                    <Row className="mb-2">
                        <Col sm={4} className="text-muted">Kit Quantity:</Col>
                        <Col>{kitQuantity}</Col>
                    </Row>
                )}
                <Row className="mb-2">
                    <Col sm={4} className="text-muted">Status:</Col>
                    <Col>
                        <Badge bg={
                            order?.order_status === 'Completed' ? 'success' :
                                order?.order_status === 'Pending' ? 'warning' : 'primary'
                        }>
                            {order?.order_status}
                        </Badge>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col sm={4} className="text-muted">GST (₹):</Col>
                    <Col>₹{order?.gst_cost}</Col>
                </Row>
                <Row className="mb-2">
                    <Col sm={4} className="text-muted">Shipping Cost:</Col>
                    <Col>₹{order?.shipping_cost}</Col>
                </Row>
                <Row className="mb-2">
                    <Col sm={4} className="text-muted">Total Price:</Col>
                    <Col className="text-success fw-bold">₹{order?.total_price}</Col>
                </Row>
            </Card.Body>
        </Card>
    );

    return (
        <Modal show={isOpen} onHide={onClose} size="xl" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {!isKit ? (
                    <Row>
                        <Col md={6}>
                            <h5 className="mb-3">Product Details:</h5>
                            {products?.map((product, index) => {
                                let image = product.variant_image_url;
                                
                                // Parse variant_image_url if it's a JSON string
                                try {
                                    const parsedVariant = JSON.parse(image);
                                    image = Array.isArray(parsedVariant) ? parsedVariant[0] : parsedVariant;
                                } catch (e) {
                                    // Ignore, it might be a normal URL or empty
                                }

                                if (!image && product.product_image) {
                                    try {
                                        const parsed = JSON.parse(product.product_image);
                                        image = Array.isArray(parsed) ? parsed[0] : parsed;
                                    } catch (e) {
                                        image = '';
                                    }
                                }

                                return (
                                    <Row key={index} className="mb-4 border-bottom pb-3">
                                        <Col xs={4} className="d-flex flex-column align-items-center">
                                            {image ? (
                                                <Image src={image} fluid rounded className="border bg-light p-1 mb-2" style={{ maxHeight: '110px', objectFit: 'contain' }} />
                                            ) : (
                                                <div className="bg-light rounded border d-flex justify-content-center align-items-center text-muted w-100 mb-2" style={{ height: '110px', fontSize: '0.8rem' }}>
                                                    No Image
                                                </div>
                                            )}
                                            
                                            {/* Custom Design Logo explicitly shown */}
                                            {product.custom_image_url && (
                                                <div className="position-relative mt-2 p-1 bg-primary text-center" style={{ backgroundColor: 'rgba(13, 110, 253, 0.05)', border: '2px dashed rgba(13, 110, 253, 0.4)', borderRadius: '8px' }}>
                                                    <Image src={product.custom_image_url} fluid rounded style={{ maxHeight: '100px', objectFit: 'contain' }} />
                                                    <div style={{ position: 'absolute', bottom: '-10px', left: 0, width: '100%', textAlign: 'center' }}>
                                                        <Badge bg="primary" style={{ fontSize: '0.65rem' }}>CUSTOM DESIGN</Badge>
                                                    </div>
                                                </div>
                                            )}
                                        </Col>
                                        <Col xs={8}>
                                            <h6>
                                                {product.product_name}{' '}
                                                {product.variant_name && (
                                                    <small className="text-muted">({product.variant_name})</small>
                                                )}
                                            </h6>
                                            <p className="mb-1 text-muted">Actual Price: <del>₹{product.product_price || product.price}</del></p>
                                            {product.discount_price && (
                                                <p className="text-success mb-1">
                                                    Discounted: ₹{product.discount_price} ({product.discount_percentage}% OFF)
                                                </p>
                                            )}
                                            <p className="mb-1">Quantity: {product.quantity}</p>
                                            <p className="mb-0 fw-medium">Total: <span className="text-dark">₹{product.total_price}</span></p>
                                        </Col>
                                    </Row>
                                );
                            })}
                        </Col>
                        <Col md={6}>
                            {renderOrderDetails()}
                        </Col>
                    </Row>
                ) : (
                    <>
                        <div className="d-flex justify-content-center mb-4">
                            <OrderKitPreview preview_id={order?.order_id} />
                        </div>
                        {renderOrderDetails()}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderDetailModal;
