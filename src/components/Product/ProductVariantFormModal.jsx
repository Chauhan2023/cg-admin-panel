import React, { useEffect, useState } from 'react';
import {
    Modal, ModalHeader, ModalBody, ModalFooter,
    Button, Form, FormGroup, Input, Label, Col,
} from 'reactstrap';
import { apiPost, apiPut } from '../../Api/apiMethods';
import toast from 'react-hot-toast';

const ProductVariantFormModal = ({ show, handleClose, data, isEdit, onSubmit, productId }) => {
    const [formData, setFormData] = useState({
        variantName: '',
        variantPrice: '',
        stock: '',
        isShow: 'Y',
        images: [],
        fittedImage: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit && data) {
            setFormData({
                variantName: data.variant_name,
                variantPrice: data.variant_price,
                stock: data.variant_stock,
                isShow: data.variant_is_show,
                images: [],
                fittedImage: null, // fittedImage is optional during edit
            });
        } else {
            setFormData({
                variantName: '',
                variantPrice: '',
                stock: '',
                isShow: 'Y',
                images: [],
                fittedImage: null,
            });
        }
    }, [isEdit, data]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'fittedImage') {
            const file = files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) { // 2MB validation
                    toast.error("File size should not exceed 2MB");
                    e.target.value = null; // Clear the input
                    return;
                }
                setFormData(prev => ({ ...prev, fittedImage: file }));
            }
        } else if (name === 'images') {
             const selectedFiles = Array.from(files).slice(0, 5); // Limit to max 5 images
             setFormData(prev => ({ ...prev, images: selectedFiles }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        if (!isEdit && (!formData.images || formData.images.length === 0)) {
            alert("At least one image is required.");
            return;
        }

        setIsSubmitting(true);
        const payload = new FormData();
        payload.append('variantName', formData.variantName);
        payload.append('variantPrice', formData.variantPrice);
        payload.append('stock', formData.stock);
        payload.append('isShow', formData.isShow);
        payload.append('productId', productId);

        if (formData.images && formData.images.length > 0) {
            formData.images.forEach(file => {
                payload.append('images', file);
            });
        }

        if (formData.fittedImage) {
            payload.append('fittedImage', formData.fittedImage);
        }

        if (isEdit) {
            payload.append('productVariantId', data.product_variant_id);
        }

        try {
            if (isEdit) {
                await apiPut(`/updateProductVariant`, payload, true);
                toast.success('Product variant updated successfully');
            } else {
                await apiPost('/addProductVariants', payload, true);
                toast.success('Product variant added successfully');
            }

            if (onSubmit) onSubmit(); // callback to refresh parent list
            handleClose();
        } catch (err) {
            console.error("API error:", err);
            toast.error('Failed to submit variant. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={show} toggle={handleClose}>
            <ModalHeader toggle={handleClose}>
                {isEdit ? 'Edit Variant' : 'Add Variant'}
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup row>
                        <Label sm={4}>Variant Name</Label>
                        <Col sm={8}>
                            <Input
                                type="text"
                                name="variantName"
                                value={formData.variantName}
                                onChange={handleChange}
                                placeholder="Enter variant name"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Price (₹)</Label>
                        <Col sm={8}>
                            <Input
                                type="number"
                                name="variantPrice"
                                value={formData.variantPrice}
                                onChange={handleChange}
                                placeholder="Enter price"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Stock</Label>
                        <Col sm={8}>
                            <Input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Enter stock"
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Visibility</Label>
                        <Col sm={8}>
                            <Input
                                type="select"
                                name="isShow"
                                value={formData.isShow}
                                onChange={handleChange}
                            >
                                <option value="Y">Visible</option>
                                <option value="N">Hidden</option>
                            </Input>
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Images (Max 5) {isEdit ? '(Optional)' : '(Required)'}</Label>
                        <Col sm={8}>
                            <Input
                                type="file"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleChange}
                            />
                            {isEdit && (data?.image_url || data?.variant_image_url) && (
                                <div className="mt-2 text-muted small">
                                    Current images will be retained if no new ones are selected.
                                </div>
                            )}
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label sm={4}>Fitted Image (Optional)</Label>
                        <Col sm={8}>
                            <Input
                                type="file"
                                name="fittedImage"
                                accept="image/*"
                                onChange={handleChange}
                            />
                            {isEdit && data?.variant_fitted_image_url && (
                                <div className="mt-2">
                                    <a href={data.variant_fitted_image_url} target='__blank'>
                                        <img
                                            src={data.variant_fitted_image_url}
                                            alt="fitted variant"
                                            style={{ width: '80px', borderRadius: 5 }}
                                        />
                                    </a>
                                </div>
                            )}
                             <small className="text-muted">Max size: 2MB</small>
                        </Col>
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Please wait...' : (isEdit ? 'Update' : 'Add')}
                </Button>
                <Button color="danger" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ProductVariantFormModal;
