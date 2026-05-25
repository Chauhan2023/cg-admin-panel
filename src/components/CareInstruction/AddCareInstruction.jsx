import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../Apis/api';

function AddCareInstruction() {
  const [formData, setFormData] = useState({
    careInstruction: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/getAllCategories');
        setCategories(response.data);
      } catch (error) {
        toast.error('Error fetching categories.');
        console.log(error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { categoryId, ...rest } = formData;

    try {
      const response = await axiosClient.post(`/create/careInstruction/${categoryId}`, rest);
      toast.success('Care Instruction created successfully.');
      navigate('/allcare')
    } catch (error) {
      toast.error('Error creating Care Instruction.');
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
                <h5>Add Care Instruction</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Care Instruction<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="careInstruction"
                          placeholder="Care Instruction"
                          value={formData.careInstruction}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Category<span className="text-danger">*</span></h6>
                        <select
                          name="categoryId"
                          className="w-100"
                          value={formData.categoryId}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Category</option>
                          {categories?.map((category) => (
                            <option key={category.category_id} value={category.category_id}>
                              {category.category_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="align-items-end d-flex justify-content-end mb-3">
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

export default AddCareInstruction;
