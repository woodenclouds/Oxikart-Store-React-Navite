import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './TabNavigations';
import Adddelivery from '../modules/deliveryboys/adddeliveryboy/Adddelivery';
import EditScreen from '../modules/deliveryboys/EditScreen';
import DBDetailsScreen from '../modules/deliveryboys/DBDetailsScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTab"
        component={MainTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddDelivery"
        component={Adddelivery}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DBDetails"
        component={DBDetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Edit deliveryboy"
        component={EditScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
