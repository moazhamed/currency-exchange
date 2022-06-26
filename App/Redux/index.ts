import {configureStore, combineReducers} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

import ReactotronConfig from '../../ReactotronConfig';

import appReducer from './App/AppSlice';

import REDUX_PERSIST from './ReduxPersist';

const appConfig = {
  key: 'App',
  storage: AsyncStorage,
  whitelist: [],
};

const reducers = combineReducers({
  app: persistReducer(appConfig, appReducer),
});

const persistConfig = REDUX_PERSIST;

const finalReducers = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: finalReducers,
  enhancers: [ReactotronConfig.createEnhancer!()],
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export {persistor, store};
