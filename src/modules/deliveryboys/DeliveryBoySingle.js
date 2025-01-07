import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../component/api';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../assets/icons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PersonalDetails from './PersonalDetails';
import DeliveryHistory from './DeliveryHistory';

const Tab = createMaterialTopTabNavigator();

const DeliveryBoySingle = ({route}) => {
  const [profile, setProfile] = useState({});
  const navigation = useNavigation();
  const {id} = route.params;
  useEffect(() => {
    axiosInstance.get(`accounts/delivery-boy-single-view/${id}/`).then(res => {
      setProfile(res.data.data);
    });
  }, [id]);

  const right = () => (
    <TouchableOpacity
      style={styles.editContainer}
      onPress={() => navigation.navigate('EditDeliveryBoy', {profile})}>
      <Image source={icons.edit} />
      <Text style={{color: '#000'}}>Edit</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={profile.full_name} right={right} />
      {/* <View style={styles.contentContainer}> */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: profile.image
                ? profile.image
                : 'https://via.placeholder.com/150',
            }}
            style={styles.profileImage}
          />
          <View style={{width: '60%'}}>
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.id}>ID : {profile.id}</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Tab.Navigator
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: 500,
                color: '#4A4D4E',
                textTransform: 'capitalize',
              },
              tabBarIndicatorStyle: {backgroundColor: '#666666'},
              tabBarStyle: {elevation: 0},
            }}>
            <Tab.Screen name="Personal Details">
              {() => <PersonalDetails profile={profile}/>}
            </Tab.Screen>
            <Tab.Screen name="Delivery History">
              {() => <DeliveryHistory DeliveryBoyId={id}/>}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
      {/* </View> */}
    </View>
  );
};

export default DeliveryBoySingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  editContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    gap: 18,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#007DDC',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    color: '#272727',
  },
  id: {
    fontSize: 14,
    color: '#676767',
    fontWeight: '400',
  },
  detailsContainer: {
    marginBottom: 20,
    gap: 16,
  },
  detailItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 5,
    fontWeight: '400',
  },
  valueContainer: {
    backgroundColor: '#F5F6F7',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  input: {
    backgroundColor: '#F5F6F7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1919',
  },
  editText: {
    fontSize: 16,
    color: '#007BFF',
  },
  bottomContainer: {
    flex: 1, // Added flex 1 to ensure it takes up the remaining height for tabs
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
});
