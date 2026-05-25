import React, { useState, useRef } from 'react';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilUser, cilMobile, cilLockLocked, cilArrowRight, cilImage, cilTrash } from '@coreui/icons';
import { useToast } from "@chakra-ui/react"; // Import useToast here

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    repeatPassword: '',
    role: '',
    status: ''
  });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const fileInputRef = useRef(null);

  // Initialize useToast inside the component
  const toast = useToast();

  const showToast = (status, message) => {
    toast({
      title: status === 'success' ? 'Success' : 'Error',
      description: message,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordMatch(e.target.value === formData.repeatPassword);
    setFormData({
      ...formData,
      password: e.target.value
    });
  };

  const handleRepeatPasswordChange = (e) => {
    setPasswordMatch(e.target.value === formData.password);
    setFormData({
      ...formData,
      repeatPassword: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (!passwordMatch) {
      showToast('error', 'Passwords do not match');
      return;
    }
  
    try {
      // Create FormData object
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      if (profilePhoto) {
        formDataToSend.append('profilePhoto', profilePhoto);
      }
  
      // Make POST request
      const response = await axios.post('http://localhost:9000/api/signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      // Handle success
      if (response.status === 200) {
        showToast('success', 'User registered successfully');
        alert("User created successfully")
 
      } else {
        throw new Error('Failed to register');
      }
  
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      showToast('error', 'Failed to register. Please try again later.');
    }
  };
  

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit}>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>

                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="First Name"
                          autoComplete="first-name"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Last Name"
                          autoComplete="last-name"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilMobile} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          placeholder="Mobile"
                          autoComplete="mobile"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilMobile} />
                        </CInputGroupText>
                        <CFormInput
                          type="email"
                          placeholder="Email"
                          autoComplete="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Password"
                          autoComplete="new-password"
                          name="password"
                          value={formData.password}
                          onChange={handlePasswordChange}
                          required
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          type="password"
                          placeholder="Repeat Password"
                          autoComplete="new-password"
                          name="repeatPassword"
                          value={formData.repeatPassword}
                          onChange={handleRepeatPasswordChange}
                          required
                        />
                        {!passwordMatch && <p className="text-danger">Passwords do not match</p>}
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilArrowRight} />
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Role"
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose Role</option>
                          <option value="a">Admin</option>
                          <option value="e">Employee</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilArrowRight} />
                        </CInputGroupText>
                        <CFormSelect
                          aria-label="Status"
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Choose Status</option>
                          <option value="v">Active</option>
                          <option value="n">Inactive</option>
                        </CFormSelect>
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CRow>
                    <CCol md={12}>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilImage} />
                        </CInputGroupText>
                        <CFormInput
                          type="file"
                          onChange={handlePhotoChange}
                          ref={fileInputRef}
                        />
                      </CInputGroup>
                      {profilePhoto && (
                        <div className="mb-3 text-center">
                          <img
                            src={URL.createObjectURL(profilePhoto)}
                            alt="Profile Preview"
                            style={{
                              width: '150px',
                              height: '150px',
                              borderRadius: '50%'
                            }}
                          />
                          <CButton
                            color="danger"
                            className="mt-2 mx-xl-3 text-white"
                            onClick={handleRemovePhoto}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
                      )}
                    </CCol>
                  </CRow>

                  <div className="d-grid">
                    <CButton
                      color="success"
                      type="submit"
                      className="text-white"
                    >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
