import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DetailsCard = ({label, value}) => {

    
  return (
    <View style={styles.detailItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.input}>{value}</Text>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  detailItem: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#676767',
    marginBottom: 5,
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#F5F6F7',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1919',
  },
});
