import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllHomeBanner from '../../components/HomeBanner/AllHomeBanner';

function HomeBanner() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllHomeBanner />
        </div>
        <AppFooter />
      </div>
    </div>
    </>
  )
}

export default HomeBanner;