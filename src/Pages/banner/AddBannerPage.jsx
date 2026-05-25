import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllAdsBanner from '../../components/AdsBanner/AllAdsBanner';
function AddBannerPage() {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AllAdsBanner />
          </div>
          <AppFooter />
        </div>

      </div>
    </>
  )
}

export default AddBannerPage;