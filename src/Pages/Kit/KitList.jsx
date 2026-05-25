import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import KitListComponent from './KitListComponent';
function KitList() {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <KitListComponent />
          </div>
          <AppFooter />
        </div>

      </div>
    </>
  )
}

export default KitList