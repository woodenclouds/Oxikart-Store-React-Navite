import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import AddProfile from '../../assets/svg-icons/AddProfile';
import {BoyImage} from '../../assets/images';
import Tooltip from '../../component/Tooltip';
import {icons} from '../../assets/icons';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import axiosInstance from '../../component/api';

const BoyCard = ({item}) => {
  const [showModal, setShowModal] = useState(false);

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.post(`accounts/delete-delivery-boys/${item.id}/`);
      if (response.StatusCode === 6000) {
        console.log(response.data.message);
        setShowModal(false);
        setTooltipVisible(!tooltipVisible);
      }
    } catch (error) {
      console.error('Error deleting delivery boy:', error);
    }
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
          <TouchableOpacity
            style={styles.toolButton}
            onPress={() => setShowModal(true)}>
            <Image source={icons.delete} />
            <Text style={styles.tooltipText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        visible={showModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <View style={styles.headerRow}>
              <AddProfile />
              <Text style={styles.modalHeaderText}>Remove delivery boy?</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.modalText}>
                Are you sure you want to remove the{'\n'}delivery boy?
              </Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setShowModal(false)}>
                <Text style={{color: '#007DDC'}}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, {backgroundColor: '#007DDC'}]}
                onPress={() => handleDelete()}>
                <Text style={{color: '#fff'}}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: 'flex-start',
    position: 'relative',
    marginBottom: 10,
    height: 100,
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
    fontWeight: '500',
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
  },
  tooltipContainer: {
    position: 'absolute',
    width: 120,
    backgroundColor: '#FFFFFF',
    right: 55,
    top: 5,
    padding: 12,
    gap: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F8F8F8',
    zIndex: 10,

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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalBox: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 8,
    elevation: 3,
    height: 204,
    width: '90%',
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#272727',
  },
  modalText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B6B6B',
    lineHeight: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalBtn: {
    width: '48%',
    height: 40,
    borderWidth: 1,
    borderColor: '#007DDC',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
