import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {deliveryBoySchema} from '../../../utils/formSchemas';
import {validateForm} from '../../../utils/functions';
import axiosInstance from '../../../component/api';
import SuccessModal from '../../../component/SuccessModal';
import Header from '../../../component/Header';
import {useDispatch} from 'react-redux';
import {fetchDeliveryBoysAsync} from '../../../redux/slices/deliveryBoysSlice';
import DbForm from '../DbForm';

const Adddelivery = () => {
  const dispatch = useDispatch();

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
      try {
        const response = await axiosInstance.post(
          'accounts/create-delivery-boy/',
          formData,
        );

        if (response.StatusCode === 6000) {
          setModalMessage('Form submitted successfully');
          setModalVisible(true);
          dispatch(fetchDeliveryBoysAsync());
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
      <Header title="Add delivery boy" />
      <DbForm handleSubmit={handleSubmit} errors={errors} />
      <SuccessModal
        visible={modalVisible}
        onClose={handleCloseModal}
        message={modalMessage}
        navigateTo="Delivery Boys"
      />
    </View>
  );
};

export default Adddelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
