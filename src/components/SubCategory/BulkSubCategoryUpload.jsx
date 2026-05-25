import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { axiosClients } from '../../Apis/api'

function BulkSubCategoryUpload() {
  const [excelFile, setExcelFile] = useState(null)
  const [loading, setLoading] = useState(false)

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setExcelFile(file)
    }
  }

  // Handle bulk upload submission
  const handleBulkUpload = async (e) => {
    e.preventDefault()

    if (!excelFile) {
      toast.error('Please upload an Excel file.')
      return
    }

    try {
      setLoading(true)

      // Prepare form data
      const formData = new FormData()
      formData.append('excelFile', excelFile)

      // Send the file to the backend
      const response = await axiosClients.post('/bulkCreateSubcategory', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.data.success) {
        toast.success('Bulk subcategories uploaded successfully.')
        setExcelFile(null) // Clear the file after successful upload
        document.getElementById('excelFile').value = '' // Reset file input
      } else {
        toast.error(response.data.message || 'An error occurred during the upload.')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred during the upload.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5>Upload Bulk Subcategories</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleBulkUpload}>
                <div className="form-group">
                  <label htmlFor="excelFile">Select Excel File</label>
                  <input
                    type="file"
                    className="form-control"
                    id="excelFile"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                  {loading ? 'Uploading...' : 'Upload'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkSubCategoryUpload
