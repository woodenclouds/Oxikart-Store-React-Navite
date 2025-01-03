import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import useGetapi from '../../hooks/useGetapi';
import AssignedCard from '../../component/module/AssignedCard';

const DeliveryHistory = ({DeliveryBoyId}) => {
  // const [refresh, setRefresh] = useState(false);
  const {data, refresh, setRefresh} = useGetapi(
    `accounts/store-admin-single-delivery-boy-orders/${DeliveryBoyId}/`,
  );
  // console.log('store-admin-single-delivery-boy-orders :', data);
  const combinedOrders = data?.data?.assigned_orders.concat(
    data?.data?.returned_orders,
  );

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={combinedOrders}
        renderItem={({item}) => <AssignedCard item={item} />}
        keyExtractor={item => item.id}
        refreshing={refresh}
        onRefresh={() => setRefresh(!refresh)}
        ListEmptyComponent={
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{color: '#000'}}>No orders found</Text>
          </View>
        }
      /> */}
    </View>
  );
};

export default DeliveryHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
