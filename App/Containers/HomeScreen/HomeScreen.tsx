import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import { useAppDispatch, useAppSelector } from '../../Hooks/Redux/Redux';
import { getAllCurrencies, getRatioBetweenCurrencies } from '../../Redux/App/AppSlice';

import styles from './HomeScreen.styles';

type HomeScreenState = {
  currentCurrencies: {},
  firstCurrency: string | undefined,
  secondCurrency: string | undefined,
};

const HomeScreen = () => {
  const [state, setState] = useState<HomeScreenState>({
    currentCurrencies: [],
    firstCurrency: '',
    secondCurrency: ''
  });

  const { currentCurrencies, firstCurrency, secondCurrency } = state;

  const dispatch = useAppDispatch();

  const { currencies, currencyRatio } = useAppSelector(selector => selector.app);


  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      currentCurrencies: currencies
    }))
    if (firstCurrency && secondCurrency) {
      dispatch(getRatioBetweenCurrencies({ firstCurrency, secondCurrency }));
    }
    if (currencyRatio) {
      console.log('currencyRatio', currencyRatio);
    }
  }, [currencies, firstCurrency, secondCurrency])

  useEffect(() => {
    dispatch(getAllCurrencies());
  }, [])

  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  return <SafeAreaView style={styles.container}>
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
  </SafeAreaView>;
};

export default HomeScreen;
