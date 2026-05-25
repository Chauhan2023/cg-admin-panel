import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import AllCareInstruction from '../components/CareInstruction/AllCareInstruction';
function CareInstructionPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllCareInstruction/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default CareInstructionPage;