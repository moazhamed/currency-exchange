import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {I18nManager} from 'react-native';

interface AppState {}

const initialState = {} as AppState;

interface languagePayload {
  newLanguage: string;
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
});

export const {} = appSlice.actions;

export default appSlice.reducer;
