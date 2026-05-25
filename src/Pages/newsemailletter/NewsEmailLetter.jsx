import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllNewsEmailLetter from '../../components/NewsEmailLetter/AllNewsEmailLetter';
function ContactUs() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllNewsEmailLetter/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default ContactUs;