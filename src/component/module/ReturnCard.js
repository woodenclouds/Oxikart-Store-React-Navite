import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox, TimeIcon} from '../../assets/svg-icons';
import ProfileIcon from '../../assets/svg-icons/ProfileIcon';
import UpArrow from '../../assets/svg-icons/UpArrow';

const ReturnCard = ({item}) => {
  console.log(item, 'ReturnCard');
  
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f4f0ec', '#f4f0ec', '#ffffff', '#ffffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.innerContainer}>
        <View style={styles.row}>
          <ColorBox />
          <View>
            <Text style={styles.rowText}>ID:123746289374</Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#009262'}}>Returned</Text>
        </View>
      </LinearGradient>
      <View style={styles.bottomSection}>
        <View style={styles.bottomRow}>
          <ProfileIcon width={25} height={25} />
          <Text style={[styles.bottomText, {color: '#717171'}]}>
            Pickup boy :
          </Text>
          <Text style={[styles.bottomText, {fontWeight: 500}]}>Anooj Reji</Text>
        </View>
        <View style={styles.bottomRow}>
          <TimeIcon />
          <Text style={styles.bottomText}>Apr 21, 2024 10:03 am</Text>
        </View>
      </View>
    </View>
  );
};

export default ReturnCard;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  },
  innerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  rowText: {
    fontSize: 14,
    color: '#474747',
    fontWeight: '500',
  },
  bottomSection: {
    // paddingHorizontal: 3,
    // paddingVertical: 8,
    // justifyContent: 'space-between',
    padding: 12,
    gap: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#474747',
  },
});
