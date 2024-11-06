import React, {useState} from 'react';
import {Modal, View, Text, Button} from 'react-native';
import AddProfile from '../assets/svg-icons/AddProfile';

const ModalContainer = ({visible, onClose, title, content, children}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            elevation: 5,
          }}>
          <Text
            style={{fontSize: 18, fontWeight: 'semi-bold', marginBottom: 10}}>
            <AddProfile />
            {title}
          </Text>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalContainer;
