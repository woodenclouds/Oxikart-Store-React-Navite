import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox} from '../../assets/svg-icons';

const OrderCard = ({item, openModal, setSelectedOrder}) => {
  console.log(item?.costumer_details[0]?.full_name);
  return (
    <View
      style={{
        padding: 5,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
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
              {item?.purchase_id}
            </Text>
            <Text style={{color: '#474747', fontSize: 12}}>
              {item?.delivery_address[0]?.first_name}{' '}
              {item?.delivery_address[0]?.last_name},
              {item?.delivery_address[0]?.address}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#007DDC',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          }}
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

const styles = StyleSheet.create({});
