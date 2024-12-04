import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const TextField = ({placeholder, onChangeText, value, secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 5,
  },
  input: {
    height: 48,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    color: '#000',
  },
});

export default TextField;
