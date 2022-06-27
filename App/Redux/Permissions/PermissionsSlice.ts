import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {requestNotifications} from 'react-native-permissions';

interface PermissionState {
  notificationAllowed: string;
}

const initialState = {
  notificationAllowed: '',
} as PermissionState;

export const requestNotificationPermission = createAsyncThunk(
  'notifications/request-permission',
  async () => {
    const response = await requestNotifications(['alert', 'sound']);
    return response;
  },
);

const PermissionSlice = createSlice({
  name: 'Permissions',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(requestNotificationPermission.pending, state => {})
      .addCase(requestNotificationPermission.rejected, state => {})
      .addCase(requestNotificationPermission.fulfilled, (state, action) => {
        state.notificationAllowed = action.payload.status;
      });
  },
});

export const {} = PermissionSlice.actions;

export default PermissionSlice.reducer;
