import React from 'react'
import { AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AllProductReview from '../../components/ProductReview/AllProductReview';
function ProductReview() {
  return (
    <>
         <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
        <AllProductReview/>
        </div>
        <AppFooter />
      </div>

    </div>
    </>
  )
}

export default ProductReview;