/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './App/AppNavigation';
import {useDispatch} from 'react-redux';
import {requestNotificationPermission} from '../Redux/Permissions/PermissionsSlice';

import {useEffect} from 'react';

const MainNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestNotificationPermission());
  }, []);

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default MainNavigation;
