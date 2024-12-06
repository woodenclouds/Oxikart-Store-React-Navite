import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import AppNavigator from './src/navigators/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
        <Provider store={ store }>
          <NavigationContainer>
            <SafeAreaView style={ styles.container }>
              <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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
