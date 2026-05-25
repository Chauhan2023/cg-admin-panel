import React, { useEffect, useState } from 'react';
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
import { apiGet, apiPost } from '../../Api/apiMethods';
import toast from 'react-hot-toast';

function KitAddComponent({ modal, toggle, onSave }) {
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
        categoryId: null,
    });

    const [dieImage, setDieImage] = useState(null);
    const [multipleImages, setMultipleImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await apiGet('/getKitsCategories');
            setData(response.data || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



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

        if (!dieImage) {
            toast.error('Please upload a die image');
            return;
        }

        if (multipleImages.length === 0) {
            toast.error('Please upload at least one product image');
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = new FormData();

            // Add form data
            Object.keys(formData).forEach(key => {
                payload.append(key, formData[key]);
            });

            // Add die image
            payload.append('dieImage', dieImage);

            // Add multiple images
            multipleImages.forEach(image => {
                payload.append('multipleImage', image);
            });

            const response = await apiPost('/addKitBox', payload, true);

            toast.success('Kit box added successfully');
            onSave(); // Refresh the list
            toggle(); // Close the modal

        } catch (error) {
            console.error('Error adding kit box:', error);
            toast.error(error.response?.data?.message || 'Failed to add kit box');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    return (
        <Modal isOpen={modal} toggle={toggle} size="lg">
            <ModalHeader toggle={toggle}>Add New Kit Box</ModalHeader>
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
                                <Label for="boxSize">
                                    Box limit Size <span className="text-danger">*</span>
                                </Label>
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
                                <Label for="height">Reprensentative Height (px)</Label>
                                <Input
                                    type="number"
                                    name="height"
                                    id="height"
                                    min={0}
                                    placeholder="Height"
                                    value={formData.height}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="width">Reprensentative Width (px)</Label>
                                <Input
                                    type="number"
                                    name="width"
                                    id="width"
                                    min={0}
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
                                    min={0}
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
                                    min={0}
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
                                    min={0}
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
                                    min={0}
                                    placeholder="Physical Length"
                                    value={formData.physicalLength}
                                    onChange={handleChange}
                                />
                            </FormGroup>
                        </Col>
                    </Row>

                    <div className='row '>
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
                        <Col md={6}>

                            <FormGroup>
                                <Label for="categoryId">Category</Label>
                                <Input
                                    type="select"
                                    name="categoryId"
                                    id="categoryId"
                                    value={formData.categoryId || ''}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>
                                    {data.map((cat) => (
                                        <option key={cat.category_id} value={cat.category_id}>
                                            {cat.category_name}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>


                        </Col>

                    </div>



                    <FormGroup>
                        <Label for="dieImage">Die Image <span className="text-danger">*</span></Label>
                        <Input
                            type="file"
                            name="dieImage"
                            id="dieImage"
                            onChange={handleDieImageChange}
                            accept="image/*"
                            required
                        />
                        {dieImage && (
                            <div className="mt-2">
                                <img
                                    src={URL.createObjectURL(dieImage)}
                                    alt="Die Preview"
                                    style={{ height: '100px', objectFit: 'contain' }}
                                />
                            </div>
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label for="multipleImages">Product Images <span className="text-danger">*</span></Label>
                        <Input
                            type="file"
                            name="multipleImages"
                            id="multipleImages"
                            onChange={handleMultipleImagesChange}
                            accept="image/*"
                            multiple
                            required
                        />
                        {multipleImages.length > 0 && (
                            <div className="mt-2">
                                <div className="d-flex flex-wrap gap-2">
                                    {multipleImages.map((img, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(img)}
                                            alt={`Preview ${index}`}
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
                    {isSubmitting ? 'Adding...' : 'Add Kit Box'}
                </Button>
                <Button color="danger" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default KitAddComponent;