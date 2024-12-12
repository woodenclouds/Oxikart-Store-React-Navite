// SuccessModal.js
import React from 'react';
import {Modal, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SuccessModal = ({visible, onClose, message, navigateTo}) => {
  const navigation = useNavigation();

  const handleOkayPress = () => {
    onClose();
    navigation.navigate(navigateTo);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okayButton} onPress={handleOkayPress}>
            <Text style={styles.okayButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000'
  },
  okayButton: {
    backgroundColor: '#007DDC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  okayButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SuccessModal;
