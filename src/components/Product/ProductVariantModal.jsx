import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Table,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Spinner
} from 'reactstrap';
import { useQuery } from '@tanstack/react-query';
import { apiDelete, apiGet } from '../../Api/apiMethods';
import ProductVariantFormModal from './ProductVariantFormModal';
import toast from 'react-hot-toast';

const ProductVariantModal = ({ product, show, handleClose }) => {
    const id = product?.product_id || null;

    const [modalOpen, setModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const openAddVariantModal = () => {
        setEditData(null); // no data for add
        setSelectedProductId(product?.product_id);
        setModalOpen(true);
    };

    const openEditVariantModal = (variant) => {
        setEditData(variant);
        setSelectedProductId(product?.product_id);
        setModalOpen(true);
    };


    const {
        data: variantsIdData = [],
        error: variantsIdError,
        isLoading: variantsByIdIsLoading,
        refetch
    } = useQuery({
        queryKey: ['variantByID', id],
        queryFn: () => apiGet(`/getProductVariantByProductId/${id}`),
        enabled: show && !!id,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        select: (response) => response?.data || [],

        onError: (error) => {
            console.error('Fetch Error:', error);
        },
    });


    const deleteVariant = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product variant?");
        if (!confirmDelete) return;

        try {
            await apiDelete(`/deleteProductVariant/${id}`);
            toast.success('Product variant deleted successfully');
            refetch();
        } catch (err) {
            console.error("API error:", err);
            toast.error('Failed to delete variant. Please try again.');
        }
    };


    return (
        <>
            <Modal isOpen={show} toggle={handleClose} size="xl">
                <ModalHeader toggle={handleClose}>
                    Product Variants – {product?.product_name || 'Product'}
                </ModalHeader>
                <ModalBody>
                    <div className="text-end">
                        <Button color="primary" className="mb-3" onClick={openAddVariantModal}>
                            <i className="ri-add-line me-1"></i> Add Variant
                        </Button>
                    </div>
                    <div className="table-responsive">
                        <Table hover>
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Fitted Image</th>
                                    <th>Variant</th>
                                    <th>Price (₹)</th>
                                    <th>Stock</th>
                                    <th>Visibility</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variantsByIdIsLoading ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-5">
                                            <Spinner color="primary" />
                                            <div className="mt-2">Loading variants...</div>
                                        </td>
                                    </tr>
                                ) : variantsIdData?.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4">
                                            No variants found for this product.
                                        </td>
                                    </tr>
                                ) : (
                                    variantsIdData?.map((item, index) => {
                                        let variantImages = [];
                                        try {
                                            variantImages = item.variant_image_url ? JSON.parse(item.variant_image_url) : [];
                                            if (!Array.isArray(variantImages)) variantImages = [item.variant_image_url];
                                        } catch (e) {
                                            variantImages = [item.variant_image_url];
                                        }
                                        const displayImage = variantImages.length > 0 ? variantImages[0] : null;

                                        return (
                                        <tr key={item.product_variant_id} className="align-middle">
                                            <td>{index + 1}</td>
                                            <td>
                                                {displayImage ? (
                                                    <img
                                                        src={displayImage}
                                                        alt="variant"
                                                        width="60"
                                                        height="60"
                                                        style={{
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            border: '1px solid #dee2e6'
                                                        }}
                                                        onError={(e) => { e.target.src = 'https://placehold.co/60x60?text=No+Image' }}
                                                    />
                                                ) : (
                                                    <div className="bg-light d-flex align-items-center justify-content-center text-muted" style={{ width: '60px', height: '60px', borderRadius: '8px', fontSize: '10px' }}>
                                                        No Image
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                 {item.variant_fitted_image_url ? (
                                                    <img
                                                        src={item.variant_fitted_image_url}
                                                        alt="fitted"
                                                        width="60"
                                                        height="60"
                                                        style={{
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            border: '1px solid #dee2e6'
                                                        }}
                                                         onError={(e) => { e.target.src = 'https://placehold.co/60x60?text=No+Image' }}
                                                    />
                                                ) : (
                                                     <div className="bg-light d-flex align-items-center justify-content-center text-muted" style={{ width: '60px', height: '60px', borderRadius: '8px', fontSize: '10px' }}>
                                                        N/A
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="fw-bold">{item.variant_name}</div>
                                                {item.variant_width && item.variant_height && (
                                                    <small className="text-muted">
                                                        {item.variant_width} x {item.variant_height}
                                                    </small>
                                                )}
                                            </td>
                                            <td>₹{item.variant_price}</td>
                                            <td>
                                                <span className={`badge ${item.variant_stock > 0 ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>
                                                    {item.variant_stock}
                                                </span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`badge ${item.variant_is_show === 'Y'
                                                        ? 'bg-success'
                                                        : 'bg-secondary'
                                                        }`}
                                                >
                                                    {item.variant_is_show === 'Y'
                                                        ? 'Visible'
                                                        : 'Hidden'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <Button size="sm" color="primary" outline onClick={() => openEditVariantModal(item)}>
                                                        <i className="ri-edit-line"></i>
                                                    </Button>
                                                    <Button size="sm" color="danger" outline onClick={() => deleteVariant(item.product_variant_id)}>
                                                        <i className="ri-delete-bin-line"></i>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )})
                                )}
                            </tbody>
                        </Table>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

            <ProductVariantFormModal
                show={modalOpen}
                handleClose={() => setModalOpen(false)}
                data={editData}
                isEdit={!!editData}
                productId={selectedProductId}
                onSubmit={() => refetch()} // refetch list after add/update
            />

        </>
    );
};

export default ProductVariantModal;
