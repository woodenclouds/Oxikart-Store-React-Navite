import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {deliveryBoySchema} from '../../utils/formSchemas';
import {validateForm} from '../../utils/functions';
import axiosInstance from '../../component/api';
import SuccessModal from '../../component/SuccessModal';
import Header from '../../component/Header';
import {useDispatch} from 'react-redux';
import DbForm from './DbForm';

const EditScreen = () => {
  const route = useRoute();
  const {profile} = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = async formData => {
    const validationErrors = validateForm(formData, deliveryBoySchema);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setModalMessage('Please fix the errors in the form');
      setModalVisible(true);
    } else {
      const data = new FormData();
      // adding form data to the FormData object
      Object.keys(formData).forEach(key => {
        if (key === 'image') {
          const fileName = formData.image.split('/').pop();
          data.append('image', {
            uri: formData.image,
            type: 'image/jpeg',
            name: fileName,
          });
        } else if (key === 'dob' || key === 'joining') {
          data.append(key, formData[key].toISOString()); // ISO 8601 format
        } else {
          data.append(key, formData[key]);
        }
      });
      try {
        const response = await axiosInstance.put(
          `accounts/edit-delivery-boys/${profile.id}/`,
          data,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (response.StatusCode === 6000) {
          setModalMessage('Details edited successfully');
          setModalVisible(true);
        }
      } catch (error) {
        console.log('Error submitting form:', error);
      }
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Edit delivery boy" />
      <DbForm handleSubmit={handleSubmit} errors={errors} profile={profile} />
      <SuccessModal
        visible={modalVisible}
        onClose={handleCloseModal}
        message={modalMessage}
        navigateTo="Delivery Boys"
      />
    </View>
  );
};

export default EditScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
