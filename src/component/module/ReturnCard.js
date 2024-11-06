import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox, TimeIcon} from '../../assets/svg-icons';
import ProfileIcon from '../../assets/svg-icons/ProfileIcon';
import UpArrow from '../../assets/svg-icons/UpArrow';

const ReturnCard = () => {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        padding: 5,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
      }}>
      <LinearGradient
        colors={['#f4f0ec', '#f4f0ec', '#ffffff', '#ffffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          borderRadius: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <ColorBox />
          <View>
            <Text style={{fontSize: 14, color: '#474747', fontWeight: 500}}>
              ID:123746289374
            </Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#009262'}}>Returned</Text>
        </View>
      </LinearGradient>
      <View
        style={{
          paddingHorizontal: 3,
          paddingVertical: 8,
          // flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <ProfileIcon width={25} height={25} />
          <Text style={{color: '#717171'}}>Pickup boy :</Text>
          <Text>Anooj Reji</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <TimeIcon />
          <Text style={{color: '#717171'}}>Apr 21, 2024 10:03 am</Text>
        </View>
      </View>
    </View>
  );
};

export default ReturnCard;

const styles = StyleSheet.create({});
