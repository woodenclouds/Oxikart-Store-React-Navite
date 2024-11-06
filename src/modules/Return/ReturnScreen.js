import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SearchIcon} from '../../assets/svg-icons';
import OrderCard from '../../component/module/OrderCard';
import ReturnCard from '../../component/module/ReturnCard';
import axiosInstance from '../../component/api';

const ReturnScreen = () => {
  const [active, setActive] = useState('Pending');
  const handleTabSwitch = tab => {
    setActive(tab);
  };
  useEffect(() => {
    axiosInstance.get('/accounts/list-return-assign-orders/').then(res => {
      console.log(res, '_____resds');
    });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{color: '#212121', fontSize: 16}}>Returns</Text>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#ABABAB',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              height: 40,
              borderBottomWidth: active === 'Pending' ? 2 : 0,
              borderBottomColor: '#4A4D4E',
            }}
            onPress={() => handleTabSwitch('Pending')}>
            <Text
              style={{
                color: active === 'Pending' ? '#4A4D4E' : '#6E7475',
                fontSize: 14,
              }}>
              New request
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '50%',
              height: 40,
              borderBottomWidth: active === 'Assigned' ? 2 : 0,
              borderBottomColor: '#4A4D4E',
            }}
            onPress={() => handleTabSwitch('Assigned')}>
            <Text
              style={{
                color: '#6E7475',
                fontSize: 14,
                color: active === 'Assigned' ? '#4A4D4E' : '#6E7475',
              }}>
              Returned
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <View
          style={{
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#D0D2D4',
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 45,
            flexDirection: 'row',
          }}>
          <SearchIcon width={25} height={25} />
          <TextInput
            style={{
              // backgroundColor: 'red'
              marginLeft: 5,
            }}
            placeholder="Search by Product ID"
          />
        </View>
        {active === 'Pending' ? (
          <View style={{paddingVertical: 20, gap: 10}}>
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
            <OrderCard />
          </View>
        ) : (
          <View style={{paddingVertical: 20, gap: 10}}>
            <ReturnCard />
            <ReturnCard />
            <ReturnCard />
            <ReturnCard />
            <ReturnCard />
            <ReturnCard />
            <ReturnCard />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default ReturnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});
