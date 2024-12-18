import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/svg-icons/oxykart-logo.svg';
import BoxIcon from '../assets/svg-icons/box-icon.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ReusableBottomSheet from '../component/ReusableBottomSheet';
import OtpModal from '../component/OtpModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUserInfo} from '../redux/slices/userSlice';
import {useDispatch} from 'react-redux';
import DeliveryItem from '../component/DeliveryItem';
import useGetapi from '../hooks/useGetapi';

const Tab = createMaterialTopTabNavigator();

const DATA = [
  {
    id: '1',
    status: 'Delivered',
    idNumber: 'ID:123746289374',
    contact: '+91 906 113 2363',
  },
  {
    id: '2',
    status: 'Returned',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '3',
    status: 'Delivered',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '4',
    status: 'Pending',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '5',
    status: 'Pending',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '6',
    status: 'Pending',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '7',
    status: 'Pending',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '8',
    status: 'Pending',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  {
    id: '9',
    status: 'Pending',
    idNumber: 'ID:123746289374',
    deliveryBoy: 'Anooj Reji',
  },
  // Add more data as needed
];

const PendingScreen = ({showBottomSheet}) => {

  // const { data } = useGetapi("activities/delivery-boy-view-pending/");

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={DATA.filter(item => item.status === 'Pending')}
        renderItem={({item}) => (
          <DeliveryItem item={item} showBottomSheet={showBottomSheet} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={{backgroundColor: '#fff'}}
      />
    </View>
  );
};

const CompletedScreen = ({showBottomSheet}) => (
  <View style={styles.listContainer}>
    <FlatList
      data={DATA.filter(
        item => item.status === 'Delivered' || item.status === 'Returned',
      )}
      renderItem={({item}) => (
        <DeliveryItem item={item} showBottomSheet={showBottomSheet} />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContent}
      style={{backgroundColor: '#fff'}}
    />
  </View>
);

const DeliveryStack = () => {
  const bottomSheetRef = useRef(null);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    AsyncStorage.clear()
      .then(() => console.log('AsyncStorage cleared'))
      .catch(e => console.log('AsyncStorage error: ', e));
    dispatch(
      setUserInfo({isVerified: false, token: '', role: '', user_id: null}),
    );
  };

  const showBottomSheet = () => {
    bottomSheetRef.current?.openSheet();
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#007DDC" barStyle="light-content" />
      <LinearGradient colors={['#007DDC', '#004376']} style={styles.container}>
        <View style={styles.header}>
          <Logo width={130} height={40} />
          <TouchableOpacity onPress={() => handleLogout()}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.dataContainer}>
            <View style={{paddingTop: 20}}>
              <View style={styles.iconContainer}>
                <BoxIcon width={25} height={25} />
              </View>
              <View style={styles.bottomData}>
                <Text style={styles.text1}>Today’s deliveries :</Text>
                <Text style={styles.text2}>40</Text>
              </View>
            </View>
            <LinearGradient
              colors={['#007DDC', '#004376']}
              style={styles.bottomLine}
            />
          </View>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 14,
              fontWeight: 700,
              color: '#6E7475',
              textTransform: 'capitalize',
            },
            tabBarIndicatorStyle: {backgroundColor: '#007DDC'},
            tabBarStyle: {elevation: 0},
          }}>
          <Tab.Screen name="Pending">
            {() => <PendingScreen showBottomSheet={showBottomSheet} />}
          </Tab.Screen>
          <Tab.Screen name="Completed">
            {() => <CompletedScreen showBottomSheet={showBottomSheet} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
      <ReusableBottomSheet
        ref={bottomSheetRef}
        content={<OtpModal />} // Content of the sheet
        height="60%" // Height of the sheet (customizable)
      />
    </View>
  );
};

export default DeliveryStack;

const styles = StyleSheet.create({
  container: {
    height: 142,
    overflow: 'visible',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  dataContainer: {
    height: 138,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    position: 'relative',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    paddingBottom: 2,

    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  mainContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    top: 70,
  },
  bottomLine: {
    width: '100%',
    height: 6,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F7FA',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomData: {
    flexDirection: 'row',
    paddingTop: 18,
    alignItems: 'center',
    gap: 10,
  },
  text1: {
    color: '#565656',
    fontWeight: '400',
    fontSize: 16,
  },
  text2: {
    color: '#202020',
    fontWeight: '400',
    fontSize: 28,
  },
  bottomContainer: {
    flex: 1, // Added flex 1 to ensure it takes up the remaining height for tabs
    marginTop: 75,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
});
