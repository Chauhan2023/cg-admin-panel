import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../Api/apiMethods';

function AddFoodComponent() {
  const [brandName, setBrandName] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!brandName || !status) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      // Include the categoryId in the URL path
      const response = await apiPost(`/create/brand`, {
        brandName,
        status
      });
      toast.success('Brand created successfully');
      navigate('/foodlist')
    } catch (error) {
      console.error('Error creating Brand:', error);
      toast.error('Failed to create Brand');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5>Brand Information</h5>
                </div>
                <div className="card-body">
                  <div className="input-items">
                    <div className="row gy-3">
                      <div className="col-md-6">
                        <div className="input-box">
                          <h6>Brand Name<span className='text-danger'>*</span></h6>
                          <input
                            type="text"
                            name="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            required
                            placeholder="Enter Brand Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="input-box">
                          <h6>Status<span className='text-danger'>*</span></h6>
                          <select
                            className="form-select"
                            name="status"
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                          >
                            <option disabled value=''>Select Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </div>

                      <div className="d-flex justify-content-end mt-5">
                        <button className='btn btn-primary' onClick={handleSubmit}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddFoodComponent;
