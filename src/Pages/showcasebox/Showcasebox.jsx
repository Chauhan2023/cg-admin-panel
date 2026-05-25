import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllShowcasebox from '../../components/Showcasebox/AllShowcasebox';

function Showcasebox() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllShowcasebox/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default Showcasebox;