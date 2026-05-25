import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
} from 'reactstrap';
import { apiPut } from '../../Api/apiMethods';
import toast from 'react-hot-toast';

function KitEditModal({ modal, toggle, data, onSave }) {
    const [formData, setFormData] = useState({
        boxName: '',
        boxDescription: '',
        boxProperty: '',
        boxPrice: '',
        boxSize: '',
        height: '',
        width: '',
        kitWeight: '',
        physicalWidth: '',
        physicalHeight: '',
        physicalLength: '',
        isShow: 'Y',
    });

    const [dieImage, setDieImage] = useState(null);
    const [multipleImages, setMultipleImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [existingDieImage, setExistingDieImage] = useState('');
    const [existingMultipleImages, setExistingMultipleImages] = useState([]);

    useEffect(() => {
        if (data) {
            setFormData({
                boxName: data.box_name || '',
                boxDescription: data.box_description || '',
                boxProperty: data.box_property || '',
                boxPrice: data.box_price || '',
                boxSize: data.box_size || '',
                height: data.height || '',
                width: data.width || '',
                kitWeight: data.kit_weight || '',
                physicalWidth: data.physical_width || '',
                physicalHeight: data.physical_height || '',
                physicalLength: data.physical_length || '',
                isShow: data.is_show || 'Y',
            });

            setExistingDieImage(data.die_image || '');

            // Parse multiple images if available
            try {
                if (data.multiple_image) {
                    const parsedImages = JSON.parse(data.multiple_image);
                    if (Array.isArray(parsedImages)) {
                        setExistingMultipleImages(parsedImages);
                    }
                }
            } catch (error) {
                console.error('Error parsing multiple images:', error);
                setExistingMultipleImages([]);
            }
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDieImageChange = (e) => {
        if (e.target.files[0]) {
            setDieImage(e.target.files[0]);
        }
    };

    const handleMultipleImagesChange = (e) => {
        if (e.target.files) {
            setMultipleImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.boxName || !formData.boxPrice || !formData.boxSize) {
            toast.error('Please fill all required fields');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = new FormData();

            // Add form data
            Object.keys(formData).forEach(key => {
                payload.append(key, formData[key]);
            });

            // Add die image if changed
            if (dieImage) {
                payload.append('dieImage', dieImage);
            }

            payload.append('kitBoxId', data?.kit_box_id);


            // Add multiple images if changed
            if (multipleImages.length > 0) {
                multipleImages.forEach(image => {
                    payload.append('multipleImage', image);
                });
            }

            const response = await apiPut(`/updateKitBox`, payload, true);


            toast.success('Kit box updated successfully');
            onSave(); // Refresh the list
            toggle(); // Close the modal

        } catch (error) {
            console.error('Error updating kit box:', error);
            toast.error(error.response?.data?.message || 'Failed to update kit box');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>Edit Kit Box</ModalHeader>
            <ModalBody>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="boxName">Box Name <span className="text-danger">*</span></Label>
                                <Input
                                    type="text"
                                    name="boxName"
                                    id="boxName"
                                    placeholder="Enter box name"
                                    value={formData.boxName}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="boxSize">Box Size <span className="text-danger">*</span></Label>
                                <Input
                                    type="select"
                                    name="boxSize"
                                    id="boxSize"
                                    value={formData.boxSize}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, boxSize: e.target.value }))
                                    }
                                    required
                                >
                                    <option value="">Select box size</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label for="boxDescription">Description</Label>
                        <Input
                            type="textarea"
                            name="boxDescription"
                            id="boxDescription"
                            placeholder="Enter description"
                            value={formData.boxDescription}
                            onChange={handleChange}
                            rows={3}
                        />
                    </FormGroup>

                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="boxProperty">Box Property</Label>
                                <Input
                                    type="text"
                                    name="boxProperty"
                                    id="boxProperty"
                                    placeholder="Enter box property"
                                    value={formData.boxProperty}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="boxPrice">Price <span className="text-danger">*</span></Label>
                                <Input
                                    type="number"
                                    name="boxPrice"
                                    id="boxPrice"
                                    placeholder="Enter price"
                                    value={formData.boxPrice}
                                    onChange={handleChange}
                                    required
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="height">Representative Height (px)</Label>
                                <Input
                                    type="number"
                                    name="height"
                                    id="height"
                                    placeholder="Height"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="width">Representative Width (px)</Label>
                                <Input
                                    type="number"
                                    name="width"
                                    id="width"
                                    placeholder="Width"
                                    value={formData.width}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="weight">Weight (gram)</Label>
                                <Input
                                    type="number"
                                    name="kitWeight"
                                    id="weight"
                                    placeholder="Weight"
                                    value={formData.kitWeight}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <h6 className="mt-3 mb-3">Physical Dimensions</h6>
                    <Row>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="physicalHeight">Physical Height (cm)</Label>
                                <Input
                                    type="number"
                                    name="physicalHeight"
                                    id="physicalHeight"
                                    placeholder="Physical Height"
                                    value={formData.physicalHeight}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="physicalWidth">Physical Width (cm)</Label>
                                <Input
                                    type="number"
                                    name="physicalWidth"
                                    id="physicalWidth"
                                    placeholder="Physical Width"
                                    value={formData.physicalWidth}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="physicalLength">Physical Length (cm)</Label>
                                <Input
                                    type="number"
                                    name="physicalLength"
                                    id="physicalLength"
                                    placeholder="Physical Length"
                                    value={formData.physicalLength}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className="row">
                        <Col md={6}>
                            <FormGroup>
                                <Label for="isShow">Status</Label>
                                <Input
                                    type="select"
                                    name="isShow"
                                    id="isShow"
                                    value={formData.isShow}
                                    onChange={handleChange}
                                >
                                    <option value="Y">Active</option>
                                    <option value="N">Inactive</option>
                                </Input>
                            </FormGroup>

                        </Col>
                    </div>

                    <FormGroup>
                        <Label for="dieImage">Die Image</Label>
                        {existingDieImage && (
                            <div className="mb-2">
                                <p>Current Die Image:</p>
                                <img
                                    src={existingDieImage}
                                    alt="Current Die"
                                    style={{ height: '100px', objectFit: 'contain', marginBottom: '10px' }}
                                />
                            </div>
                        )}
                        <Input
                            type="file"
                            name="dieImage"
                            id="dieImage"
                            onChange={handleDieImageChange}
                            accept="image/*"
                        />
                        {dieImage && (
                            <div className="mt-2">
                                <p>New Die Image:</p>
                                <img
                                    src={URL.createObjectURL(dieImage)}
                                    alt="New Die Preview"
                                    style={{ height: '100px', objectFit: 'contain' }}
                                />
                            </div>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label for="multipleImages">Product Images</Label>
                        {existingMultipleImages.length > 0 && (
                            <div className="mb-2">
                                <p>Current Product Images:</p>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {existingMultipleImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt={`Current ${index}`}
                                            style={{ height: '80px', width: '80px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <Input
                            type="file"
                            name="multipleImages"
                            id="multipleImages"
                            onChange={handleMultipleImagesChange}
                            accept="image/*"
                            multiple
                        />
                        {multipleImages.length > 0 && (
                            <div className="mt-2">
                                <p>New Product Images:</p>
                                <div className="d-flex flex-wrap gap-2">
                                    {multipleImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(img)}
                                            alt={`New Preview ${index}`}
                                            style={{ height: '80px', width: '80px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Kit Box'}
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default KitEditModal;