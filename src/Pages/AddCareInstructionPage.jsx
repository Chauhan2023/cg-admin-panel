import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import AddCareInstruction from '../components/CareInstruction/AddCareInstruction';
function AddCareInstructionPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AddCareInstruction/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default AddCareInstructionPage;