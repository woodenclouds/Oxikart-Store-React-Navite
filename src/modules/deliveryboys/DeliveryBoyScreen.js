import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BoyCard from './BoyCard';
import AddProfile from '../../assets/svg-icons/AddProfile';
import {useNavigation} from '@react-navigation/native';
import {fetchDeliveryBoys} from '../../services/orderService';

const DeliveryBoyScreen = () => {
  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDeliveryBoys();
        console.log("delivery boys", res);
        
        setDeliveryBoys(res.data);
      } catch (error) {
        console.error('Error fetching delivery boys:', error);
      } finally {
        setRefresh(false);
      }
    };
    fetchData();
  }, [refresh]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Delivery Boys</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDelivery')}
          style={styles.addDelivery}>
          <AddProfile />
          <Text style={styles.addText}>Add delivery boy</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <FlatList
          data={deliveryBoys}
          renderItem={({item}) => (
            <BoyCard
              key={item.id}
              item={item}
            />
          )}
          style={{paddingVertical: 20}}
          contentContainerStyle={{paddingBottom: 100}}
          onRefresh={() => {
            setRefresh(!refresh);
          }}
          refreshing={refresh}
        />
      </View>
    </View>
  );
};

export default DeliveryBoyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontWeight: '500',
    color: '#212121',
  },
  addDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  addText: {
    fontSize: 14,
    color: '#141414',
  },
});
