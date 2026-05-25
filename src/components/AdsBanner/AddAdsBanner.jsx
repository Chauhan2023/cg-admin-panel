import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClients } from '../../Apis/api';

function AddAdsBanner() {
  const [formData, setFormData] = useState({
    heading: '',
    link: '',
    title : '',
    status : '',
    image: null,
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
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object to send form data and file
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('heading', formData.heading);
    formDataToSubmit.append('link', formData.link);
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('status', formData.status);
    
    // Append image file only if it exists
    if (formData.image) {
      formDataToSubmit.append('image', formData.image);
    }

    try {
      const response = await axiosClients.post('/adsbanner', formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Ads banner created successfully.');
      // navigate('/allshowcasebox');
    } catch (error) {
      toast.error('Error creating ads banner.');
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
                <h5>Add Ads Banner</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Heading<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="heading"
                          placeholder="heading"
                          value={formData.heading}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Title<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="title"
                          placeholder="Title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Link<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="link"
                          placeholder="link"
                          value={formData.link}
                          onChange={handleInputChange}
                          required
                        />
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
                                onChange={handleInputChange}
                                
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

export default AddAdsBanner;

