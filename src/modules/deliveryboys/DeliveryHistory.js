import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import useGetapi from '../../hooks/useGetapi';
import AssignedCard from '../../component/module/AssignedCard';
import DeliveryItem from '../../component/DeliveryItem';

const DeliveryHistory = ({DeliveryBoyId}) => {
  const {data, refresh, setRefresh} = useGetapi(
    `accounts/store-admin-single-delivery-boy-orders/${DeliveryBoyId}/`,
  );

  const combinedOrders = data?.data?.assigned_orders.concat(
    data?.data?.returned_orders,
  );

  deliveredOrders = combinedOrders?.filter((order) => order.status === 'delivered');

  return (
    <View style={styles.container}>
      <FlatList
        data={deliveredOrders}
        renderItem={({item}) => <DeliveryItem item={item} />}
        keyExtractor={item => item.id}
        refreshing={refresh}
        onRefresh={() => setRefresh(!refresh)}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: '#000'}}>No orders found</Text>
          </View>
        }
      />
    </View>
  );
};

export default DeliveryHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
  },
});
