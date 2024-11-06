import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import BoyCard from './BoyCard';
import AddProfile from '../../assets/svg-icons/AddProfile';
import Modal from '../../component/Modal';
import {useNavigation} from '@react-navigation/native';
import useGetapi from '../../hooks/useGetapi';
import axiosInstance from '../../component/api';

const DeliveryBoyScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const navigation = useNavigation();
  // const {data} = useGetapi('accounts/store-admin-list-delivery-boys/');
  useEffect(() => {
    axiosInstance.get('accounts/store-admin-list-delivery-boys/').then(res => {
      console.log(res.data, '______data');
      setDeliveryBoys(res.data)
    });
  }, [refresh]);
  // console.log(data, '----');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Delivery Boys</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AddDelivery');
          }}
          style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
          <AddProfile />
          <Text style={{fontSize: 14, color: '#141414'}}>Add delivery boy</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={deliveryBoys}
          renderItem={({item}) => <BoyCard key={item.id} item={item} />}
          style={{paddingVertical: 20}}
          contentContainerStyle={{paddingBottom: 50}}
          onRefresh={() => {
            // Your refresh function here
            setRefresh(!refresh);
          }}
          refreshing={false}
        />
      </View>
      <Modal
        visible={false}
        title="Remove delivery boy?"
        onRequestClose={handleCloseModal}>
        <View>
          <Text style={{fontSize: 14, color: '#6B6B6B'}}>
            Are you sure you want to remove the
          </Text>
          <Text style={{fontSize: 14, color: '#6B6B6B'}}>delivery boy?</Text>
        </View>
        <View
          style={{
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              width: '48%',
              height: 40,
              borderWidth: 1,
              borderColor: '#007DDC',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#007DDC'}}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '48%',
              height: 40,
              borderWidth: 1,
              backgroundColor: '#007DDC',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff'}}>Yes</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default DeliveryBoyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  headerText: {
    fontSize: 16,
    // fontWeight: 500,
    color: '#212121',
  },
});
