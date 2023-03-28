import React, { createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const token = await AsyncStorage.getItem('@RNAuth:token');
      const storedUser = await AsyncStorage.getItem('@RNAuth:user');

      if (token && storedUser) {
        setAuthorizationHeader(token);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const setAuthorizationHeader = (token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  const storeUserData = async (token, user) => {
    await AsyncStorage.multiSet([
      ['@RNAuth:token', token],
      ['@RNAuth:user', JSON.stringify(user)],
    ]);
  };

  const login = async (response) => {
    const { token, user } = response;

    setUser(user);
    setIsAuthenticated(true);

    await storeUserData(token, user);
    setAuthorizationHeader(token);
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['@RNAuth:token', '@RNAuth:user']);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated,
        user, 
        login, 
        logout 
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}