import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// const Profile = React.lazy(() => import('./Pages/Profile'))
const routes = [

  { path: '/', name: 'Dashboard', element: Dashboard },
  { path: '/designer-list', name: 'Designer List', element: React.lazy(() => import('./Pages/designer/DesignerList')) },
  { path: '/designer-create', name: 'Add Designer', element: React.lazy(() => import('./Pages/designer/AddDesigner')) },
  // { path: '/profile', name: 'Profile', element: Profile  },

]

export default routes