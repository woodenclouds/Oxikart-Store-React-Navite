import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axiosInstance from '../../component/api';
import DetailsCard from '../../component/DetailsCard';
import Header from '../../component/Header';
import {useNavigation} from '@react-navigation/native';
import {icons} from '../../assets/icons';
import {formatDateString} from '../../utils/functions';

const DBDetailsScreen = ({route}) => {
  const [profile, setProfile] = useState({});
  const navigation = useNavigation();
  const {id} = route.params;
  useEffect(() => {
    axiosInstance.get(`accounts/delivery-boy-single-view/${id}/`).then(res => {
      setProfile(res.data.data);
    });
  }, [id]);

  console.log(profile);

  const right = () => (
    <TouchableOpacity
      style={styles.editContainer}
      onPress={() => navigation.navigate('AddDelivery')}>
      <Image source={icons.edit} />
      <Text style={{color: '#000'}}>Edit</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title={profile.full_name} right={right} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.profileImage}
          />
          <View style={{width: '60%'}}>
            <Text style={styles.name}>{profile.full_name}</Text>
            <Text style={styles.id}>ID : {profile.id}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <DetailsCard label="Phone number" value={profile.phone} />
          <View style={{flexDirection: 'row', gap: 16,}}>
            <DetailsCard label="Gender" value={profile.gender} />
            <DetailsCard label="Age" value={profile.age} />
          </View>
          <DetailsCard label="DOB" value={formatDateString(profile.dob)} />
          <DetailsCard label="State" value={profile?.state?.name} />
          <DetailsCard label="Country" value={profile?.country?.name} />
          <DetailsCard label="Joining" value={profile.joining} />
          <DetailsCard label="Address" value={profile.address} />
          <DetailsCard label="Password" value={profile.password} />
        </View>
      </ScrollView>
    </View>
  );
};

export default DBDetailsScreen;

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
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 20,
    paddingBottom: 30,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
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
});
