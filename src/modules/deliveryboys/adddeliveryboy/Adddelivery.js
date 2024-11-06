import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackIcon from '../../../assets/svg-icons/BackIcon';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageUploadComponent from '../../../component/ImageUploadComponent';
import ProfileIcon from '../../../assets/svg-icons/ProfileIcon';
import CameraIcon from '../../../assets/svg-icons/CameraIcon';
import {InputLabel} from '../../../component/inputs';
import AddressInput from '../../../component/AddressInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DatePickerModal from '../../../component/DatePickerModal';
import {deliveryBoySchema} from '../../../utils/formSchemas';
import ValidationModal from '../../../component/ValidationModal';
import {validateForm} from '../../../utils/functions';
import axiosInstance from '../../../component/api';
import RNFS from 'react-native-fs';
import useGetapi from '../../../hooks/useGetapi';
import Dropdown from '../../../component/inputs/DropDown';
import SuccessModal from '../../../component/SuccessModal';

const Adddelivery = () => {
  const navigate = useNavigation();
  // const [modalVisible, setModalVisible] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    gender: '',
    // image: '',
    age: '',
    dob: new Date(),
    state: '',
    country: '',
    joining: new Date(),
    address: '',
    password: '',
  });
  const {data} = useGetapi('general/list-country/');
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  // console.log(data.data, '___');
  useEffect(() => {
    if (data?.data) {
      setCountry(data?.data?.map(item => ({label: item.name, value: item.id})));
    }
  }, [data]);
  console.log(country);
  const [openDOB, setOpenDOB] = useState(false);
  const [openJoiningDate, setOpenJoiningDate] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const [image, setImage] = useState();
  const [errors, setErrors] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const ImagePicker = async () => {
    let options = {
      storageOptions: {
        path: 'image',
        mediaType: 'photo',
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const source = {uri: response.assets[0].uri};
        const imageFile = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        const binaryData = await RNFS.readFile(imageFile.uri, 'base64');
        // setFormData(prev => ({...prev, image: binaryData}));
        setImage(source);
      }
    });
  };

  const handleSubmit = () => {
    const validationErrors = validateForm(formData, deliveryBoySchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setModalMessage('Please fix the errors in the form');
      setModalVisible(true);
    } else {
      console.log(formData, 'redddd');
      axiosInstance
        .post('accounts/create-delivery-boy/', formData)
        .then(res => {
          console.log(formData.image, '___image');
          // console.log(res.StatusCode === 6000);
          if (res.StatusCode === 6000) {
            handleButtonClick();
          }
        });
      // setModalMessage('Form submitted successfully');
      // setModalVisible(true);
    }
  };
  useEffect(() => {
    if (formData.country) {
      axiosInstance.get(`general/list-states/${formData.country}`).then(res => {
        console.log(res.data.message, 'tertttetet');
        setState(
          res?.data?.message?.map(item => ({label: item.name, value: item.id})),
        );
      });
    }
  }, [formData.country]);
  const handleButtonClick = () => {
    // Show the success modal
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={{fontSize: 16, color: '#272727'}}>Add delivery boy</Text>
      </View>
      <ScrollView>
        <View
          style={{
            paddingVertical: 30,
            borderBottomWidth: 1,
            borderBottomColor: '#eee',
          }}>
          <View style={{alignItems: 'center', position: 'relative'}}>
            <View style={styles.circle}>
              <View style={styles.inCircle}>
                {image ? (
                  <Image
                    source={image}
                    style={{width: 98, height: 98, borderRadius: 50}}
                  />
                ) : (
                  <ProfileIcon width={25} height={25} />
                )}
              </View>
              <TouchableOpacity
                onPress={() => ImagePicker()}
                style={{
                  padding: 5,
                  borderRadius: 50,
                  borderWidth: 3,
                  borderColor: '#fff',
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  backgroundColor: '#007DDC',
                }}>
                <CameraIcon />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderColor: '#EFEFEF',
          }}>
          <View style={{marginTop: 25}}>
            <InputLabel>Full name</InputLabel>
            <TextInput
              placeholder="Enter full name"
              onChangeText={text => handleInputChange('full_name', text)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                color: '#000',
              }}
            />
            {errors.full_name && (
              <Text style={styles.error}>{errors.full_name}</Text>
            )}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Phone number</InputLabel>
            <TextInput
              placeholder="Enter mobile number"
              onChangeText={text => handleInputChange('phone', text)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                color: '#000',
              }}
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Gender</InputLabel>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              }}>
              <TouchableOpacity
                onPress={() => handleInputChange('gender', 'male')}
                style={{
                  width: '30%',
                  borderWidth: 1,
                  borderColor:
                    formData.gender === 'male' ? '#007DDC' : '#C6C6C6',
                  height: 35,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                  padding: 2,
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor:
                      formData.gender === 'male' ? '#007DDC' : '#fff',
                    borderWidth: 1,
                    borderColor: '#C6C6C6',
                  }}
                />
                <Text style={{color: '#000'}}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange('gender', 'female')}
                style={{
                  width: '30%',
                  borderWidth: 1,
                  borderColor:
                    formData.gender === 'female' ? '#007DDC' : '#C6C6C6',
                  height: 35,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor:
                      formData.gender === 'female' ? '#007DDC' : '#fff',
                    borderWidth: 1,
                    borderColor: '#C6C6C6',
                  }}
                />
                <Text style={{color: '#000'}}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange('gender', 'other')}
                style={{
                  width: '30%',
                  borderWidth: 1,
                  borderColor:
                    formData.gender === 'other' ? '#007DDC' : '#C6C6C6',
                  height: 35,
                  borderRadius: 5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                }}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor:
                      formData.gender === 'other' ? '#007DDC' : '#fff',
                    borderWidth: 1,
                    borderColor: '#C6C6C6',
                  }}
                />
                <Text style={{color: '#000'}}>Other</Text>
              </TouchableOpacity>
            </View>
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Age</InputLabel>
            <TextInput
              placeholder="Enter age"
              keyboardType="number-pad"
              onChangeText={text => handleInputChange('age', text)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                color: '#000',
              }}
            />
            {errors.age && <Text style={styles.error}>{errors.age}</Text>}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Date of birth</InputLabel>
            <TouchableOpacity
              onPress={() => setOpenDOB(true)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                justifyContent: 'center',
              }}>
              <Text style={{color: '#000'}}>
                {formData.dob.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}
          </View>
          <View style={{marginTop: 25}}>
            {/* <InputLabel>Country</InputLabel> */}
            {/* <TextInput
              placeholder="Enter country"
              onChangeText={text => handleInputChange('country', text)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                color: '#000',
              }}
            /> */}
            <Dropdown
              label="Country"
              items={country}
              onValueChange={value =>
                setFormData(prev => ({...prev, country: value}))
              }
              placeholder={{label: 'Select an option...', value: null}}
            />
            {errors.country && (
              <Text style={styles.error}>{errors.country}</Text>
            )}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>State</InputLabel>
            {/* <TextInput
              placeholder="Enter state"
              onChangeText={text => handleInputChange('state', text)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                color: '#000',
              }}
            /> */}
            <Dropdown
              label="State"
              items={state}
              onValueChange={value =>
                setFormData(prev => ({...prev, state: value}))
              }
              placeholder={{label: 'Select an option...', value: null}}
            />
            {errors.state && <Text style={styles.error}>{errors.state}</Text>}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Joining date</InputLabel>
            <TouchableOpacity
              onPress={() => setOpenJoiningDate(true)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                justifyContent: 'center',
                color: '#000',
              }}>
              <Text>{formData.joining.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {errors.joining && (
              <Text style={styles.error}>{errors.joining}</Text>
            )}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Address</InputLabel>
            <AddressInput
              address={formData.address}
              onChangeText={text => handleInputChange('address', text)}
            />
            {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
          </View>
          <View style={{marginTop: 25}}>
            <InputLabel>Password</InputLabel>
            <TextInput
              placeholder="Enter mobile number"
              onChangeText={text => handleInputChange('password', text)}
              style={{
                height: 40,
                borderWidth: 1,
                borderColor: '#A2A2A2',
                borderRadius: 5,
                paddingHorizontal: 16,
                marginTop: 5,
                color: '#000',
              }}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 15,
          paddingVertical: 10,
          backgroundColor: '#FAFAFA',
          borderTopWidth: 1,
          borderTopColor: '#EFEFEF',
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#007DDC', padding: 10, borderRadius: 5}}
          onPress={handleSubmit}>
          <Text style={{color: 'white', textAlign: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
      {openDOB && (
        <DatePickerModal
          visible={openDOB}
          date={formData.dob}
          onClose={() => setOpenDOB(false)}
          onDateChange={date => {
            handleInputChange('dob', date);
            setOpenDOB(false);
          }}
        />
      )}
      {openJoiningDate && (
        <DatePickerModal
          visible={openJoiningDate}
          date={formData.joining}
          onClose={() => setOpenJoiningDate(false)}
          onDateChange={date => {
            handleInputChange('joining', date);
            setOpenJoiningDate(false);
          }}
        />
      )}
      <SuccessModal
        visible={modalVisible}
        onClose={handleCloseModal}
        message="Operation was successful!"
        navigateTo="Delivery Boys"
      />
    </View>
  );
};

export default Adddelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderBottomWidth: 1,
    gap: 5,
    borderBottomColor: '#EFEFEF',
  },
  circle: {
    width: 108,
    height: 108,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 3,
  },
  inCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#F3F6F8',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
