import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox, DownArrrow, PhoneIcon, UpArrow} from '../assets/svg-icons';

const DeliveryItem = ({item, showBottomSheet}) => {
  const [activeHide, setActiveHide] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <LinearGradient
        colors={['#EADAC8', '#fff', '#FFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradient}>
        <View style={styles.itemTopRow}>
          <ColorBox width={40} height={40} />
          <Text style={styles.idNumber}>{item.idNumber}</Text>
          {item.status === 'Pending' ? (
            <TouchableOpacity style={styles.button} onPress={showBottomSheet}>
              <Text style={styles.btnText}>Deliver</Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={[
                styles.status,
                item.status === 'Delivered' && {color: '#009262'},
              ]}>
              {item.status}
            </Text>
          )}
        </View>
      </LinearGradient>
      <View style={styles.bottomRow}>
        <PhoneIcon width={20} height={20} />
        <Text style={styles.number}>+91 906 113 2363</Text>
        {!activeHide ? (
          <TouchableOpacity onPress={() => setActiveHide(!activeHide)}>
            <View style={styles.detailsRow}>
              <Text style={styles.detailsText}>View details</Text>
              <DownArrrow />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveHide(!activeHide)}>
            <View style={styles.detailsRow}>
              <Text style={[styles.detailsText, {color: '#007DDC'}]}>
                Hide details
              </Text>
              <UpArrow />
            </View>
          </TouchableOpacity>
        )}
      </View>
      {activeHide && (
        <View style={styles.addressCover}>
          <View>
            <Text style={styles.addressLabel}>Deliver address :</Text>
            <Text style={styles.addressText}>
              Thalirath house thoppipala PO Swaraj Kattappana, Idukki Kerala,
              685511
            </Text>
          </View>
          <View>
            <Text style={styles.addressLabel}>Phone number :</Text>
            <Text style={styles.addressText}>+91 9995819386</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default DeliveryItem;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
    borderRadius: 5,
    gap: 15,
  },
  gradient: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 5,
    paddingVertical: 15,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    marginLeft: 10,
  },
  idText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  contactText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  deliveryBoyText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  },
  itemRight: {
    alignItems: 'flex-end',
  },
  delivered: {
    color: 'green',
    fontWeight: '600',
  },
  returned: {
    color: 'red',
    fontWeight: '600',
  },
  viewDetails: {
    color: '#007DDC',
    marginTop: 5,
    fontWeight: '500',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  idNumber: {
    color: '#474747',
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#007DDC',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  btnText: {
    color: '#fff',
    fontSize: 12,
  },
  status: {
    fontWeight: '500',
    fontSize: 12,
    color: '#F7A200',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  number: {
    flex: 1,
    color: '#474747',
    fontSize: 12,
    fontWeight: '500',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailsText: {
    color: '#454545',
    fontSize: 12,
    fontWeight: '500',
  },
  addressCover: {
    backgroundColor: '#F6F6F6',
    padding: 16,
    borderRadius: 4,
    gap: 14,
  },
  addressLabel: {
    color: '#717171',
    fontSize: 12,
    fontWeight: '500',
  },
  addressText: {
    color: '#474747',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 5,
  },
});
