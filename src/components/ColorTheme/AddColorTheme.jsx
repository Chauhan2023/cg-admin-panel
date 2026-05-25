import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { axiosClients } from '../../Apis/api'
import { SketchPicker } from 'react-color'

function AddColorTheme() {
  const [formData, setFormData] = useState({
    background_color: '',
    text_color: '',
    status: 'active',
    background_color_area_name: '',
    text_color_name: '',
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleColorChange = (color, field) => {
    setFormData({ ...formData, [field]: color.hex })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axiosClients.post('/', formData)
      toast.success('Theme color created successfully.')
      // navigate('/themecolor')
    } catch (error) {
      toast.error('Error creating theme color.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                <h5>Add Theme Color</h5>
              </div>
              <div className="card-body">
                <div className="input-items">
                  <div className="row gy-3">
                    {/* Background Color Area Name */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Background Color Area Name<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="background_color_area_name"
                          placeholder="Enter color area name"
                          value={formData.background_color_area_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Color Picker Section for Background Color */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Select Background Color<span className="text-danger">*</span>
                        </h6>
                        <SketchPicker
                          color={formData.background_color}
                          onChangeComplete={(color) => handleColorChange(color, 'background_color')}
                        />
                      </div>
                    </div>

                    {/* Text Color Name */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Text Color Name<span className="text-danger">*</span>
                        </h6>
                        <input
                          type="text"
                          name="text_color_name"
                          placeholder="Enter text color name"
                          value={formData.text_color_name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Color Picker Section for Text Color */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Select Text Color<span className="text-danger">*</span>
                        </h6>
                        <SketchPicker
                          color={formData.text_color}
                          onChangeComplete={(color) => handleColorChange(color, 'text_color')}
                        />
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-xl-6">
                      <div className="input-box">
                        <h6>
                          Select Status<span className="text-danger">*</span>
                        </h6>
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
            <div className="d-flex justify-content-end mb-3">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddColorTheme
