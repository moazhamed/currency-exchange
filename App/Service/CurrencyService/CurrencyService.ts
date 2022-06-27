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
}

export default new CurrencyService();
