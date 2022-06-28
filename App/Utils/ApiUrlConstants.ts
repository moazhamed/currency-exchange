const ApiUrlConstants = {
  allCurrencies: '/latest/currencies.json',
  currencyWithRespectToAnother: (first: string, second: string) => `/latest/currencies/${first}/${second}.json`,
  getRatioBetweenCurrenciesInDate: (first: string, second: string, time: any) => `/${time}/currencies/${first}/${second}.json`
};

export default ApiUrlConstants;
