import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllAdsBanners from '../../components/AdsBanner/AllAdsBanner';

function AdsBanner() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllAdsBanners />
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AdsBanner;