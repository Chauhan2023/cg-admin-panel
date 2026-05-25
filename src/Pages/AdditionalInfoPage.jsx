import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import AllAdditionalnfo from '../components/Additionalnfo/AllAdditionalnfo';
function AdditionalInfoPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllAdditionalnfo/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AdditionalInfoPage; 