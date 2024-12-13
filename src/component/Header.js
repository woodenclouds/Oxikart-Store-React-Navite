import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackIcon from '../assets/svg-icons/BackIcon';
import {useNavigation} from '@react-navigation/native';

const Header = ({title, right}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <BackIcon />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View>{right && right()}</View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
  title: {
    fontSize: 16,
    color: '#272727',
    fontWeight: '500',
    flex: 1,
  },
});
