import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import currencyService from '../../Service/CurrencyService/CurrencyService';
import { getCurrenciesBody } from '../../Service/CurrencyService/CurrencyTypes';

interface AppState {
  currencies: {}
  loading: boolean,
  currencyRatio: {date: string, ratio: Number}
}

const initialState = {
  currencies: {},
  loading: false,
  currencyRatio: {}
} as AppState;

export const getAllCurrencies = createAsyncThunk(
  'app/currencies',
  async () => {
    const response = await currencyService.getAllCurrencies();
    return response.data;
  },
);

export const getRatioBetweenCurrencies = createAsyncThunk(
  'app/currencies/ratio',
  async (data: any) => {
    const { firstCurrency, secondCurrency } = data;
    const response = await currencyService.getRatioBetweenTwoCurrencies(firstCurrency, secondCurrency);
    return response.data;
  },
);


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder
      .addCase(getAllCurrencies.pending, state => {
        state.loading = true;
      })
      .addCase(getAllCurrencies.rejected, state => {
        state.loading = false;
      })
      .addCase(getAllCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencies = action.payload;
      })
      .addCase(getRatioBetweenCurrencies.pending, state => {
        state.loading = true;
      })
      .addCase(getRatioBetweenCurrencies.rejected, state => {
        state.loading = false;
      })
      .addCase(getRatioBetweenCurrencies.fulfilled, (state, action) => {
        state.loading = false;
        state.currencyRatio = action.payload;
      })
  },
});

export const { } = appSlice.actions;

export default appSlice.reducer;
