import React from 'react'
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllTestimonial from '../../components/Testimonial/AllTestimonial';
function TestimonialPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllTestimonial/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default TestimonialPage;