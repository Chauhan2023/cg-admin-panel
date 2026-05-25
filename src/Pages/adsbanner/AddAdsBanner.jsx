import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AddAdsBanners from '../../components/AdsBanner/AddAdsBanner';

function AddAdsBanner() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AddAdsBanners />
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AddAdsBanner