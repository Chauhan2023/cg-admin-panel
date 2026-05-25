import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilPlus } from '@coreui/icons'
import {
  cilCart,
  cilHome,
  cilUser,
  cilList,
  cilBasket,
  cilTag,
  cilGrid,
  cilFolder,
  cibGoogleAds,
  cibAdobeAcrobatReader,
  cibSignal,
  cilVideo,
  cilImage,
  cilStar,
  cilEnvelopeClosed,
  cilPhone,
  cilBrush,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilHome} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavGroup,
    name: 'Main Category',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Main Category List',
       
        to: '/main-category-list',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Category',
    icon: <CIcon icon={cilGrid} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Category List',
      
        to: '/categorylist',
      },

    ],
  },


  {
    component: CNavGroup,
    name: 'Subcategory',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Subcategory List',
      
        to: '/subcategorylist',
      },
      
    ],
  },

          
        {
    component: CNavGroup,
    name: 'Home Banner',
    icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Home Banner',
        icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
        to: '/home-banner-list',
      },
      {
        component: CNavItem,
        name: 'Add Home Banner',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/add-home-banner',
      },
    ],
  },


  {
    component: CNavGroup,
    name: 'Product',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Products List',

        to: '/product',
      },
    
    ],
  },
  {
    component: CNavGroup,
    name: 'Kit',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Kits List',

        to: '/kit-list',
      },
     
    ],
  },



  {
    component: CNavGroup,
    name: 'Order',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Order List',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
        to: '/order',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Header Ads',
    icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Ads List',
        icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
        to: '/headerads',
      },
      {
        component: CNavItem,
        name: 'Add Ads',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addheaderads',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Testimonial',
    icon: <CIcon icon={cibSignal} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Testimonial List',
        icon: <CIcon icon={cibSignal} customClassName="nav-icon" />,
        to: '/alltestimonialpage',
      },
      {
        component: CNavItem,
        name: 'Add Testimonial',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addtestimonialpage',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Banner',
    icon: <CIcon icon={cibAdobeAcrobatReader} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner List',
        icon: <CIcon icon={cibAdobeAcrobatReader} customClassName="nav-icon" />,
        to: '/allbanners',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Showcasebox',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Showcasebox List',
        icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
        to: '/allshowcasebox',
      },
      {
        component: CNavItem,
        name: 'Add Showcasebox',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addshowcasebox',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Ads Banner',
    icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Ads Banner List',
        icon: <CIcon icon={cilTag} customClassName="nav-icon" />,
        to: '/alladsbanner',
      },
      {
        component: CNavItem,
        name: 'Add Ads Banner',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addadsbanner',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Contact US',
    icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Contact List',
        icon: <CIcon icon={cilPhone} customClassName="nav-icon" />,
        to: '/contact-us',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'News Email',
    icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'News Email List',
        icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
        to: '/news-email-letter',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Product Review',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Product Review List',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
        to: '/product-review',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Users List',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        to: '/allusers',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Logo',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Logo List',
        to: '/logo',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Video',
    icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Video List',
        to: '/video',
      },
      {
        component: CNavItem,
        name: 'Add Video',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addvideo',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Color',
    icon: <CIcon icon={cilBrush} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Color List',
        icon: <CIcon icon={cilBrush} customClassName="nav-icon" />,
        to: '/colortheme',
      },
      {
        component: CNavItem,
        name: 'Add Color',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
        to: '/addcolortheme',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Query',
    icon: <CIcon icon={cibSignal} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Need custom design query',

        to: '/personalized-query',
      },

    ],
  },
   {
    component: CNavGroup,
    name: 'Report',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Complaint Report',

        to: '/complaint-report',
      },

    ],
  },
    {
    component: CNavGroup,
    name: 'Designers',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Designer List',
        to: '/designer-list',
      },
      {
        component: CNavItem,
        name: 'Add Designer',
        to: '/designer-create',
      },

    ],
  },

]

export default _nav
