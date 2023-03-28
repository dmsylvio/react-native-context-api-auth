import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/auth';

//Routes
import AuthRoutes from './auth.routes';

const Routes = () => {
  const { isAuthenticated, loading } = useAuth();

  if(loading){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    )
  }

  return isAuthenticated ? <AuthRoutes /> : <AuthRoutes />;
}

export default Routes;