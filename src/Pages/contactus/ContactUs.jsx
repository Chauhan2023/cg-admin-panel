import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllContactUs from '../../components/ContactUs/AllContactUs';
function ContactUs() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllContactUs/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default ContactUs;