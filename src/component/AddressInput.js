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
        multiline={true} // Updated to enable multiple line input
        // numberOfLines = {4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    marginTop: 10,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    borderRadius: 5,
    height: 80
  },
  input: {
    paddingHorizontal: 16,
    // height: 80,
  },
});

export default AddressInput;
