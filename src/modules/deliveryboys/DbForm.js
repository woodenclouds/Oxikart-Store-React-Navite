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
import CameraIcon from '../../assets/svg-icons/CameraIcon';
import {InputLabel} from '../../component/inputs';
import {launchImageLibrary} from 'react-native-image-picker';
import DatePickerModal from '../../component/DatePickerModal';
import axiosInstance from '../../component/api';
import useGetapi from '../../hooks/useGetapi';
import Dropdown from '../../component/inputs/DropDown';
import {UserIcon} from '../../assets/svg-icons';

const DbForm = ({handleSubmit, errors, profile}) => {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    phone: profile?.phone || '',
    gender: profile?.gender || '',
    image: profile?.image || '',
    age: profile?.age || '',
    dob: profile?.dob ? new Date(profile?.dob) : new Date(),
    state: profile?.state?.id || null,
    country: profile?.country?.id || null,
    joining: profile?.joining ? new Date(profile?.joining) : new Date(),
    address: profile?.address || '',
    password: profile?.password || '',
  });

  const [country, setCountry] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [openDOB, setOpenDOB] = useState(false);
  const [openJoiningDate, setOpenJoiningDate] = useState(false);

  const {data} = useGetapi('general/list-country/');

  useEffect(() => {
    if (data?.data) {
      setCountry(data?.data?.map(item => ({label: item.name, value: item.id})));
    }
  }, [data]);

  useEffect(() => {
    if (formData.country) {
      axiosInstance.get(`general/list-states/${formData.country}`).then(res => {
        setStateList(
          res?.data?.message?.map(item => ({label: item.name, value: item.id})),
        );
      });
    }
  }, [formData.country]);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const ImagePicker = async () => {
    let options = {
      storageOptions: {
        mediaType: 'photo',
        path: 'image',
      },
    };
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setFormData(prev => ({...prev, image: response.assets[0].uri}));
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <View style={styles.circle}>
            <View style={styles.inCircle}>
              {formData.image ? (
                <Image source={{uri: formData.image}} style={styles.image} />
              ) : (
                <UserIcon />
              )}
            </View>
            <TouchableOpacity
              onPress={() => ImagePicker()}
              style={styles.imagePicker}>
              <CameraIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
          <View>
            <InputLabel>Full name</InputLabel>
            <TextInput
              placeholder="Enter full name"
              value={formData.full_name}
              onChangeText={text => handleInputChange('full_name', text)}
              style={styles.input}
              placeholderTextColor="#C3C3C3"
            />
            {errors.full_name && (
              <Text style={styles.error}>{errors.full_name}</Text>
            )}
          </View>
          <View>
            <InputLabel>Phone number</InputLabel>
            <TextInput
              placeholder="Enter mobile number"
              value={formData.phone}
              onChangeText={text => handleInputChange('phone', text)}
              style={styles.input}
              placeholderTextColor="#C3C3C3"
            />
            {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
          </View>
          <View>
            <InputLabel>Gender</InputLabel>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                onPress={() => handleInputChange('gender', 'male')}
                style={[
                  styles.gender,
                  {
                    borderColor:
                      formData.gender === 'male' ? '#007DDC' : '#C6C6C6',
                  },
                ]}>
                <View
                  style={[
                    styles.genderDot,
                    {
                      backgroundColor:
                        formData.gender === 'male' ? '#007DDC' : '#fff',
                    },
                  ]}
                />
                <Text style={styles.genderLabel}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange('gender', 'female')}
                style={[
                  styles.gender,
                  {
                    borderColor:
                      formData.gender === 'female' ? '#007DDC' : '#C6C6C6',
                  },
                ]}>
                <View
                  style={[
                    styles.genderDot,
                    {
                      backgroundColor:
                        formData.gender === 'female' ? '#007DDC' : '#fff',
                    },
                  ]}
                />
                <Text style={styles.genderLabel}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleInputChange('gender', 'other')}
                style={[
                  styles.gender,
                  {
                    borderColor:
                      formData.gender === 'other' ? '#007DDC' : '#C6C6C6',
                  },
                ]}>
                <View
                  style={[
                    styles.genderDot,
                    {
                      backgroundColor:
                        formData.gender === 'other' ? '#007DDC' : '#fff',
                    },
                  ]}
                />
                <Text style={styles.genderLabel}>Other</Text>
              </TouchableOpacity>
            </View>
            {errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
          </View>
          <View>
            <InputLabel>Age</InputLabel>
            <TextInput
              placeholder="Enter age"
              value={formData.age}
              keyboardType="number-pad"
              onChangeText={text => handleInputChange('age', text)}
              style={styles.input}
              placeholderTextColor="#C3C3C3"
            />
            {errors.age && <Text style={styles.error}>{errors.age}</Text>}
          </View>
          <View>
            <InputLabel>Date of birth</InputLabel>
            <TouchableOpacity
              onPress={() => setOpenDOB(true)}
              style={styles.input}>
              <Text style={{color: '#000'}}>
                {formData.dob.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {errors.dob && <Text style={styles.error}>{errors.dob}</Text>}
          </View>

          <View>
            <InputLabel>Country</InputLabel>
            <Dropdown
              items={country}
              onValueChange={value =>
                setFormData(prev => ({...prev, country: value}))
              }
              placeholder={{label: 'Select country', value: formData.country}}
            />
            {errors.country && (
              <Text style={styles.error}>{errors.country}</Text>
            )}
          </View>

          <View>
            <InputLabel>State</InputLabel>
            <Dropdown
              items={stateList}
              onValueChange={value =>
                setFormData(prev => ({...prev, state: value}))
              }
              placeholder={{label: 'Select state', value: formData.state}}
            />
            {errors.state && <Text style={styles.error}>{errors.state}</Text>}
          </View>

          <View>
            <InputLabel>Joining date</InputLabel>
            <TouchableOpacity
              onPress={() => setOpenJoiningDate(true)}
              style={styles.input}>
              <Text style={{color: '#000'}}>
                {formData.joining.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {errors.joining && (
              <Text style={styles.error}>{errors.joining}</Text>
            )}
          </View>
          <View>
            <InputLabel>Address</InputLabel>
            <TextInput
              style={[styles.input, {height: 90}]}
              value={formData.address}
              onChangeText={text => handleInputChange('address', text)}
              placeholder="Enter address"
              placeholderTextColor="#C3C3C3"
              multiline={true}
            />
            {errors.address && (
              <Text style={styles.error}>{errors.address}</Text>
            )}
          </View>
          <View>
            <InputLabel>Password</InputLabel>
            <TextInput
              value={formData.password}
              placeholder="Enter mobile number"
              placeholderTextColor="#C3C3C3"
              onChangeText={text => handleInputChange('password', text)}
              style={styles.input}
            />
            {errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => handleSubmit(formData)}>
          <Text style={styles.btnText}>Save</Text>
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
    </View>
  );
};

export default DbForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerText: {
    fontSize: 16,
    color: '#272727',
  },
  imageContainer: {
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 88,
    height: 88,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
    padding: 3,
  },
  inCircle: {
    width: 85,
    height: 85,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#F3F6F8',
  },
  image: {
    width: 98,
    height: 98,
    borderRadius: 50,
    resizeMode: 'contain',
  },
  imagePicker: {
    padding: 5,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007DDC',
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    gap: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#A2A2A2',
    borderRadius: 5,
    paddingHorizontal: 16,
    marginTop: 8,
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    justifyContent: 'center',
  },
  genderDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C6C6C6',
  },
  genderLabel: {
    color: '#747474',
    fontWeight: '500',
    fontSize: 14,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  gender: {
    width: '30%',
    borderWidth: 1,
    height: 48,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    padding: 2,
  },
  btnContainer: {
    paddingHorizontal: 15,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  saveBtn: {
    backgroundColor: '#007DDC',
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 5,
  },
});
