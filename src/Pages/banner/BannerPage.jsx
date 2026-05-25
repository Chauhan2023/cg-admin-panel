import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllBanner from '../../components/Banner/AllBanner';
import ErrorBoundary from '../../components/ErrorBoundary.jsx';
function BannerPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
      <ErrorBoundary>
          <AllBanner/>
      </ErrorBoundary>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default BannerPage;