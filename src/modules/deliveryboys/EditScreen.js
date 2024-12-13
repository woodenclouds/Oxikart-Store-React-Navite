import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../component/Header';
import {icons} from '../../assets/icons';
import useGetapi from '../../hooks/useGetapi';
import axiosInstance from '../../component/api';
import {formatDateString} from '../../utils/functions';

const EditScreen = ({route}) => {
  const {id} = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    axiosInstance.get(`accounts/delivery-boy-single-view/${id}/`).then(res => {
      setProfile(res.data.data);
    });
  }, [id]);
  
  const {data} = useGetapi(`accounts/delivery-boy-single-view/${id}/`);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (key, value) => {
    setProfile({...profile, [key]: value});
  };

  const renderProfileDetail = (
    label,
    key,
    value,
    isEditing,
    handleInputChange,
    isPassword = false,
  ) => (
    <View style={styles.detailItem} key={key}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={text => handleInputChange(key, text)}
          secureTextEntry={isPassword}
        />
      ) : (
        <TextInput style={styles.input} editable={false} defaultValue={value} />
      )}
    </View>
  );

  const right = () =>
    !isEditing ? (
      <TouchableOpacity style={styles.editContainer} onPress={handleEditToggle}>
        <Image source={icons.edit} />
        <Text style={{color: '#000'}}>Edit</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={styles.editContainer} onPress={handleEditToggle}>
        <Text style={{color: '#000'}}>Cancel</Text>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <Header title={data?.data?.full_name} right={right} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.profileImage}
          />
          <View style={{width: '60%'}}>
            {isEditing ? (
              <TextInput
                style={styles.name}
                value={profile.full_name}
                onChangeText={value => handleInputChange('full_name', value)}
              />
            ) : (
              <TextInput
                style={styles.name}
                defaultValue={profile.full_name}
                editable={false}
              />
            )}
            <Text style={styles.id}>ID : {profile.id}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          {renderProfileDetail(
            'Phone number',
            'phoneNumber',
            profile.phone,
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'Gender',
            'gender',
            profile.gender,
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'Age',
            'age',
            profile.age,
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'DOB',
            'dob',
            formatDateString(profile.dob),
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'State',
            'state',
            profile.state,
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'Country',
            'country',
            profile.country,
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'Joining date',
            'joiningDate',
            formatDateString(profile.joining),
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'Address',
            'address',
            profile.address,
            isEditing,
            handleInputChange,
          )}
          {renderProfileDetail(
            'Password',
            'password',
            profile.password,
            isEditing,
            handleInputChange,
            true,
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default EditScreen;

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
