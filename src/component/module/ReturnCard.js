import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox, TimeIcon} from '../../assets/svg-icons';
import ProfileIcon from '../../assets/svg-icons/ProfileIcon';
import {formatDateTimeString} from '../../utils/functions';

const ReturnCard = ({item}) => {
  const [open, setOpen] = useState(false);
  console.log(item, 'returned orders');

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
            <Text style={styles.rowText}>
              {item?.purchased_product_details[0]?.product_code +
                ' - ' +
                item?.purchase_id}
            </Text>
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
          <Text style={[styles.bottomText, {fontWeight: 500}]}>
            {item.delivery_boy.full_name}
          </Text>
        </View>
        <View style={styles.bottomRow}>
          <TimeIcon />
          <Text style={styles.bottomText}>{item.assigned_date}</Text>
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
    gap: 15,
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
    gap: 6,
  },
  bottomText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#474747',
  },
});
