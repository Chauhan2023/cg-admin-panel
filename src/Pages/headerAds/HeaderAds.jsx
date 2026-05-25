import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllHeaderAdsTable from '../../components/headerAds/AllHeaderAdsTable';
function HeaderAds() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllHeaderAdsTable/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default HeaderAds; 