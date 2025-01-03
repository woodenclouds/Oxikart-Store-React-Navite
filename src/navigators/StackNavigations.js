import {createStackNavigator} from '@react-navigation/stack';
import MainTab from './TabNavigations';
import Adddelivery from '../modules/deliveryboys/adddeliveryboy/Adddelivery';
import EditScreen from '../modules/deliveryboys/EditScreen';
import DeliveryBoySingle from '../modules/deliveryboys/DeliveryBoySingle';


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
        name="DBSingle"
        component={DeliveryBoySingle}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditDeliveryBoy"
        component={EditScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
