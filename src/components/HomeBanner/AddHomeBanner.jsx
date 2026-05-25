import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { apiPost, apiPut } from '../../Api/apiMethods';

function AddHomeBanner() {
  const [formData, setFormData] = useState({
    bannerHeading: '',
    bannerText: '',
    carouselBannerPic: null,
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
    setFormData({ ...formData, carouselBannerPic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object to send form data and file
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('bannerHeading', formData.bannerText);
    formDataToSubmit.append('bannerText', formData.bannerText);
    
    // Append image file only if it exists
    if (formData.carouselBannerPic) {
      formDataToSubmit.append('carouselBannerPic', formData.carouselBannerPic);
    }

    try {
      const response = await apiPost('/createCarouselBanner', formDataToSubmit, true );
      toast.success('Home banner created successfully.');
    } catch (error) {
      toast.error('Error creating home banner.');
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
                <h5>Add Home Banner</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Banner Heading<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="bannerHeading"
                          placeholder="banner heading"
                          value={formData.bannerHeading}
                          onChange={handleInputChange}
                          
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Banner Text<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="bannerText"
                          placeholder="banner text"
                          value={formData.bannerText}
                          onChange={handleInputChange}
                          
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Banner Image</h6>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="form-control"
                          required
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

export default AddHomeBanner;