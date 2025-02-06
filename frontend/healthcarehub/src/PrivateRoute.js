import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import useAuthContext from './useAuthContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authIsReady } = useAuthContext();

  return (
    <Route
      {...rest}
      element={authIsReady ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
