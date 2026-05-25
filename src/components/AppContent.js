import React, { useEffect } from 'react'
import CategorySlider from './CategorySlider'
import ChartComponent from './ChartProfitComponent'
import ChartSalesComponents from './ChartSalesComponents'
import OrderReports from './OrderReports'
import SalesFigure from './SalesFigure'
import TrendingOrder from './TrendingOrder'
import { initializeAOS } from '../assets/Animation/initializeAOS';
function AppContent() {
    useEffect(() => {
        initializeAOS();  // Initialize AOS with a single line
      }, []);
  return (
    <div className='container'>

    <div className='row'>

    <div className="col-xxl-3 col-xl-4 col-md-4 col-12" data-aos="fade">
                            <div className="card p-0">
                                <div className="cadr-body">
                                    <div className="welcome-card">
                                        <div>
                                            <h5> Exclusive weekend discounts</h5>
                                            <h3>Welcome To Digital Gourmet</h3>
                                            <a href="category.html" className="btn btn-primary w-50 mx-auto">Check Menu</a>
                                            <img className="offer" src="https://themes.pixelstrap.net/zomo/landing/backend/assets/images/dashboard/offer.gif" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    <div className='col-xxl-9 col-xl-8 col-md-8 col-12'>

    <div className='col-12' >
    {/* <CategorySlider/> */}
    </div>

    <div className='row' data-aos="fade-up">
    <ChartComponent/>
    <ChartSalesComponents/>
    </div>        
    </div>


    <div className='col-12 row' data-aos="fade-up">
   
    {/* <OrderReports/>  */}
    {/* <SalesFigure/> */}



    </div>


    <div className='col-12' data-aos="zoom-in">
       <TrendingOrder/>



    </div>
    

      

    </div>

    </div>
  )
}

export default AppContent