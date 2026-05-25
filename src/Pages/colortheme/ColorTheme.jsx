import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index'
import AllColorTheme from '../../components/ColorTheme/AllColorTheme'
function ColorTheme() {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <AllColorTheme />
          </div>
          <AppFooter />
        </div>
      </div>
    </>
  )
}

export default ColorTheme
