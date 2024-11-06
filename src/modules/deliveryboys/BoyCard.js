import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AddProfile from '../../assets/svg-icons/AddProfile';
import {BoyImage} from '../../assets/images';
import Tooltip from '../../component/Tooltip';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';

const BoyCard = ({item}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigation = useNavigation();

  const handleEdit = () => {
    console.log('Edit clicked!');
  };

  const handleDelete = () => {
    console.log('Delete clicked!');
  };

  const handleOpenTooltip = () => {
    setTooltipVisible(!tooltipVisible);
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Image source={BoyImage} style={styles.imageStyle} />
        <View>
          <Text style={{color: '#474747', fontSize: 16, fontWeight: 500}}>
            {item?.full_name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 400,
              color: '#474747',
              marginTop: 8,
            }}>
            ID : {item.delivery_boy_id}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.optionCont} onPress={handleOpenTooltip}>
        <View style={{flexDirection: 'row', gap: 2}}>
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#007DDC',
            }}
          />
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#007DDC',
            }}
          />
          <View
            style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              backgroundColor: '#007DDC',
            }}
          />
        </View>
      </TouchableOpacity>
      {tooltipVisible && (
        <View style={styles.tooltipContainer}>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() =>
              navigation.navigate('Edit deliveryboy', {id: item.id})
            }>
            <Image source={icons.edit} />
            <Text>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <Image source={icons.delete} />
            <Text>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default BoyCard;

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  container: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 10,
    zIndex: 1,
  },
  optionCont: {
    backgroundColor: '#F4F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 20,
    borderRadius: 5,
  },
  toolTip: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#F8F8F8',
    position: 'absolute',
    left: 0,
  },
  tooltipContainer: {
    position: 'absolute',
    width: 120,
    // height: 100,
    backgroundColor: '#FFF',
    right: 0,
    top: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    zIndex: 1000,
  },
  toolButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
});
