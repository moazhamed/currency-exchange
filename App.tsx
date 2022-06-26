import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {View} from 'react-native';
import {persistor, store} from './App/Redux';
import MainNavigation from './App/Navigation/MainNavigation';

const App = () => {
  if (__DEV__) {
    import('./ReactotronConfig').then(() =>
      console.log('Reactotron Configured'),
    );
  }

  return (
    <View>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </View>
  );
};

export default App;
