import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditVideo({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    videoHeading: '',
    videoText: '',
    status: '',
    video: null,
    imageFile: null,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        videoHeading: data.video_heading || '',
        videoText: data.video_text || '',
        status: data.status || '',
        video: data.video_url || '',
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

    // Append the video file if it exists
    if (imageFile) {
      updatedData.append('video', imageFile);
    }

    setLoading(true);
    try {
      await axiosClients.put(
        `/editVideoById/${data.video_id}`,
        updatedData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success('Video updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating video:', error);
      toast.error('Error updating video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Video</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Video Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Video Heading</h6>
                            <input
                              type="text"
                              name="videoHeading"
                              value={formData.videoHeading}
                              onChange={handleChange}
                              className="form-control"
                              
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Video Text</h6>
                            <input
                              type="text"
                              name="videoText"
                              value={formData.videoText}
                              onChange={handleChange}
                              className="form-control"
                              
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Status<span className="text-danger">*</span></h6>
                            <select className='form-select' name='status' value={formData.status} onChange={handleChange} required>
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Video</h6>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={handleFileChange}
                              className="form-control"
                            />
                            {formData.video && (
                              <video
                                src={formData.video}
                                controls
                                style={{ width: '100%', marginTop: '10px' }}
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

export default EditVideo;
