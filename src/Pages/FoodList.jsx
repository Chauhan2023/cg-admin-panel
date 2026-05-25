import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import FoodListComponent from '../components/FoodListComponent/FoodListComponent';

const FoodList = () => {
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
          <FoodListComponent/>
        </div>
        <AppFooter />
      </div>

    </div>
  );
};

export default FoodList;
