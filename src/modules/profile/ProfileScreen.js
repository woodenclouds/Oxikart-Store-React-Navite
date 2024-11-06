import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {saveItem} from '../../utils/functions';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from '../../store/actions/userActions';
import useGetapi from '../../hooks/useGetapi';
import axiosInstance from '../../component/api';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});
  const {user_id} = useSelector(state => state.user);
  console.log(user_id);

  const handleLogout = async () => {
    // Handle logout logic here
    await saveItem('token', '');
    await saveItem('role', '');
    dispatch(setUserInfo({isVerified: false, token: '', role: ''}));
  };
  useEffect(() => {
    axiosInstance
      .get(`accounts/single-view-store-admin/${user_id}/`)
      .then(res => {
        setUserData(res.data.data);
      });
  }, [user_id]);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileContainer}>
          <Avatar
            rounded
            size="large"
            source={{uri: 'https://via.placeholder.com/150'}} // Replace with the actual image URL
            containerStyle={styles.avatar}
          />
          <View>
            <Text style={styles.shopName}>{userData?.store_name}</Text>
            <Text style={styles.shopId}>Shop ID: {userData?.store_id}</Text>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Phone number :</Text>
          <Text style={styles.infoText}>+91 {userData?.phone}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Email ID :</Text>
          <Text style={styles.infoText}>{userData?.email}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Address :</Text>
          <Text style={styles.infoText}>{userData?.address_1}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  avatar: {
    marginRight: 16,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  shopId: {
    fontSize: 14,
    color: 'gray',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
  },
  logoutButton: {
    // backgroundColor: '#FF6347',
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
