import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import AddProfile from '../../assets/svg-icons/AddProfile';
import {BoyImage} from '../../assets/images';
import Tooltip from '../../component/Tooltip';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';


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
      <Image source={BoyImage} style={styles.imageStyle} />
      <View style={styles.nameContainer}>
        <Text style={styles.name}>{item?.full_name}</Text>
        <Text style={styles.deliveryBoyId}>ID : {item.delivery_boy_id}</Text>
      </View>
      <TouchableOpacity style={styles.optionCont} onPress={handleOpenTooltip}>
        <Icon name="dots-three-horizontal" size={18} color="#007DDC" />
      </TouchableOpacity>
      {tooltipVisible && (
        <View style={styles.tooltipContainer}>
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() =>
              navigation.navigate('Edit deliveryboy', {id: item.id})
            }>
            <Image source={icons.edit} />
            <Text style={styles.tooltipText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolButton}>
            <Image source={icons.delete} />
            <Text style={styles.tooltipText}>Remove</Text>
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
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 10,
    zIndex: 1,
    height: 80,
  },
  nameContainer: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    gap: 5,
  },
  name: {
    color: '#474747',
    fontSize: 16,
    fontWeight: "500",
  },
  deliveryBoyId: {
    color: '#474747',
    fontWeight: '400',
    fontSize: 12,
  },
  optionCont: {
    backgroundColor: '#F4F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1000,
  },
  tooltipContainer: {
    position: 'absolute',
    width: 152,
    backgroundColor: '#FFFFFF',
    right: 8,
    top: 43,
    padding: 12,
    gap: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  toolButton: {
    flexDirection: 'row',
    gap: 10,
  },
  tooltipText: {
    color: '#212121',
    fontSize: 14,
    fontWeight: '500',
  }
});
