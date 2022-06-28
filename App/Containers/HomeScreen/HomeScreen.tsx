import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Dimensions, Text } from 'react-native';

import { LineChart } from "react-native-chart-kit";

import SelectDropdown from 'react-native-select-dropdown'
import { batch } from 'react-redux';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../../Hooks/Redux/Redux';

import {
  getAllCurrencies,
  getRatioBetweenCurrenciesFiveYearsBack,
  getRatioBetweenCurrenciesOneDayBack,
  getRatioBetweenCurrenciesOneMonthBack,
  getRatioBetweenCurrenciesOneYearBack,
  getRatioBetweenCurrenciesThreeMonthsBack
} from '../../Redux/App/AppSlice';

import styles from './HomeScreen.styles';

type HomeScreenState = {
  firstCurrency: string | undefined,
  secondCurrency: string | undefined,
  data: any[],
};

const HomeScreen = () => {
  const [state, setState] = useState<HomeScreenState>({
    firstCurrency: '',
    secondCurrency: '',
    data: [1, 2, 3, 4, 5, 6],
  });

  const { firstCurrency, secondCurrency, data } = state;

  const dispatch = useAppDispatch();

  const { currencies,
    oneDayBack,
    oneMonthBack,
    threeMonthsBack,
    fiveYearsBack,
    loading } = useAppSelector(selector => selector.app);

  useEffect(() => {
    getGraphData();
  }, [firstCurrency, secondCurrency])

  useEffect(() => {
    dispatch(getAllCurrencies());
  }, [])

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

      if (!loading) {
        setState((prevState) => ({
          ...prevState,
          data: [Number(oneDayBack), Number(oneMonthBack), Number(threeMonthsBack), Number(fiveYearsBack)]
        }));
      }
    }
  }

  const renderSelectCurrencyButtons = () => {
    return (
      <View style={styles.selectionsContainer}>
        <SelectDropdown
          data={Object.values(currencies)}
          onSelect={(selectedItem, index) => {
            setState((prevState) => ({
              ...prevState,
              firstCurrency: Object.keys(currencies)[index],
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
          data={Object.values(currencies)}
          onSelect={(selectedItem, index) => {
            setState((prevState) => ({
              ...prevState,
              secondCurrency: Object.keys(currencies)[index],
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
        width={Dimensions.get("window").width}
        height={Dimensions.get("window").height * 0.5}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "green",
          backgroundGradientFrom: "red",
          backgroundGradientTo: "blue",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 30
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={styles.graph}
      />
    )
  }

  return <SafeAreaView style={styles.container}>
    {renderSelectCurrencyButtons()}
    {renderGraph()}
  </SafeAreaView>;
};

export default HomeScreen;
