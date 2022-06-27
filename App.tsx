import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './App/Redux';
import Geolocation from '@react-native-community/geolocation';
import MainNavigation from './App/Navigation/MainNavigation';
import {useEffect} from 'react';

const App = () => {
  if (__DEV__) {
    import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured'),
    );
  }
  const getUserLocation = () => {
    Geolocation.getCurrentPosition(info => console.log('Geolocation', info));
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
