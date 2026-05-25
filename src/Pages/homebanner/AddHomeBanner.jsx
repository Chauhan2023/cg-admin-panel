import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AddHomeBanners from '../../components/HomeBanner/AddHomeBanner';

function AddHomeBanner() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AddHomeBanners />
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AddHomeBanner