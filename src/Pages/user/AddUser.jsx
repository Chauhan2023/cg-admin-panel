import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../../components/index';
import AddUsersComponent from '../../components/Users/AddUsersComponent';


const DefaultLayout = () => {
  const isAuthenticated = useSelector((state) => state.authenticated);

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
        <AddUsersComponent/>
        </div>
        <AppFooter />
      </div>

    </div>
  );
};

export default DefaultLayout;
