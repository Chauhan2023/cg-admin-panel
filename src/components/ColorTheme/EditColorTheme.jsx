import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { axiosClients } from '../../Apis/api';
import toast from 'react-hot-toast';
import { ChromePicker } from 'react-color'; // Importing ChromePicker from react-color

function EditColorTheme({ modal, toggle, data, onSave }) {
  const [formData, setFormData] = useState({
    background_color_area_name: '',
    background_color: '', // Default color in hex
    text_color_name: '',
    text_color: '', // Default text color in hex
    status: '',
  });

  useEffect(() => {
    if (data) {
      setFormData({
        background_color_area_name: data.background_color_area_name || '',
        background_color: data.background_color || '',
        text_color_name: data.text_color_name || '',
        text_color: data.text_color || '',
        status: data.status || '',
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

  const handleColorChange = (color, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: color.hex, // Set the color hex value for the appropriate field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosClients.put(`/updateColorById/${data.id}`, formData);
      toast.success('Colors updated successfully.');
      onSave();
      toggle();
    } catch (error) {
      console.error('Error updating color:', error);
      toast.error('Error updating color.');
    }
  };

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle}>Edit Colors</ModalHeader>
        <ModalBody>
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h5>Colors Information</h5>
                    </div>
                    <div className="card-body">
                      <div className="row gy-3">
                        {/* Background Color Area Name */}
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Background Color Area Name</h6>
                            <input
                              type="text"
                              name="background_color_area_name"
                              value={formData.background_color_area_name}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        {/* Background Color Picker */}
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Background Color</h6>
                            <ChromePicker
                              color={formData.background_color}
                              onChange={(color) => handleColorChange(color, 'background_color')}
                            />
                          </div>
                        </div>

                        {/* Text Color Name */}
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Text Color Name</h6>
                            <input
                              type="text"
                              name="text_color_name"
                              value={formData.text_color_name}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        {/* Text Color Picker */}
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Text Color</h6>
                            <ChromePicker
                              color={formData.text_color}
                              onChange={(color) => handleColorChange(color, 'text_color')}
                            />
                          </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className="col-xl-6">
                          <div className="input-box">
                            <h6>Status</h6>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleChange}
                              className="form-control"
                              required
                            >
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
              <ModalFooter>
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" type="submit">
                  Save Changes
                </Button>
              </ModalFooter>
            </form>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditColorTheme;
