import React from 'react';
import {StyleSheet, Text} from 'react-native';

const InputLabel = ({children}) => {
  return <Text style={styles.text}>{children}</Text>;
};

export default InputLabel;

const styles = StyleSheet.create({
  text: {
    color: '#747474',
    fontSize: 14,
    fontWeight: '400',
  },
});
