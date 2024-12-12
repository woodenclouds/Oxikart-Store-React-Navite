// DatePickerModal.js
import React from 'react';
import {Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerModal = ({visible, date, onClose, onDateChange}) => {
  const handleConfirm = (event, newDate) => {
    if (event.type === 'set') {
      onDateChange(newDate);
    } else if (event.type === 'dismissed') {
      onClose(); // Close the modal if the user dismisses the picker
    }
  };

  return (
    <Modal visible={visible} transparent={true}>
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleConfirm}
        maximumDate={new Date()}
      />
    </Modal>
  );
};

export default DatePickerModal;
