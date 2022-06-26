import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {I18nManager} from 'react-native';

interface AppState {
  language: string;
  hideSplash: boolean;
  firstLaunch: boolean;
  localizationSelected: boolean;
}

const initialState = {
  language: 'en',
  hideSplash: false,
  firstLaunch: true,
  localizationSelected: false,
} as AppState;

interface languagePayload {
  newLanguage: string;
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeAppLanguage: (state, action: PayloadAction<languagePayload>) => {
      state.language = action.payload.newLanguage;
      state.localizationSelected = true;
    },
    hideSplashScreen: state => {
      state.hideSplash = true;
    },
    setFirstLaunch: state => {
      state.firstLaunch = false;
    },
  },
});

export const {changeAppLanguage, hideSplashScreen, setFirstLaunch} =
  appSlice.actions;

export default appSlice.reducer;
