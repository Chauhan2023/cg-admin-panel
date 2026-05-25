import React, { Suspense, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import './scss/style.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import ProtectedRoute from './components/Hooks/ProtectedRoute'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomQueryListComponent from './Pages/Custom QueryList/CustomQueryListComponent'
import MainCategoryList from './Pages/main category/MainCategoryList'
import AllBanner from './components/Banner/AllBanner'
import Dashboard from './views/dashboard/Dashboard'

const HeaderAdsList = React.lazy(() => import('./Pages/headerAds/HeaderAds'))
const AddHeaderAds = React.lazy(() => import('./Pages/headerAds/AddHeadersAds'))
const AddBanner = React.lazy(() => import('./Pages/banner/AddBannerPage'))
const CareInstructionPageList = React.lazy(() => import('./Pages/CareInstructionPage'))
const AddCareInstructionPage = React.lazy(() => import('./Pages/AddCareInstructionPage'))
const AdditionalInfoPageList = React.lazy(() => import('./Pages/AdditionalInfoPage'))
const AddAdditionalInfoPage = React.lazy(() => import('./Pages/AddAdditionalInfoPage'))
const TestimonialPage = React.lazy(() => import('./Pages/testimonial/TestimonialPage'))
const AddTestimonialPage = React.lazy(() => import('./Pages/testimonial/AddTestimonialPage'))
const VideoPage = React.lazy(() => import('./Pages/video/VideoPage'))
const AddVideoPage = React.lazy(() => import('./Pages/video/AddVideoPage'))
const Order = React.lazy(() => import('./Pages/order/Order'))
const AddShowcasebox = React.lazy(() => import('./Pages/showcasebox/AddShowcasebox'))
const Showcasebox = React.lazy(() => import('./Pages/showcasebox/Showcasebox'))
const AddAdsBanner = React.lazy(() => import('./Pages/adsbanner/AddAdsBanner'))
const AdsBanner = React.lazy(() => import('./Pages/adsbanner/AdsBanner'))
const ContactUs = React.lazy(() => import('./Pages/contactus/ContactUs'))
const NewsEmailLetter = React.lazy(() => import('./Pages/newsemailletter/NewsEmailLetter'))
const ProductReview = React.lazy(() => import('./Pages/productreview/ProductReview'))
const Logo = React.lazy(() => import('./Pages/logo/Logo'))
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const Products = React.lazy(() => import('./Pages/product/Products'))
const AddProduct = React.lazy(() => import('./Pages/product/AddProduct'))
const CategoryList = React.lazy(() => import('./Pages/category/CategoryList'))
const AddCategory = React.lazy(() => import('./Pages/category/AddCategory'))
const KitList = React.lazy(() => import('./Pages/Kit/KitList'))
const AddHomeBanner = React.lazy(() => import('./Pages/homebanner/AddHomeBanner'))
const HomeBanner = React.lazy(() => import('./Pages/homebanner/HomeBanner'))
const ComplaintPage = React.lazy(() => import('./Pages/Report/ComplaintPage'))

const DesignerList = React.lazy(() => import('./Pages/designer/DesignerList'))
const AddDesigner = React.lazy(() => import('./Pages/designer/AddDesigner'))

const SubCategoryList = React.lazy(() => import('./Pages/subcategory/SubcategoryList'))
const AddColorTheme = React.lazy(() => import('./Pages/colortheme/AddColorTheme'))
const ColorTheme = React.lazy(() => import('./Pages/colortheme/ColorTheme'))
const AddSubCategory = React.lazy(() => import('./Pages/subcategory/AddSubcategory'))
const FoodList = React.lazy(() => import('./Pages/FoodList'))
const AddFood = React.lazy(() => import('./Pages/AddFood'))
const AllUser = React.lazy(() => import('./Pages/user/AllUser'))
const AddUser = React.lazy(() => import('./Pages/user/AddUser'))
const Login = React.lazy(() => import('./Pages/Login'))

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate here
  const isAuthenticated = useSelector((state) => state.authenticated);
  useEffect(() => {
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      navigate("/login"); // redirect only if not logged in
    }
  }, [isAuthenticated, navigate]);

  // Session timeout logic (1 hour of inactivity)
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId;

    const resetTimeout = () => {
      if (timeoutId) clearTimeout(timeoutId);
      // 1 hour timer (3600000 ms)
      timeoutId = setTimeout(() => {
        dispatch({ type: 'LOGOUT' });
      }, 3600000);
    };

    // Attach event listeners for user activity
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keydown', resetTimeout);
    window.addEventListener('click', resetTimeout);
    window.addEventListener('scroll', resetTimeout);

    // Initialize the timer
    resetTimeout();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimeout);
      window.removeEventListener('keydown', resetTimeout);
      window.removeEventListener('click', resetTimeout);
      window.removeEventListener('scroll', resetTimeout);
    };
  }, [isAuthenticated, dispatch]);

  return (

    <Suspense
      fallback={
        <div
          className="pt-3 text-center w-100 d-flex justify-content-center align-items-center"
          style={{ height: '100vh' }}
        >
          <Spinner color="warning" className="color"></Spinner>
        </div>
      }
    >
      <Routes >
        <Route path="/" element={<DefaultLayout />} />
        <Route path="/headerads" element={<HeaderAdsList />} />
        <Route path="/addheaderads" element={<AddHeaderAds />} />
        <Route exact path="/allbanners" element={<AllBanner />} />
        <Route path="/addbanners" element={<AddBanner />} />
        <Route path="/allcare" element={<CareInstructionPageList />} />
        <Route path="/addcare" element={<AddCareInstructionPage />} />
        <Route path="/alladditionalinfo" element={<AdditionalInfoPageList />} />
        <Route path="/addadditionalinfo" element={<AddAdditionalInfoPage />} />
        <Route path="/alltestimonialpage" element={<TestimonialPage />} />
        <Route path="/addtestimonialpage" element={<AddTestimonialPage />} />
        <Route path="/allshowcasebox" element={<Showcasebox />} />
        <Route path="/addshowcasebox" element={<AddShowcasebox />} />
        <Route path="/alladsbanner" element={<AdsBanner />} />
        <Route path="/addadsbanner" element={<AddAdsBanner />} />
        <Route path="/video" element={<VideoPage />} />
        <Route path="/addvideo" element={<AddVideoPage />} />
        <Route path="/product" element={<Products />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/categorylist" element={<CategoryList />} />

        <Route path="/add-home-banner" element={<AddHomeBanner />} />
        <Route path="/home-banner-list" element={<HomeBanner />} />

        <Route path="/subcategorylist" element={<SubCategoryList />} />
        <Route path="/addsubcategory" element={<AddSubCategory />} />
        <Route path="/addcategory" element={<AddCategory />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/news-email-letter" element={<NewsEmailLetter />} />
        <Route path="/product-review" element={<ProductReview />} />
        <Route path="/logo" element={<Logo />} />
        <Route path="/order" element={<Order />} />
        <Route path="/addcolortheme" element={<AddColorTheme />} />
        <Route path="/colortheme" element={<ColorTheme />} />
        <Route path="/foodlist" element={<FoodList />} />
        <Route path="/kit-list" element={<KitList />} />
        <Route path="/addfood" element={<AddFood />} />
        <Route path="/allusers" element={<AllUser />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/complaint-report" element={<ComplaintPage />} />
        <Route path="/designer-list" element={<DesignerList />} />
        <Route path="/designer-create" element={<AddDesigner />} />
        <Route path="/personalized-query" element={<CustomQueryListComponent />} />
        <Route path="/main-category-list" element={<MainCategoryList />} />
        <Route path="/login" element={<Login />} />
      </Routes>


      <ToastContainer autoClose={1000} />
    </Suspense>

  )
}

export default App
