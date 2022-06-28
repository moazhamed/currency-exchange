import { AxiosResponse } from 'axios';

import axiosInstance from '..';
import ApiUrlConstants from '../../Utils/ApiUrlConstants';


class CurrencyService {
  getAllCurrencies(): Promise<AxiosResponse> {
    return axiosInstance.get(ApiUrlConstants.allCurrencies);
  }
  getRatioBetweenTwoCurrencies(firstCurrency: string, secondCurrency: string): Promise<AxiosResponse> {
    return axiosInstance.get(ApiUrlConstants.currencyWithRespectToAnother(firstCurrency, secondCurrency))
  }
  getRatioBetweenCurrenciesInDate(firstCurrency: string, secondCurrency: string, time: any): Promise<AxiosResponse>{
    return axiosInstance.get(ApiUrlConstants.getRatioBetweenCurrenciesInDate(firstCurrency,secondCurrency,time));
  }
}

export default new CurrencyService();
