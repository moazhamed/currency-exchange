import React, {useState} from 'react';

import {useDispatch} from 'react-redux';

import styles from './HomeScreen.styles';

type HomeScreenState = {};

const HomeScreen = () => {
  const [state, setState] = useState<HomeScreenState>({});

  const {} = state;

  const dispatch = useDispatch();

  return <></>;
};

export default HomeScreen;
