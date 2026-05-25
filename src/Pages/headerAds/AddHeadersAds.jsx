import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AddHeaderAds from '../../components/headerAds/AddHeaderAds';
function AddHeadersAds() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AddHeaderAds/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AddHeadersAds