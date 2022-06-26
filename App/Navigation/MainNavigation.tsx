/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './App/AppNavigation';

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
};

export default MainNavigation;
