import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClients } from '../../Apis/api';

function AddVideo() {
  const [formData, setFormData] = useState({
    videoHeading: '',
    videoText: '',
    status: 'active',
    video: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle text input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, video: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object to send form data and file
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('videoHeading', formData.videoHeading);
    formDataToSubmit.append('videoText', formData.videoText);
    formDataToSubmit.append('status', formData.status);
    if (formData.video) {
      formDataToSubmit.append('video', formData.video);
    }

    try {
      const response = await axiosClients.post('/upload-video', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Video created successfully.');
      navigate('/video');
    } catch (error) {
      toast.error('Error creating video.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Video</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Video Heading<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="videoHeading"
                          placeholder="video heading"
                          value={formData.videoHeading}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Video Text<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="videoText"
                          placeholder="video text"
                          value={formData.videoText}
                          onChange={handleInputChange}

                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Status<span className="text-danger">*</span></h6>
                        <select className='form-select' name='status' value={formData.status} onChange={handleInputChange} required>
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-3 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddVideo;
