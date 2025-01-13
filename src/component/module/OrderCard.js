import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox} from '../../assets/svg-icons';
import UpArrow from '../../assets/svg-icons/UpArrow';

const OrderCard = ({item, openModal, setSelectedOrder}) => {
  const [open, setOpen] = useState(false);
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
            <TouchableOpacity>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.address}>
                {item.delivery_address.map(
                  item =>
                    `${item.first_name} ${item.last_name}, ${item.street}, ${item.address}`,
                )}
              </Text>
            </TouchableOpacity>
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
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>
          Product Name :{' '}
          <Text style={styles.name}>
            {item?.purchased_product_details[0]?.name}
          </Text>
        </Text>
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
          <Text style={styles.address}>{item.delivery_address[0].address}</Text>
          <Text style={styles.addressLabel}>Phone number:</Text>
          <Text style={styles.address}>
            +91 {item.costumer_details[0].phone}
          </Text>
        </View>
      )}
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
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 3,
    paddingVertical: 8,
  },
  bottomText: {
    color: '#717171',
    fontWeight: '400',
    fontSize: 12,
  },
  name: {
    color: '#474747',
    fontWeight: '500',
    fontSize: 12,
  },
  showBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  btnText: {
    color: '#007DDC',
    fontSize: 12,
    fontWeight: '500',
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
