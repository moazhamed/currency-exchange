import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Dimensions } from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import SelectDropdown from 'react-native-select-dropdown'
import { batch } from 'react-redux';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../Hooks/Redux/Redux';
import { getAllCurrencies, getRatioBetweenCurrencies, getRatioBetweenCurrenciesFiveYearsBack, getRatioBetweenCurrenciesInDate, getRatioBetweenCurrenciesOneDayBack, getRatioBetweenCurrenciesOneMonthBack, getRatioBetweenCurrenciesOneYearBack, getRatioBetweenCurrenciesThreeMonthsBack } from '../../Redux/App/AppSlice';

import styles from './HomeScreen.styles';

type HomeScreenState = {
  currentCurrencies: {},
  firstCurrency: string | undefined,
  secondCurrency: string | undefined,
  ratio: Number | undefined
  data: any[]
};

const HomeScreen = () => {
  const [state, setState] = useState<HomeScreenState>({
    currentCurrencies: [],
    firstCurrency: '',
    secondCurrency: '',
    ratio: 1,
    data: [1, 2, 3, 4, 5, 6]
  });

  const { currentCurrencies, firstCurrency, secondCurrency, ratio, data } = state;

  const dispatch = useAppDispatch();

  const { currencies, currencyRatio, oneDayBack, oneMonthBack, threeMonthsBack, fiveYearsBack } = useAppSelector(selector => selector.app);


  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      currentCurrencies: currencies
    }))


    if (firstCurrency && secondCurrency) {
      dispatch(getRatioBetweenCurrencies({ firstCurrency, secondCurrency }));
    }
    if (currencyRatio) {
      setState((prevState) => ({
        ...prevState,
        ratio: currencyRatio.ratio
      }))
    }
  }, [currencies, firstCurrency, secondCurrency])

  const getGraphData = () => {
    if (firstCurrency && secondCurrency) {
      const yourDate = new Date();
      const oneDayBackDate = moment(yourDate).subtract(1, 'days').format('YYYY-MM-DD');
      const oneMonthBackDate = moment(yourDate).subtract(1, "months").format('YYYY-MM-DD');
      const threeMonthsBackDate = moment(yourDate).subtract(3, "months").format('YYYY-MM-DD');
      const yearBackDate = moment(yourDate).subtract(1, 'years').format('YYYY-MM-DD');
      const fiveYearsBackDate = moment(yourDate).subtract(5, 'years').format('YYYY-MM-DD');

      batch(() => {
        dispatch(getRatioBetweenCurrenciesOneDayBack({ firstCurrency, secondCurrency, time: oneDayBackDate }));
        dispatch(getRatioBetweenCurrenciesOneMonthBack({ firstCurrency, secondCurrency, time: oneMonthBackDate }));
        dispatch(getRatioBetweenCurrenciesThreeMonthsBack({ firstCurrency, secondCurrency, time: threeMonthsBackDate }));
        dispatch(getRatioBetweenCurrenciesOneYearBack({ firstCurrency, secondCurrency, time: yearBackDate }));
        dispatch(getRatioBetweenCurrenciesFiveYearsBack({ firstCurrency, secondCurrency, time: fiveYearsBackDate }));
      })

      setState((prevState) => ({
        ...prevState,
        data: [Number(oneDayBack), Number(oneMonthBack), Number(threeMonthsBack), Number(fiveYearsBack)]
      }));
    }
  }

  useEffect(() => {
    getGraphData()
  }, [firstCurrency, secondCurrency, ratio])

  useEffect(() => {
    dispatch(getAllCurrencies());
  }, [])

  const renderSelectCurrencyButtons = () => {
    return (
      <View style={styles.selectionsContainer}>
        <SelectDropdown
          data={Object.values(currentCurrencies)}
          onSelect={(selectedItem, index) => {
            setState((prevState) => ({
              ...prevState,
              firstCurrency: Object.keys(currentCurrencies).find(key => currentCurrencies[key] === selectedItem),
            }))
          }}
          buttonStyle={styles.button}
          defaultButtonText={'currency 1'}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
        <SelectDropdown
          data={Object.values(currentCurrencies)}
          onSelect={(selectedItem, index) => {
            setState((prevState) => ({
              ...prevState,
              secondCurrency: Object.keys(currentCurrencies).find(key => currentCurrencies[key] === selectedItem),
            }))
          }}
          defaultButtonText={'currency 2'}
          buttonStyle={styles.button}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            return item
          }}
        />
      </View>
    )

  }

  const renderGraph = () => {
    return (
      <LineChart
        data={{
          labels: ["1D", "1M", "3M", "1Y", "5Y"],
          datasets: [
            {
              data: data
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={Dimensions.get("window").height * 0.5}
        // yAxisLabel="$"
        // yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    )
  }

  return <SafeAreaView style={styles.container}>
    {renderSelectCurrencyButtons()}

    {renderGraph()}

  </SafeAreaView>;
};

export default HomeScreen;
