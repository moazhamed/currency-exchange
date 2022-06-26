import AsyncStorage from '@react-native-async-storage/async-storage';

// More info here:  https://shift.infinite.red/shipping-persistant-reducers-7341691232b1
const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.0',
  storage: AsyncStorage,
  key: 'ShahryTest',
  // Reducer keys that you do NOT want stored to persistence here.
  blacklist: ['app'],
  // Optionally, just specify the keys you DO want stored to persistence.
  // An empty array means 'don't store any reducers' -> infinitered/ignite#409
  // whitelist: [],
  // transforms: [immutablePersistenceTransform]
};

export default REDUX_PERSIST;
