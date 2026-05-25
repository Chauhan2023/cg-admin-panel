import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { apiPost, apiPut } from '../../Api/apiMethods';

function MainCategoryModal({ show, handleClose, data = {}, isEdit = false, fetchData }) {
    const [mainCategoryName, setMainCategoryName] = useState('');
    const [mainCategorySlug, setMainCategorySlug] = useState('');
    const [mainCategoryDescription, setMainCategoryDescription] = useState('');
    const [isShow, setIsShow] = useState('Y');
    const [mainCategoryImg, setMainCategoryImg] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit && data) {
            setMainCategoryName(data.main_category_name || '');
            setMainCategorySlug(data.main_category_slug || '');
            setMainCategoryDescription(data.main_category_description || '');
            setIsShow(data.is_show || 'Y');
        } else {
            setMainCategoryName('');
            setMainCategorySlug('');
            setMainCategoryDescription('');
            setIsShow('Y');
        }
        setMainCategoryImg(null);
    }, [data, isEdit, show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('mainCategoryName', mainCategoryName);
        formData.append('mainCategorySlug', mainCategorySlug);
        formData.append('mainCategoryDescription', mainCategoryDescription);
        formData.append('isShow', isShow);
        if (mainCategoryImg) {
            formData.append('mainCategoryImg', mainCategoryImg);
        }
        if (isEdit) {
            formData.append('mainCategoryId', data.main_category_id);
        }

        setLoading(true);
        try {
            if (isEdit) {
                await apiPut('/updateMainCategoryById', formData, true); // 'true' to indicate multipart/form-data
            } else {
                await apiPost('/createMainCategory', formData, true);
            }
            toast.success(`Main category ${isEdit ? 'updated' : 'created'} successfully`);
            handleClose();
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{isEdit ? 'Edit' : 'Add'} Main Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Main Category Name *</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter main category name"
                                value={mainCategoryName}
                                onChange={(e) => setMainCategoryName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Main Category Slug</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter main category slug"
                                value={mainCategorySlug}
                                onChange={(e) => setMainCategorySlug(e.target.value)}
                            />
                        </div>

                        <div className="col-md-12 mb-3">
                            <label className="form-label">Main Category Description</label>
                            <textarea
                                className="form-control"
                                placeholder="Enter main category description"
                                value={mainCategoryDescription}
                                onChange={(e) => setMainCategoryDescription(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                value={isShow}
                                onChange={(e) => setIsShow(e.target.value)}
                            >
                                <option value="Y">Active</option>
                                <option value="N">Inactive</option>
                            </select>
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Main Category Image</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setMainCategoryImg(e.target.files[0])}
                            />
                        </div>

                        <div className="col-12 text-end">
                            <Button variant="danger" onClick={handleClose} className="me-2">
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading}>
                                {loading ? (isEdit ? 'Updating...' : 'Submitting...') : (isEdit ? 'Update' : 'Submit')}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default MainCategoryModal;
