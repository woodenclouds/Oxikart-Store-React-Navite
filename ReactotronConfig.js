// ReactotronConfig.js
import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Optional: Add plugins like Redux or Saga
// import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .setAsyncStorageHandler(AsyncStorage) // For async storage debugging
  .configure({ name: 'oxikart_store' }) // Optional, set project name
  .useReactNative() // Add all built-in React Native plugins
  // .use(reactotronRedux()) // Optional: Redux plugin
  .connect(); // Connect to the Reactotron app

// Only log if in development mode
if (__DEV__) {
  console.tron = Reactotron;
  Reactotron.clear();
}

export default Reactotron;
