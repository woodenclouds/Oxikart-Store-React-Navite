import {
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BgLine, CardImage, CoverBg} from '../../assets/bg';
import {Logo} from '../../assets/images';
import {
  BoxIcon,
  BoxIcon1,
  DeliveryIcon,
  ProfileSvg,
  RightArrow,
} from '../../assets/svg-icons';
import HomeCard from '../../component/module/HomeCard';
import OrderCard from '../../component/module/OrderCard';
import axiosInstance from '../../component/api';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../component/Loading';
import BottomSheetModal from '../../utils/components/BottomSheetModal';
import Dropdown from '../../utils/components/Dropdown';
import {assignOrder, fetchDeliveryBoys} from '../../services/orderService';
import { useDispatch } from 'react-redux';
import { fetchDeliveryBoysAsync } from '../../redux/slices/deliveryBoysSlice';

const HomeScreen = () => {
  const navigations = useNavigation();
  const [homeCount, setHomeCount] = useState({});
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);

  const dispatch = useDispatch();

  const { deliveryBoys, status, error } = useSelector((state) => state.deliveryBoys);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDeliveryBoysAsync());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    )
  } 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('accounts/store-home-count/');
        setHomeCount(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    axiosInstance.get('accounts/store-orders-list/').then(res => {
      setOrders(res.data.data);
    });
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetchDeliveryBoys();
  //       setDeliveryBoys(
  //         res.data.map(item => ({label: item.full_name, value: item.id})),
  //       );
  //     } catch (error) {
  //       console.error('Error fetching delivery boys:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  if (loading) {
    return <Loading />;
  }

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const handleSubmit = async () => {
    try {
      const res = await assignOrder(
        selectedOrder?.purchase_id,
        selectedDeliveryBoy.id,
      );
      if (res && res.data) {
        if (res.StatusCode === 6000) {
          setModalVisible(false);
        } else {
          console.log('Unexpected StatusCode:', res.StatusCode);
        }
      } else {
        console.log('Response data is missing:', res);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#007DDC" barStyle="light-content" />
      <ImageBackground source={CoverBg} style={styles.backContainer}>
        <View>
          <Image source={Logo} />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
              <BoxIcon />
            </View>
            <Image source={CardImage} style={styles.cardBg} />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                paddingVertical: 30,
                paddingHorizontal: 20,
              }}>
              <Text style={{fontSize: 28, color: '#000'}}>
                {homeCount.purchase_count}
              </Text>
              <Text style={{color: '#565656', fontSize: 14}}>Total orders</Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                paddingHorizontal: 20,
                overflow: 'hidden',
              }}>
              <ImageBackground
                source={BgLine}
                style={styles.line}
                imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
              />
            </View>
          </View>
          <View style={styles.card}>
            <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
              <BoxIcon1 />
            </View>
            <Image source={CardImage} style={styles.cardBg} />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                paddingVertical: 30,
                paddingHorizontal: 20,
              }}>
              <Text style={{fontSize: 28, color: '#000'}}>
                {homeCount.pending_count}
              </Text>
              <Text style={{color: '#565656', fontSize: 14}}>
                Pending orders
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                paddingHorizontal: 20,
                overflow: 'hidden',
              }}>
              <ImageBackground
                source={BgLine}
                style={styles.line}
                imageStyle={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingTop: 85,
          paddingHorizontal: 20,
          backgroundColor: '#f9fbfc',
        }}>
        <HomeCard
          icon={<ProfileSvg />}
          title="Total delivery boys"
          number={homeCount.delivery_boys_count}
        />
        <HomeCard
          icon={<DeliveryIcon />}
          title="Pending Returns"
          number={homeCount.pending_return_count}
        />
      </View>
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 16, color: '#0A0A0A', fontWeight: '500'}}>
          Recent orders
        </Text>
        <TouchableOpacity
          onPress={() => navigations.navigate('Orders')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#007DDC', marginRight: 6}}>View all</Text>
          <RightArrow />
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{paddingHorizontal: 20, gap: 10}}
        data={orders}
        renderItem={({item}) => (
          <OrderCard
            item={item}
            openModal={openModal}
            setSelectedOrder={setSelectedOrder}
          />
        )}
        keyExtractor={item => item.id}
      />
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backContainer: {
    height: 200,
    paddingHorizontal: 20,
    paddingVertical: 18,
    position: 'relative',
  },
  cardContainer: {
    position: 'absolute',
    bottom: -67,
    left: 0,
    right: 0,
    height: 200,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    zIndex: 100,
  },
  line: {
    height: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardBg: {
    position: 'absolute',
    width: '60%',
    top: 0,
    right: 0,
  },
  modalContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 40,
  },
  modalLabel: {
    marginBottom: 5,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  dropdownContainer: {
    marginTop: 10,
  },
  bottomContainer: {
    paddingHorizontal: 25,
    paddingVertical: 30,
  },
  confirmButton: {
    backgroundColor: '#007DDC',
    paddingVertical: 10,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10,
  },
});
