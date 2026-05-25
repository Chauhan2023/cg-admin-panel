import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllVideo from '../../components/Video/AllVideo';
function VideoPage() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllVideo/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default VideoPage;