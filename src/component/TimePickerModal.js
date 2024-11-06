// TimePickerModal.js
import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TimePickerModal = ({label, value, onChange}) => {
  const [show, setShow] = useState(false);

  const onChangeTime = (event, selectedTime) => {
    setShow(false);
    if (selectedTime) {
      onChange(selectedTime);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        <Text>{value.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#A2A2A2',
    borderRadius: 5,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
});

export default TimePickerModal;
