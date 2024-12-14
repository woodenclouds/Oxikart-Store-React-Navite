import * as React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AuthStack from './AuthStackNavigation';
import MainTab from './TabNavigations';
import AppStack from './StackNavigations';
import {getItem} from '../utils/functions';
import DeliveryStack from './DeliveryStack';
import { setUserInfo } from '../redux/slices/userSlice';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user);
  
  const fetchData = async () => {
    const token = await getItem('token');
    const role = await getItem('role');
    const user_id = await getItem('user_id');

    if (token) {
      dispatch(
        setUserInfo({
          token: token,
          role: role,
          isVerified: true,
          user_id: user_id,
        }),
      );
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  if (userState.isVerified && userState.role === 'Store') {
    return <AppStack />;
  } else if (userState.isVerified && userState.role === 'Delivery_Boys') {
    return <DeliveryStack />;
  } else {
    return <AuthStack />;
  }
};

export default AppNavigator;
