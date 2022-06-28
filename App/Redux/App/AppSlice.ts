import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import currencyService from '../../Service/CurrencyService/CurrencyService';
import { getCurrenciesBody } from '../../Service/CurrencyService/CurrencyTypes';
import ApiUrlConstants from '../../Utils/ApiUrlConstants';

interface AppState {
  currencies: {}
  loading: boolean,
  oneDayBack: string,
  oneMonthBack: string,
  threeMonthsBack: string,
  oneYearBack: string,
  fiveYearsBack: string,
  currencyRatio: { date: string, ratio: Number }
}

const initialState = {
  currencies: {},
  loading: false,
  currencyRatio: {},
  oneDayBack: '',
  oneMonthBack: '',
  threeMonthsBack: '',
  oneYearBack: '',
  fiveYearsBack: '',
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
    const { firstCurrency, secondCurrency, time } = data;
    const response = await currencyService.getRatioBetweenTwoCurrencies(firstCurrency, secondCurrency, time);
    return response.data;
  },
);


export const getRatioBetweenCurrenciesOneDayBack = createAsyncThunk(
  'app/currencies/ratio/with/day',
  async (data: any) => {
    const { firstCurrency, secondCurrency, time } = data;
    const response = await currencyService.getRatioBetweenCurrenciesInDate(firstCurrency, secondCurrency, time);
    return response.data;
  },
);
export const getRatioBetweenCurrenciesOneMonthBack = createAsyncThunk(
  'app/currencies/ratio/with/month',
  async (data: any) => {
    const { firstCurrency, secondCurrency, time } = data;
    const response = await currencyService.getRatioBetweenCurrenciesInDate(firstCurrency, secondCurrency, time);
    return response.data;
  },
);

export const getRatioBetweenCurrenciesThreeMonthsBack = createAsyncThunk(
  'app/currencies/ratio/with/three-months',
  async (data: any) => {
    const { firstCurrency, secondCurrency, time } = data;
    const response = await currencyService.getRatioBetweenCurrenciesInDate(firstCurrency, secondCurrency, time);
    return response.data;
  },
);

export const getRatioBetweenCurrenciesOneYearBack = createAsyncThunk(
  'app/currencies/ratio/with/year',
  async (data: any) => {
    const { firstCurrency, secondCurrency, time } = data;
    const response = await currencyService.getRatioBetweenCurrenciesInDate(firstCurrency, secondCurrency, time);
    return response.data;
  },
);

export const getRatioBetweenCurrenciesFiveYearsBack = createAsyncThunk(
  'app/currencies/ratio/with/five-years',
  async (data: any) => {
    const { firstCurrency, secondCurrency, time } = data;
    const response = await currencyService.getRatioBetweenCurrenciesInDate(firstCurrency, secondCurrency, time);
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
      }).addCase(getRatioBetweenCurrenciesOneDayBack.pending, state => {
        state.loading = true;
      }).addCase(getRatioBetweenCurrenciesOneDayBack.rejected, state => {
        state.loading = false;
      }).addCase(getRatioBetweenCurrenciesOneDayBack.fulfilled, (state, action) => {
        state.loading = false;
        state.oneDayBack = Object.values(action.payload)[1];
      }).addCase(getRatioBetweenCurrenciesOneMonthBack.pending, state => {
        state.loading = true;
      }).addCase(getRatioBetweenCurrenciesOneMonthBack.rejected, state => {
        state.loading = false;
      }).addCase(getRatioBetweenCurrenciesOneMonthBack.fulfilled, (state, action) => {
        state.loading = false;
        state.oneMonthBack= Object.values(action.payload)[1];
      }).addCase(getRatioBetweenCurrenciesThreeMonthsBack.pending, state => {
        state.loading = true;
      }).addCase(getRatioBetweenCurrenciesThreeMonthsBack.rejected, state => {
        state.loading = false;
      }).addCase(getRatioBetweenCurrenciesThreeMonthsBack.fulfilled, (state, action) => {
        state.loading = false;
        state.threeMonthsBack = Object.values(action.payload)[1];
      }).addCase(getRatioBetweenCurrenciesOneYearBack.pending, state => {
        state.loading = true;
      }).addCase(getRatioBetweenCurrenciesOneYearBack.rejected, state => {
        state.loading = false;
      }).addCase(getRatioBetweenCurrenciesOneYearBack.fulfilled, (state, action) => {
        state.loading = false;
        state.oneYearBack = Object.values(action.payload)[1];
      }).addCase(getRatioBetweenCurrenciesFiveYearsBack.pending, state => {
        state.loading = true;
      }).addCase(getRatioBetweenCurrenciesFiveYearsBack.rejected, state => {
        state.loading = false;
      }).addCase(getRatioBetweenCurrenciesFiveYearsBack.fulfilled, (state, action) => {
        state.loading = false;
        state.fiveYearsBack = Object.values(action.payload)[1];
      });
  },
});

export const { } = appSlice.actions;

export default appSlice.reducer;
