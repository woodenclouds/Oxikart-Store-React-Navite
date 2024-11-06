import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {ColorBox} from '../../assets/svg-icons';
import ProfileIcon from '../../assets/svg-icons/ProfileIcon';
import UpArrow from '../../assets/svg-icons/UpArrow';

const AssignedCard = ({item}) => {
  console.log(item.address[0].landmark, '___hello');
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
              ID:{item.purchase_id}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{color: '#E9A21B'}}>
            {item.deliveryboys[0].status === 'ready_for_delivery'
              ? 'Ready For Delivery'
              : ''}
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          paddingHorizontal: 3,
          paddingVertical: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProfileIcon height={30} width={30} />
          <Text style={{color: '#717171'}}>Delivery boy : </Text>
          <Text style={{color: '#141414'}}>
            {item.deliveryboys[0].delivery_boy.full_name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setOpen(!open)}
          style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
          <Text style={{color: '#007DDC', fontSize: 12}}>
            {!open ? 'Show detail' : 'Hide detail'}
          </Text>
          <UpArrow />
        </TouchableOpacity>
      </View>
      {open && (
        <View style={{backgroundColor: '#F6F6F6', padding: 10}}>
          <Text style={{color: '#717171', fontSize: 12, fontWeight: 500}}>
            Delivery address :
          </Text>
          <Text style={{fontSize: 14, marginTop: 10, color: '#474747'}}>
            {/* Thalirath house thoppipala PO Swaraj Kattappana, Idukki Kerala,
            685511 */}
            {item.address[0].address},{item.address[0].street},
            {item.address[0].state},{item.address[0].country},
            {item.address[0].pincode}
          </Text>
          <Text
            style={{
              color: '#717171',
              fontSize: 12,
              fontWeight: 500,
              marginTop: 10,
            }}>
            Phone number
          </Text>
          <Text style={{fontSize: 14, marginTop: 10, color: '#474747'}}>
            +91 {item.address[0].phone}
          </Text>
        </View>
      )}
    </View>
  );
};

export default AssignedCard;

const styles = StyleSheet.create({});
