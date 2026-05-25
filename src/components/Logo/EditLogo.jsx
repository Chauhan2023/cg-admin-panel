import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import toast from 'react-hot-toast';
import { axiosClients } from '../../Apis/api';

function EditLogo({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    logo_name : '',
    logoFile: null,
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        logo_name: data.logo_name || '',
        logoFile: data.logo_url || '',
        logoId : data.logo_id || ''
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
      updatedData.append('logoFile', imageFile);
    }

    setLoading(true);
    try {
      await axiosClients.put(
        `/updateLogo/${data.logo_id}`,
        updatedData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success('Logo updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating logo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Logo</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Logo Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Logo Name</h6>
                            <input
                              type="text"
                              name="logo_name"
                              value={formData.logo_name}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Logo Image</h6>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleFileChange}
                              className="form-control"
                            />
                            {formData.logoFile && (
                              <img
                                src={formData.logoFile}
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

export default EditLogo;