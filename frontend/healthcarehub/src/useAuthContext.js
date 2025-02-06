// useAuthContext.js

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  return authContext;
};

export default useAuthContext;
