import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import ScrollToTopButton from '../components/ScrollToTopButton';

const DefaultLayout = () => {
  const isAuthenticated = useSelector((state) => state.authenticated);
  const user = useSelector((state) => state.user);

  console.log(isAuthenticated)
  console.log(user)
  // Redirect to login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>

    </div>
  );
};

export default DefaultLayout;
