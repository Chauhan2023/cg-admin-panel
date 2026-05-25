import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditTestimonial({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    position: '',
    name: '',
    title : '',
    status : '',
    imageFile: null,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        position: data.position || '',
        name: data.name || '',
        title : data.title || '',
        status : data.status || '',
        testimonial_id : data.testimonial_id || '',
        testimonialPic: data.testimonial_pic || ''
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      imageFile: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { imageFile, ...otherData } = formData;
    const updatedData = new FormData();
    
    // Append text fields
    for (const key in otherData) {
      updatedData.append(key, otherData[key]);
    }

    if (imageFile) {
      updatedData.append('testimonialPic', imageFile);
    }

    setLoading(true);
    try {
      await axiosClients.post(
        `/testimonial`,
        updatedData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success('Testimonial updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating testimonial:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Testimonial</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Testimonial Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Name</h6>
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Title</h6>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Position</h6>
                            <input
                              type="text"
                              name="position"
                              value={formData.position}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>
                              Status<span className="text-danger">*</span>
                            </h6>
                            <div>
                              <select
                                className="w-100"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                
                              >
                                <option value="" disabled>
                                  Select Status
                                </option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Image</h6>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="form-control"
                            />
                            {formData.testimonialPic && (
                              <img
                                src={formData.testimonialPic}
                                alt="Preview"
                                style={{ width: '100px', marginTop: '10px' }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? 'Updating...' : 'Save Changes'}
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditTestimonial;