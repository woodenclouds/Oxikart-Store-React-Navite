import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
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
import useGetapi from '../../hooks/useGetapi';
import axiosInstance from '../../component/api';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [userData, setUserData] = useState({});
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axiosInstance.get('accounts/store-home-count/').then(res => {
      setUserData(res.data.app_data.data.data);
    });
  }, []);
  useEffect(() => {
    axiosInstance.get('accounts/store-orders-list/').then(res => {
      setOrders(res.data.data);
    });
  }, []);
  const {data} = useGetapi('accounts/store-home-count/');
  
  const navigations = useNavigation();

  return (
    <View style={styles.container}>
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
              <Text style={{fontSize: 28, color: '#000'}}>4,340</Text>
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
              <Text style={{fontSize: 28, color: '#000'}}>4,340</Text>
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
          paddingTop: 110,
          paddingHorizontal: 20,
          backgroundColor: '#f9fbfc',
        }}>
        <HomeCard
          icon={<ProfileSvg />}
          title="Total delivery boys"
          number={userData.delivery_boys_count}
        />
        <HomeCard
          icon={<DeliveryIcon />}
          title="Pending Returns"
          number={userData.pending_return_count}
        />
      </View>
      <ScrollView>
        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 16, color: '#0A0A0A'}}>Recent orders</Text>
          <TouchableOpacity
            onPress={() => navigations.navigate('Order')}
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
          renderItem={({item}) => <OrderCard item={item} />}
          keyExtractor={item => item.id}
        />
      </ScrollView>
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
    paddingVertical: 20,
    position: 'relative',
  },
  cardContainer: {
    position: 'absolute',
    bottom: -100,
    left: 0,
    right: 0,
    height: 230,
    // backgroundColor: 'red',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    height: '100%',
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
});
