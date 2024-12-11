import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
import {assignOrder, fetchDeliveryBoys} from '../../services/orderService';
import Header from '../../component/Header';

const OrderScreen = () => {
  const [active, setActive] = useState('Pending');
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [assignedOrders, setAssignedOrder] = useState([]);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleTabSwitch = tab => setActive(tab);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const endpoint =
          active === 'Pending'
            ? 'accounts/store-orders-list/'
            : 'accounts/view-assigned-orders/';
        const res = await axiosInstance.get(endpoint);
        active === 'Pending'
          ? setOrders(res.data.data)
          : setAssignedOrder(res.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setRefresh(false);
      }
    };
    fetchOrders();
  }, [refresh, active]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDeliveryBoys();
        setDeliveryBoys(
          res.data.map(item => ({label: item.full_name, value: item.id})),
        );
      } catch (error) {
        console.error('Error fetching delivery boys:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await assignOrder(
        selectedOrder?.purchase_id,
        selectedDeliveryBoy.value,
      );
      if (res.StatusCode === 6000) {
        setModalVisible(false);
      } else {
        console.log('Unexpected StatusCode:', res.StatusCode);
      }
    } catch (error) {
      console.error('Error assigning order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header title="Orders"/>
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
          />
        </View>
        {active === 'Pending' ? (
          <FlatList
            data={orders}
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
          />
        ) : (
          <FlatList
            data={assignedOrders}
            renderItem={({item}) => <AssignedCard item={item} />}
            keyExtractor={item => item.id}
            refreshing={refresh}
            onRefresh={() => setRefresh(!refresh)}
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
            />
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.modalLabel}>Delivery boy*</Text>
            <Dropdown
              placeholder="Select delivery boy"
              options={deliveryBoys}
              onValueChange={setSelectedDeliveryBoy}
              selectedValue={selectedDeliveryBoy}
            />
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleSubmit}
            accessibilityLabel="Confirm Order Assignment">
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF'
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
    borderBottomColor: '#4A4D4E'
  },
  tabText: {
    color: '#6E7475', 
    fontSize: 14
  },
  activeTabText: {color: '#4A4D4E'},
  content: {
    paddingHorizontal: 20, 
    paddingVertical: 20
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderWidth: 1,
    borderColor: '#D0D2D4',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchInput: {marginLeft: 5},
  modalContainer: {paddingHorizontal: 20, paddingTop: 30, paddingBottom: 40},
  modalLabel: {marginBottom: 5},
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dropdownContainer: {marginTop: 10},
  bottomContainer: {paddingHorizontal: 25, paddingVertical: 30},
  confirmButton: {
    backgroundColor: '#007DDC',
    paddingVertical: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {color: '#fff', fontWeight: 'bold'},
});
