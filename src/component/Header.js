import {StyleSheet, Text, View} from 'react-native';
import React from 'react';


const Header = ({title}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
});
