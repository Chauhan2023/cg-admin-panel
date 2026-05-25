import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import MainCategoryListComponent from '../../components/Main Category/MainCategoryListComponent';
function MainCategoryList() {
  return (
    <>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div className="body flex-grow-1">
            <MainCategoryListComponent />
          </div>
          <AppFooter />
        </div>

      </div>
    </>
  )
}

export default MainCategoryList