import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {AppSidebar, AppFooter, AppHeader } from '../../components/index';
import CategoryAddComponent from '../../components/Category/CategoryAddComponent';

const AddCategory = () => {
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
            <CategoryAddComponent/>
        </div>
        <AppFooter />
      </div>

    </div>
  );
};

export default AddCategory;
