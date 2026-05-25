import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import AddAdditionalnfo from '../components/Additionalnfo/AddAdditionalnfo';
function AddAdditionalInfoPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AddAdditionalnfo/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AddAdditionalInfoPage;