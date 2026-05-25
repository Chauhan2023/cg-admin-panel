import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import { baseUrlMain } from '../../Api/axiosInstance'; // Assuming this imports the base URL

const AddDesigner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    isActive: 'Y', 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mapping to required backend payload
    const payload = {
      email: formData.email,
      password: formData.password,
      phoneNumber: formData.phoneNumber,
      firstName: formData.firstName,
      lastName: formData.lastName,
      isActive: formData.isActive,
      role: 'Designer'
    };

    try {
      const response = await fetch(`${baseUrlMain}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Designer Added Successfully');
        navigate('/designer-list');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to add designer');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="container-fluid">
            <div className="bg-white p-4 card">
              <div className="title-header option-title">
                <h5>Add New Designer</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row gy-3">
                  <div className="col-12 col-md-6">
                    <div className="input-box">
                      <h6>First Name <span className="text-danger">*</span></h6>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="input-box">
                      <h6>Last Name <span className="text-danger">*</span></h6>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="input-box">
                      <h6>Email <span className="text-danger">*</span></h6>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="input-box">
                      <h6>Phone Number <span className="text-danger">*</span></h6>
                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="input-box">
                      <h6>Password <span className="text-danger">*</span></h6>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="input-box">
                      <h6>Status <span className="text-danger">*</span></h6>
                      <select
                        name="isActive"
                        className="form-control"
                        value={formData.isActive}
                        onChange={handleChange}
                      >
                        <option value="Y">Active (Y)</option>
                        <option value="N">Inactive (N)</option>
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mt-4">
                  Add Designer
                </button>
              </form>
            </div>
          </div>
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AddDesigner;
