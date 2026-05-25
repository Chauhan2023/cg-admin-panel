import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import SubCategoryListComponent from '../../components/SubCategory/SubCategoryListComponent';
function SubcategoryList() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <SubCategoryListComponent/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default SubcategoryList