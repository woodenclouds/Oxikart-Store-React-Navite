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
import Header from '../../component/includes/Header';
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
  console.log(data);
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
        <Text style={styles.value}>{value}</Text>
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
        {/* <Image source={icons.edit} /> */}
        <Text style={{color: '#000'}}>Cancel</Text>
      </TouchableOpacity>
    );
  console.log(id);
  return (
    <View style={styles.container}>
      <Header title={data?.data?.full_name} right={right} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={{uri: 'https://via.placeholder.com/150'}}
            style={styles.profileImage}
          />
          <View>
            {isEditing ? (
              <TextInput
                style={styles.input}
                value={profile.full_name}
                onChangeText={value => handleInputChange('full_name', value)}
              />
            ) : (
              <Text style={styles.name}>{profile.full_name}</Text>
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
    backgroundColor: '#fff',
  },
  editContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  contentContainer: {
    padding: 15,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    gap: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  id: {
    fontSize: 14,
    color: '#888',
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailItem: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    color: '#000',
  },
  editText: {
    fontSize: 16,
    color: '#007BFF',
  },
});
