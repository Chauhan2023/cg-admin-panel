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
import { apiGet } from '../../Api/apiMethods';
import { useQuery } from '@tanstack/react-query';

function ShowProductModal({ modal, toggle, data }) {
  const {
    data: productByIdData,
    error: productByIdError,
    isLoading: productByIdIsLoading,
  } = useQuery({
    queryKey: ['product', data?.product_id],
    queryFn: () => apiGet(`/getProductById/${data?.product_id}`),
    enabled: modal && !!data?.product_id,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
    select: (response) => response?.data || {},
    onError: (error) => {
      console.error('Fetch Error:', error);
    },
  });

  if (!modal || !data) return null;
  if (productByIdIsLoading) return <div>Loading...</div>;
  if (productByIdError) return <div>Error fetching product details.</div>;

  const product = productByIdData;
  const productImages = product?.product_image ? JSON.parse(product.product_image) : [];
  const variants = product?.variants || [];

  const getBooleanText = (val) => {
    if (val === 1) return 'True';
    if (val === 0) return 'False';
    return 'N/A';
  };

  return (
    <Modal isOpen={modal} toggle={toggle} size="lg" centered>
      <ModalHeader toggle={toggle} className="text-black font-weight-bold">
        Product Details
      </ModalHeader>
      <ModalBody>
        <Card className="shadow-sm">
          <CardBody>
            <Row>
              <Col md="6">
                {productImages.length > 0 && (
                  <div className="mb-3 text-center">
                    <img
                      src={productImages[0]}
                      alt="Product"
                      style={{ width: '100%', height: 'auto', maxHeight: 250, objectFit: 'contain' }}
                    />
                  </div>
                )}

                <div className="mb-2"><strong>Product Name:</strong>
                  <span className="text-muted">&nbsp; {product.product_name || 'N/A'}</span>
                </div>

                



                <div className="mb-2"><strong>Category Name:</strong>
                  <span className="text-muted">&nbsp; {product.category_name || 'N/A'}</span>
                </div>

                  <div className="mb-2">
                  <strong>Price:</strong>
                  <span className="text-muted">   &nbsp; {product.product_price || 'N/A'}</span>
                </div>

                <div className="mb-2"><strong>Status:</strong>
                  <span className="text-muted">   &nbsp; {product.status || 'N/A'}</span>
                </div>

               

              </Col>

              <Col md="6">

               <div className="mb-2"><strong>Description:</strong>
                  <div className="text-muted">{product.description || 'N/A'}</div>
                </div>



              

            
              </Col>



            </Row>

          
          </CardBody>
        </Card>
      </ModalBody>

      <ModalFooter className="p-2">
        <Button color="primary" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ShowProductModal;
