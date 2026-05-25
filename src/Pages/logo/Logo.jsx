import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllLogo from '../../components/Logo/AllLogo';
function Logo() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllLogo/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default Logo;  