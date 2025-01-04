import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox} from '../../assets/svg-icons';
import ProfileIcon from '../../assets/svg-icons/ProfileIcon';
import UpArrow from '../../assets/svg-icons/UpArrow';

const AssignedCard = ({item}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f4f0ec', '#f4f0ec', '#ffffff', '#ffffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.row}>
        <ColorBox />
        <View style={{flex: 1, marginLeft: 20}}>
          <Text style={styles.purchaseId}>ID:{item.purchase_id}</Text>
        </View>
        <View>
          <Text style={{color: '#E9A21B'}}>
            {item.deliveryboys[0].status === 'ready_for_delivery'
              ? 'Ready For Delivery'
              : ''}
          </Text>
        </View>
      </LinearGradient>
      <View style={styles.detailsRow}>
        <View style={styles.name}>
          <ProfileIcon height={20} width={20} />
          <Text style={{color: '#717171', marginLeft: 10}}>
            Delivery boy :{' '}
          </Text>
          <Text style={{color: '#141414'}}>
            {item.deliveryboys[0].delivery_boy.full_name}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setOpen(!open)} style={styles.showBtn}>
          <Text style={styles.btnText}>
            {!open ? 'Show detail' : 'Hide detail'}
          </Text>
          <UpArrow />
        </TouchableOpacity>
      </View>
      {open && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Delivery address :</Text>
          <Text style={styles.address}>
            {item.address[0].address}
            {'\n'}
            {item.address[0].street}, {item.address[0].state}, {item.address[0].country}, {item.address[0].pincode}
          </Text>
          <Text style={styles.addressLabel}>Phone number:</Text>
          <Text style={styles.address}>+91 {item.address[0].phone}</Text>
        </View>
      )}
    </View>
  );
};

export default AssignedCard;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
  },
  row: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  purchaseId: {
    fontSize: 14,
    color: '#474747',
    fontWeight: '500',
  },
  detailsRow: {
    paddingHorizontal: 3,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  showBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  btnText: {
    color: '#007DDC',
    fontSize: 12,
  },
  addressContainer: {
    backgroundColor: '#F6F6F6',
    padding: 16,
    gap: 10,
    borderRadius: 4,
  },
  addressLabel: {
    color: '#717171',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  address: {
    fontSize: 14,
    color: '#474747',
    lineHeight: 20,
  },
});
