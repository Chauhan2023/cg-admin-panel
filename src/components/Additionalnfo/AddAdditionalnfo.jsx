import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../../Apis/api';

function AddAdditionalnfo() {
  const [formData, setFormData] = useState({
    specialty: '',
    IngredientType: '',
    brand: '',
    form: '',
    packageInformation: '',
    manufacture: '',
    categoryId: '',
    status: 'active',
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
    const { categoryId, ...rest } = formData; // Extract categoryId

    try {
      const response = await axiosClient.post(`/create/additionInfo/${categoryId}`, rest);
      toast.success('Additional Info created successfully.');
      navigate('/alladditionalinfo');
    } catch (error) {
      toast.error('Error creating Additional Info.');
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
                <h5>Add Additional Info</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
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
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Specialty<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="specialty"
                          placeholder="specialty"
                          value={formData.specialty}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Ingredient Type<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="IngredientType"
                          placeholder="IngredientType"
                          value={formData.IngredientType}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Brand<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="brand"
                          placeholder="brand"
                          value={formData.brand}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Form<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="form"
                          placeholder="form"
                          value={formData.form}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Package Information<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="packageInformation"
                          placeholder="package Information"
                          value={formData.packageInformation}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Manufacture<span className="text-danger">*</span></h6>
                        <input
                          type="text"
                          name="manufacture"
                          placeholder="manufacture"
                          value={formData.manufacture}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>Status<span className="text-danger">*</span></h6>
                        <select
                          name="status"
                          className="w-100"
                          value={formData.status}
                          onChange={handleInputChange}
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
            <div className="align-content-end d-flex justify-content-end mb-3">
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

export default AddAdditionalnfo;