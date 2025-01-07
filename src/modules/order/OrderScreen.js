import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SearchIcon} from '../../assets/svg-icons';
import OrderCard from '../../component/module/OrderCard';
import AssignedCard from '../../component/module/AssignedCard';
import axiosInstance from '../../component/api';
import BottomSheetModal from '../../utils/components/BottomSheetModal';
import Dropdown from '../../utils/components/Dropdown';
import {assignOrder} from '../../services/orderService';
import TitleHeader from '../../component/TitleHeader';
import CustomButton from '../../component/CustomButton';
import {useSelector} from 'react-redux';
import Loading from '../../component/Loading';

const OrderScreen = () => {
  const [active, setActive] = useState('Pending');
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignedOrders, setAssignedOrder] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);

  const {deliveryBoys} = useSelector(state => state.deliveryBoys);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleTabSwitch = tab => setActive(tab);

  const {user_id} = useSelector(state => state.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint =
          active === 'Pending'
            ? `accounts/store-orders-list/?store_pk=${user_id}`
            : 'accounts/view-assigned-orders/';
        const res = await axiosInstance.get(endpoint);
        active === 'Pending'
          ? setOrders(res?.data?.data)
          : setAssignedOrder(res.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setRefresh(false);
      }
    };
    fetchOrders();
  }, [refresh, active]);

  const handleSubmit = async () => {
    try {
      const res = await assignOrder(
        selectedOrder?.purchase_id,
        selectedDeliveryBoy.id,
      );
      if (res.StatusCode === 6000) {
        setModalVisible(false);
        ToastAndroid.show('Assigned successfully', ToastAndroid.SHORT);
      } else {
        console.log('Unexpected StatusCode:', res.StatusCode);
      }
    } catch (error) {
      console.error('Error assigning order:', error);
    }
  };

  const fetchOrders = async query => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `accounts/store-orders-list/?store_pk=${user_id}&q=${query}/`,
      );
      console.log("Search order:", response);
      
      // setOrders(data.orders);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TitleHeader title="Orders" />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, active === 'Pending' && styles.activeTab]}
          onPress={() => handleTabSwitch('Pending')}
          accessibilityLabel="Pending Orders Tab">
          <Text
            style={[
              styles.tabText,
              active === 'Pending' && styles.activeTabText,
            ]}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, active === 'Assigned' && styles.activeTab]}
          onPress={() => handleTabSwitch('Assigned')}
          accessibilityLabel="Assigned Orders Tab">
          <Text
            style={[
              styles.tabText,
              active === 'Assigned' && styles.activeTabText,
            ]}>
            Assigned
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <SearchIcon width={25} height={25} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Product ID"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              fetchOrders(text);
            }}
            placeholderTextColor="#474747"
          />
        </View>
        {loading ? (
          <Loading />
        ) : active === 'Pending' ? (
          <FlatList
            data={orders}
            contentContainerStyle={{paddingVertical: 16}}
            renderItem={({item}) => (
              <OrderCard
                item={item}
                openModal={openModal}
                setSelectedOrder={setSelectedOrder}
              />
            )}
            keyExtractor={item => item.id}
            refreshing={refresh}
            onRefresh={() => setRefresh(!refresh)}
            ListEmptyComponent={
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: '#000'}}>No orders found</Text>
              </View>
            }
          />
        ) : (
          <FlatList
            data={assignedOrders}
            renderItem={({item}) => <AssignedCard item={item} />}
            contentContainerStyle={{paddingVertical: 16}}
            keyExtractor={item => item.id}
            refreshing={refresh}
            onRefresh={() => setRefresh(!refresh)}
            ListEmptyComponent={
              <View style={{alignItems: 'center', marginTop: 20}}>
                <Text style={{color: '#000'}}>No assigned orders found</Text>
              </View>
            }
          />
        )}
      </View>
      <BottomSheetModal
        isVisible={modalVisible}
        onClose={closeModal}
        title="Confirm & assign">
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.modalLabel}>Order ID*</Text>
            <TextInput
              style={styles.modalInput}
              value={selectedOrder?.purchase_id}
              editable={false}
              placeholder="Enter Order ID"
              placeholderTextColor="#C3C3C3"
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.modalLabel}>Delivery boy</Text>
            <Dropdown
              placeholder="Select delivery boy"
              options={deliveryBoys}
              onValueChange={setSelectedDeliveryBoy}
              selectedValue={selectedDeliveryBoy}
            />
          </View>
        </View>
        <CustomButton title="Confirm" onPress={handleSubmit} />
      </BottomSheetModal>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4A4D4E',
  },
  tabText: {
    color: '#6E7475',
    fontSize: 14,
  },
  activeTabText: {
    color: '#4A4D4E',
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#D0D2D4',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchInput: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: '400',
    color: '#474747',
  },
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 30,
    gap: 8,
  },
  modalLabel: {
    marginBottom: 8,
    color: '#747474',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    color: '#C3C3C3',
  },
  dropdownContainer: {
    marginTop: 10,
  },
});
