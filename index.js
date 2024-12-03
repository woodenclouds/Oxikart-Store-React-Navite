/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import './ReactotronConfig';

console.tron.log('Reactotron is set up!'); 

AppRegistry.registerComponent(appName, () => App);
