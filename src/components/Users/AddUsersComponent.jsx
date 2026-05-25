import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function AddUsersComponent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Select Role',
    password: '',
    profilePic: null,
  });

  const handleSelect = (eventKey) => {
    setFormData((prevState) => ({ ...prevState, role: eventKey }));
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await fetch('http://localhost:9000/api/signup', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        toast.success('User Added Successfully');
        navigate('/allusers');
        // Handle success (e.g., redirect or show a success message)
      } else {
        console.error('Error:', response.statusText);
        toast.error('User already registered. Try to log in');
        // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className="container-fluid">
      <div className="bg-white p-4">
        <div className="input-items">
          <form onSubmit={handleSubmit}>
            <div className="row gy-3">
              {/* First Name, Middle Name, and Last Name */}
              <div className="col-12 col-md-4">
                <div className="input-box">
                  <h6>
                    First Name<span className="text-danger">*</span>
                  </h6>
                  <input
                    type="text"
                    required
                    name="firstName"
                    placeholder="Enter First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="input-box">
                  <h6>Middle Name</h6>
                  <input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="input-box">
                  <h6>
                    Last Name<span className="text-danger">*</span>
                  </h6>
                  <input
                    type="text"
                    required
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Phone, Email, and Role */}
              <div className="col-12 col-md-4">
                <div className="input-box">
                  <h6>
                    Phone no.<span className="text-danger">*</span>
                  </h6>
                  <input
                    type="number"
                    required
                    name="phone"
                    placeholder="Enter phone no."
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="input-box">
                  <h6>
                    Email<span className="text-danger">*</span>
                  </h6>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="input-box">
                  <h6>Role<span className="text-danger">*</span></h6>
                  <select
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    name="role"
                  >
                    <option value="" disabled>
                      Select a role
                    </option>
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              {/* Password and Profile Image */}
              <div className="col-12 col-md-6">
                <div className="input-box">
                  <h6>
                    Password<span className="text-danger">*</span>
                  </h6>
                  <input
                    type="password"
                    required
                    name="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="input-box">
                  <h6>Profile Image<span className="text-danger">*</span></h6>
                  <input
                    type="file"
                    id="formFile1"
                    name="profilePic"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>
           
            <button className="btn btn-primary mt-4">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUsersComponent;
