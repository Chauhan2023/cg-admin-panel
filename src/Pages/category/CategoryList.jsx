import React from 'react'
import CategoryListComponent from '../../components/Category/CategoryListComponent'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
function CategoryList() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <CategoryListComponent/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default CategoryList