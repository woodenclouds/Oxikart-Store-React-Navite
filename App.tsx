import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigators/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <Provider store={store}>
        <NavigationContainer>
          <SafeAreaView style={ styles.container }>
            <AppNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
