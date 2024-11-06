import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../assets/svg-icons/oxykart-logo.svg';
import BoxIcon from '../assets/svg-icons/box-icon.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ColorBox from '../assets/svg-icons/color-box.svg';
import PhoneIcon from '../assets/svg-icons/phone-icon.svg';
import DownArrow from '../assets/svg-icons/down-arrow.svg';
import UpArrow from '../assets/svg-icons/up-arrow.svg';
import ReusableBottomSheet from '../component/ReusableBottomSheet';
import OtpModal from '../component/OtpModal';

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
  // Add more data as needed
];

const DeliveryItem = ({item, showBottomSheet}) => {
  // const showBottomSheet = () => {
  // bottomSheetRef.current?.openSheet();
  // };
  const [activeHide, setActiveHide] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <LinearGradient
        colors={['#EADAC8', '#fff', '#FFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          width: '100%',
          paddingHorizontal: 10,
          borderRadius: 5,
          paddingVertical: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <ColorBox width={40} height={40} />
            <Text style={{color: '#000'}}>{item.idNumber}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={showBottomSheet}>
            <Text style={{color: '#fff'}}>Deliver</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View
        style={{
          paddingVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', gap: 7, alignItems: 'center'}}>
          <PhoneIcon width={15} height={15} />
          <Text style={{color: '#000', fontSize: 12}}>+91 906 113 2363</Text>
        </View>
        {!activeHide ? (
          <TouchableOpacity onPress={() => setActiveHide(!activeHide)}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={{color: '#000', fontSize: 12}}>View details</Text>
              <DownArrow width={10} height={10} />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveHide(!activeHide)}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Text style={{color: '#007DDC', fontSize: 12}}>Hide details</Text>
              <UpArrow width={10} height={10} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {activeHide && (
        <View style={styles.addressCover}>
          <Text style={{color: '#717171', fontSize: 12}}>
            Deliver address :
          </Text>
          <Text style={{color: '#474747', fontSize: 14, marginTop: 5}}>
            Thalirath house thoppipala PO Swaraj Kattappana, Idukki Kerala,
            685511
          </Text>
          <Text style={{color: '#717171', fontSize: 12, marginTop: 8}}>
            Phone number :
          </Text>
          <Text style={{color: '#474747', fontSize: 14, marginTop: 5}}>
            +91 9995819386
          </Text>
        </View>
      )}
    </View>
  );
};

const PendingScreen = ({showBottomSheet}) => (
  <FlatList
    data={DATA.filter(item => item.status === 'Returned')}
    renderItem={({item}) => (
      <DeliveryItem item={item} showBottomSheet={showBottomSheet} />
    )}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.listContent}
    style={{backgroundColor: '#fff'}}
  />
);

const CompletedScreen = ({showBottomSheet}) => (
  <FlatList
    data={DATA.filter(item => item.status === 'Delivered')}
    renderItem={({item}) => (
      <DeliveryItem item={item} showBottomSheet={showBottomSheet} />
    )}
    keyExtractor={item => item.id}
    contentContainerStyle={styles.listContent}
    style={{backgroundColor: '#fff'}}
  />
);

const DeliveryStack = () => {
  const bottomSheetRef = useRef(null);

  const showBottomSheet = () => {
    bottomSheetRef.current?.openSheet();
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#007DDC" />
      <LinearGradient colors={['#007DDC', '#004376']} style={styles.container}>
        <View style={styles.header}>
          <Logo width={130} height={40} />
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.dataContainer}>
            <LinearGradient
              colors={['#007DDC', '#004376']}
              style={styles.bottomLine}
            />
            <View>
              <View style={styles.iconContainer}>
                <BoxIcon width={20} height={20} />
              </View>
              <View style={styles.bottomData}>
                <Text style={styles.text1}>Today’s deliveries :</Text>
                <Text style={styles.text2}>40</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.bottomContainer}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {fontSize: 14},
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
    height: 120,
    overflow: 'visible',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  dataContainer: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  mainContainer: {
    paddingHorizontal: 15,
    position: 'absolute',
    width: '100%',
    top: 50,
  },
  bottomLine: {
    width: '90%',
    height: 6,
    bottom: 0,
    position: 'absolute',
    left: '9%',
    right: 0,
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
    paddingTop: 10,
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
    marginTop: 60,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  itemContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    // borderColor: '#eee',
    margin: 5,
    borderRadius: 5,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 10,
  },
  idText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  deliveryBoyText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  delivered: {
    color: 'green',
    fontWeight: '600',
  },
  returned: {
    color: 'red',
    fontWeight: '600',
  },
  viewDetails: {
    color: '#007DDC',
    marginTop: 5,
    fontWeight: '500',
  },
  listContent: {
    paddingBottom: 20,
  },
  button: {
    backgroundColor: '#007DDC',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  addressCover: {
    backgroundColor: '#F6F6F6',
    padding: 10,
    borderRadius: 5,
  },
});
