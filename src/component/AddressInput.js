import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

const AddressInput = ({value, onChangeText, placeholder}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#C3C3C3"
        multiline={true} // Updated to enable multiple line input
        // numberOfLines = {4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    borderRadius: 5,
    height: 90
  },
  input: {
    paddingHorizontal: 16,
    color: '#000'
    // height: 80,
  },
});

export default AddressInput;
