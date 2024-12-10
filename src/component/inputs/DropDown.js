// Dropdown.js
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Dropdown = ({items, onValueChange, placeholder}) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        items={items}
        placeholder={placeholder}
        style={{
          inputIOS: styles.inputIOS,
          inputAndroid: styles.inputAndroid,
          placeholder: styles.placeholder,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#A2A2A2',
    borderRadius: 5,
  },
  inputIOS: {
    fontSize: 14,
    fontWeight: '400',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 14,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  placeholder: {
    color: '#999',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default Dropdown;
