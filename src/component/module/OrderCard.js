import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox} from '../../assets/svg-icons';

const OrderCard = ({item, openModal, setSelectedOrder}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#f4f0ec', '#f4f0ec', '#ffffff', '#ffffff']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.innerContainer}>
        <ColorBox />
        <View style={styles.details}>
          <Text style={styles.purchaseId}>
            {item?.purchased_product_details[0]?.product_code +
              ' - ' +
              item?.purchase_id || item?.purchase}
          </Text>
          {item.delivery_address ? (
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.address}>
              {item.delivery_address.map(
                item =>
                  `${item.first_name} ${item.last_name}, ${item.street}, ${item.address}`,
              )}
            </Text>
          ) : (
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.address}>
              No delivery address available
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSelectedOrder(item);
            openModal();
          }}>
          <Text style={{color: '#fff'}}>Confirm</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 8,
  },
  innerContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  details: {
    gap: 6,
    width: 150,
  },
  purchaseId: {
    fontSize: 14,
    color: '#474747',
    fontWeight: '500',
  },
  address: {
    color: '#474747',
    fontSize: 12,
  },
  btn: {
    backgroundColor: '#007DDC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
