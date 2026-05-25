import React, { useState } from 'react'
import { CButton, CModal, CModalHeader, CModalTitle, CModalBody } from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

function Profile() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      {/* <CButton color="primary" onClick={() => setVisible(!visible)}>
        Full screen
      </CButton> */}
      <CModal
        fullscreen
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="FullscreenExample1"
      >
          <CModalHeader>
            <CModalTitle id="FullscreenExample1">Full screen</CModalTitle>
          </CModalHeader>
        <CModalBody>
          <div>
            {/* <AppSidebar /> */}
            <div className="wrapper d-flex flex-column min-vh-100">
              {/* <AppHeader /> */}
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Profile Manage</h5>
                  <button className="btn btn-outline-primary">Get in touch</button>
                </div>
                <div className="card-body">
                  <div className="d-flex gap-3 align-items-center mb-4">
                    <img
                      src="https://cdn.dribbble.com/userupload/13339875/file/original-79d2f9a5837c0d91c08142a6739cb30e.png?resize=752x"
                      alt="Profile"
                      className="rounded-circle"
                      width="50"
                    />
                    <button type="file" className="btn btn-outline-secondary ml-3">
                      Upload
                    </button>
                    <button className="btn btn-outline-danger ml-2">Remove</button>
                  </div>
                  <form>
                    <div className="d-flex gap-3 form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">First Name</label>
                        <input type="text" className="form-control" id="name" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="language">Last Name</label>
                        <input type="text" className="form-control" id="language" />
                      </div>
                    </div>
                    <div className="d-flex gap-3 form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="dateFormat">City</label>
                        <input
                          type="text"
                          className="form-control"
                          id="language"
                          placeholder="ex-Delhi"
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="country">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          id="country"
                          placeholder="Ex-India"
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-3 form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="timeFormat">Phone No.</label>
                        <input type="text" className="form-control" id="country" />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="timezone">Full Address</label>
                        <select id="timezone" className="form-control">
                          <option>Eastern - US & Canada</option>
                          <option>Central - US & Canada</option>
                        </select>
                      </div>
                    </div>
                    <div className="mt-3 d-flex gap-3">
                      <button type="submit" className="btn btn-primary">
                        Save Change
                      </button>
                      <button type="button" className="btn btn-secondary ml-2">
                        Cancel
                      </button>
                      {/* <button type="button" className="btn btn-danger float-right">Delete Account</button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>
    </>
  )
}

export default Profile


// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { AppSidebar, AppHeader } from '../components'; // Adjust according to your project structure

// const Profile = () => {
//   return (
//     <div>
//       <AppSidebar />
//       <div className="wrapper d-flex flex-column min-vh-100">
//         <AppHeader />
//         <div className="card">
//               <div className="card-header d-flex justify-content-between align-items-center">
//                   <h5 className="mb-0">Profile Manage</h5>
//                   <button className="btn btn-outline-primary">Get in touch</button>
//               </div>
//               <div className="card-body">
//                   <div className="d-flex gap-3 align-items-center mb-4">
//                       <img  src="https://cdn.dribbble.com/userupload/13339875/file/original-79d2f9a5837c0d91c08142a6739cb30e.png?resize=752x" alt="Profile" className="rounded-circle" width="50" />
//                       <button type='file' className="btn btn-outline-secondary ml-3">Upload</button>
//                       <button className="btn btn-outline-danger ml-2">Remove</button>
//                   </div>
//                   <form>
//                       <div className="d-flex gap-3 form-row">
//                           <div className="form-group col-md-6">
//                               <label htmlFor="name">First Name</label>
//                               <input type="text" className="form-control" id="name"/>
//                           </div>
//                           <div className="form-group col-md-6">
//                               <label htmlFor="language">Last Name</label>
//                               <input type="text" className="form-control" id="language" />
//                           </div>
//                       </div>
//                       <div className="d-flex gap-3 form-row">
//                           <div className="form-group col-md-6">
//                               <label htmlFor="dateFormat">City</label>
//                               <input type="text" className="form-control" id="language" placeholder='ex-Delhi' />
//                           </div>
//                           <div className="form-group col-md-6">
//                               <label htmlFor="country">Country</label>
//                               <input type="text" className="form-control" id="country" placeholder="Ex-India" />
//                           </div>
//                       </div>
//                       <div className="d-flex gap-3 form-row">
//                           <div className="form-group col-md-6">
//                               <label htmlFor="timeFormat">Phone No.</label>
//                               <input type="text" className="form-control" id="country" />
//                           </div>
//                           <div className="form-group col-md-6">
//                               <label htmlFor="timezone">Time Zone</label>
//                               <select id="timezone" className="form-control">
//                                   <option>Eastern - US & Canada</option>
//                                   <option>Central - US & Canada</option>
//                               </select>
//                           </div>
//                       </div>
//                       <div className='mt-3 d-flex gap-3'>
//                       <button type="submit" className="btn btn-primary">Save Change</button>
//                       <button type="button" className="btn btn-secondary ml-2">Cancel</button>
//                       {/* <button type="button" className="btn btn-danger float-right">Delete Account</button> */}
//                       </div>
//                   </form>
//               </div>
//           </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
