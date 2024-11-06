import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DeliveryBoy,
  DeliveryBoyBlue,
  Home,
  HomeColor,
} from '../assets/svg-icons';
import HomeScreen from '../modules/home/HomeScreen';
import DeliveryBoyScreen from '../modules/deliveryboys/DeliveryBoyScreen';
import OrderScreen from '../modules/order/OrderScreen';
import OrderIcon from '../assets/svg-icons/OrderIcon';
import OrderIconBlue from '../assets/svg-icons/OrderIconBlue';
import ReturnScreen from '../modules/Return/ReturnScreen';
import ReturnIcon from '../assets/svg-icons/ReturnIcon';
import ReturnIconBlue from '../assets/svg-icons/ReturnIconBlue';
import ProfileScreen from '../modules/profile/ProfileScreen';
import ProfileTabIcon from '../assets/svg-icons/ProfileTabIcon';
import ProfileBlue from '../assets/svg-icons/ProfileBlue';

const Tab = createBottomTabNavigator();

const MainTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          color: '#141414',
          fontSize: '20px',
          paddingVertical: '50px',
        }, // Default label color with vertical padding
        tabBarActiveTintColor: '#007DDC',
        tabBarStyle: {paddingTop: 10, paddingBottom: 10,height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({route}) => ({
          tabBarLabelStyle: {
            color: route.state?.index === 0 ? '#007DDC' : '#141414',
          }, // Change label color when focused
          headerShown: false,
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Home width={23} height={24} />
            ) : (
              <HomeColor width={23} height={24} />
            ),
        })}
      />
      <Tab.Screen
        name="Delivery Boys"
        component={DeliveryBoyScreen}
        options={({route}) => ({
          tabBarLabelStyle: {
            color: route.state?.index === 0 ? '#007DDC' : '#141414',
          }, // Change label color when focused
          headerShown: false,
          tabBarIcon: ({focused}) =>
            !focused ? (
              <DeliveryBoy width={23} height={24} />
            ) : (
              <DeliveryBoyBlue width={23} height={24} />
            ),
        })}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={({route}) => ({
          tabBarLabelStyle: {
            color: route.state?.index === 0 ? '#007DDC' : '#141414',
          }, // Change label color when focused
          headerShown: false,
          tabBarIcon: ({focused}) =>
            !focused ? (
              <OrderIcon width={23} height={24} />
            ) : (
              <OrderIconBlue width={23} height={24} />
            ),
        })}
      />
      <Tab.Screen
        name="Return"
        component={ReturnScreen}
        options={({route}) => ({
          tabBarLabelStyle: {
            color: route.state?.index === 0 ? '#007DDC' : '#141414',
          }, // Change label color when focused
          headerShown: false,
          tabBarIcon: ({focused}) =>
            !focused ? (
              <ReturnIcon width={23} height={24} />
            ) : (
              <ReturnIconBlue width={23} height={24} />
            ),
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({route}) => ({
          tabBarLabelStyle: {
            color: route.state?.index === 0 ? '#007DDC' : '#141414',
          }, // Change label color when focused
          headerShown: false,
          tabBarIcon: ({focused}) =>
            !focused ? (
              <ProfileTabIcon width={23} height={24} />
            ) : (
              <ProfileBlue width={23} height={24} />
            ),
        })}
      />
    </Tab.Navigator>
  );
};

export default MainTab;
