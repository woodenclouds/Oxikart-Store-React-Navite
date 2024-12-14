import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import axiosInstance from '../../component/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TitleHeader from '../../component/TitleHeader';
import { setUserInfo } from '../../redux/slices/userSlice';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});

  const {user_id} = useSelector(state => state.user);

  const handleLogout = async () => {
    AsyncStorage.clear()
      .then(() => console.log('AsyncStorage cleared'))
      .catch(e => console.log('AsyncStorage error: ', e));
    dispatch(
      setUserInfo({isVerified: false, token: '', role: '', user_id: null}),
    );
  };

  useEffect(() => {
    axiosInstance
      .get(`accounts/single-view-store-admin/${user_id}/`)
      .then(res => {
        setUserData(res.data.data);
      });
  }, [user_id]);

  return (
    <>
      <TitleHeader title="Profile" />
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              size="large"
              source={{
                uri: userData.logo
                  ? userData.logo
                  : 'https://via.placeholder.com/150',
              }} // Replace with the actual image URL
            />
          </View>
          <View>
            <Text style={styles.shopName}>{userData?.store_name}</Text>
            <Text style={styles.shopId}>Shop ID: {userData?.store_id}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Phone number :</Text>
            <Text style={styles.infoText}>+91 {userData?.phone}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Email ID :</Text>
            <Text style={styles.infoText}>{userData?.email}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Address :</Text>
            <Text style={styles.infoText}>
              {userData?.address_1}, {userData?.address_2}
              {'\n'}
              {userData?.city}, {userData?.state}, {userData?.country} {'\n'}
              {userData?.pincode}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => handleLogout()}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderRadius: 8,
    gap: 30,
  },
  avatar: {
    borderColor: '#007DDC',
    borderWidth: 2,
    borderRadius: 100,
    padding: 3,
  },
  shopName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#474747',
  },
  shopId: {
    fontSize: 12,
    color: '#474747',
    fontWeight: '400',
  },
  info: {
    gap: 20,
    paddingHorizontal: 24,
    marginVertical: 20,
    flex: 1,
  },
  infoContainer: {},
  infoTitle: {
    fontSize: 14,
    color: '#676767',
    fontWeight: '400',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#474747',
    fontWeight: '500',
    lineHeight: 20,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#EDEDED',
  },
  logoutButton: {
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#D25337',
    alignItems: 'center',
    borderRadius: 4,
  },
  logoutButtonText: {
    color: '#D25337',
    fontSize: 16,
  },
});

export default ProfileScreen;
