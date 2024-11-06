import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const HomeCard = ({icon, title, number}) => {
  return (
    <View style={styles.cover}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        {icon}
        <Text style={{color: '#565656', fontSize: 14}}>{title}</Text>
      </View>
      <View>
        <Text style={{fontSize: 24, color: '#202020'}}>{number}</Text>
      </View>
    </View>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  cover: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
