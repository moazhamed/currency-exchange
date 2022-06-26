import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import {name as appName} from './app.json';

const reactotron = Reactotron.configure({name: appName})
  .useReactNative()
  .use(reactotronRedux())
  .connect();

export default reactotron;
