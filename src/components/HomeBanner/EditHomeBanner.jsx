import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { apiPut } from '../../Api/apiMethods';

function EditHomeBanner({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    bannerHeading: '',
    bannerText: '',
    carouselBannerPic: null,
    // imageFile: null,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        bannerHeading: data.banner_heading || '',
        bannerText: data.banner_text || '',
        carouselBannerPic: data.banner_image || '',
        bannerId : data.banner_id || ''
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
      carouselBannerPic: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { carouselBannerPic, ...otherData } = formData;
    const updatedData = new FormData();
    
    // Append text fields
    for (const key in otherData) {
      updatedData.append(key, otherData[key]);
    }

    if (carouselBannerPic) {
      updatedData.append('carouselBannerPic', carouselBannerPic);
    }

    setLoading(true);
    try {
      await apiPut(`/updateCarouselBanner/${data.banner_id}`, updatedData, true );
      toast.success('home banner updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating home banner:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit home Banner</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>home Banner Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Banner Heading</h6>
                            <input
                              type="text"
                              name="bannerHeading"
                              value={formData.bannerHeading}
                              onChange={handleChange}
                              className="form-control"
                              
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Banner Text</h6>
                            <input
                              type="text"
                              name="bannerText"
                              value={formData.bannerText}
                              onChange={handleChange}
                              className="form-control"
                              
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
                            />
                            {formData.carouselBannerPic && (
                              <img
                                src={formData.carouselBannerPic}
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

export default EditHomeBanner;