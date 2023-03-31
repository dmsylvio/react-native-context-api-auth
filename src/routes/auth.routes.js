import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';

//Routes
import Login from '../screen/Login';
import Register from '../screen/Register';
import ForgotPassword from '../screen/Forgot';
import Welcome from '../screen/Welcome';

const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <>
  <StatusBar style="light" />
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <AuthStack.Screen name="Welcome" component={Welcome} />
    <AuthStack.Screen name="Login" component={Login} />
    <AuthStack.Screen name="Register" component={Register} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
  </AuthStack.Navigator>
  </>
);

export default AuthRoutes;