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
import ReturnCard from '../../component/module/ReturnCard';
import axiosInstance from '../../component/api';
import BottomSheetModal from '../../utils/components/BottomSheetModal';
import TitleHeader from '../../component/TitleHeader';
import CustomButton from '../../component/CustomButton';
import Dropdown from '../../utils/components/Dropdown';
import {useSelector} from 'react-redux';
import Loading from '../../component/Loading';

const ReturnScreen = () => {
  const [active, setActive] = useState('Pending');
  const [returnOrders, setReturnOrders] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  const [loading, setLoading] = useState(true);

  const {deliveryBoys} = useSelector(state => state.deliveryBoys);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleTabSwitch = tab => {
    setActive(tab);
  };

  useEffect(() => {
    const fetchReturnOrders = async () => {
      try {
        const response = await axiosInstance.get(
          '/accounts/list-return-assign-orders/',
        );
        setReturnOrders(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setRefresh(false);
        setLoading(false);
      }
    };
    fetchReturnOrders();
  }, [refresh, active]);

  const handleSubmit = async () => {};

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <TitleHeader title="Returns" />
      <View style={{paddingHorizontal: 20, paddingTop: 10}}>
        <View style={styles.headerTabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              {borderBottomWidth: active === 'Pending' ? 2 : 0},
            ]}
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
            style={[
              styles.tab,
              {borderBottomWidth: active === 'Assigned' ? 2 : 0},
            ]}
            onPress={() => handleTabSwitch('Assigned')}>
            <Text
              style={{
                color: active === 'Assigned' ? '#4A4D4E' : '#6E7475',
                fontSize: 14,
              }}>
              Returned
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
        <View style={styles.search}>
          <SearchIcon width={25} height={25} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Product ID"
            placeholderTextColor="#474747"
          />
        </View>

        {active === 'Pending' ? (
          <FlatList
            data={returnOrders}
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
                <Text style={{color: '#000'}}>No return orders found</Text>
              </View>
            }
          />
        ) : (
          // <FlatList
          //   data={assignedOrders}
          //   renderItem={({item}) => <AssignedCard item={item} />}
          //   keyExtractor={item => item.id}
          //   refreshing={refresh}
          //   onRefresh={() => setRefresh(!refresh)}
          // />
          <ReturnCard />
        )}
      </View>
      <BottomSheetModal
        isVisible={modalVisible}
        onClose={closeModal}
        title="Confirm & assign">
        <View style={styles.modalContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.modalLabel}>Order ID :</Text>
            <Text style={styles.modalInput}>{selectedOrder?.purchase}</Text>
          </View>
          <View style={styles.dropdownContainer}>
            <Text style={styles.modalLabel}>Pickup boy</Text>
            <Dropdown
              placeholder="Select pickup boy"
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

export default ReturnScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTabs: {
    borderBottomWidth: 1,
    borderColor: '#ABABAB',
    flexDirection: 'row',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
    borderBottomColor: '#4A4D4E',
  },
  search: {
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D0D2D4',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 45,
    flexDirection: 'row',
    marginBottom: 12,
  },
  searchInput: {
    fontSize: 13,
    fontWeight: '400',
    color: '#474747',
    marginLeft: 5,
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
    color: '#474747',
    fontSize: 14,
    marginLeft: 10,
  },
  dropdownContainer: {
    marginTop: 10,
  },
});
