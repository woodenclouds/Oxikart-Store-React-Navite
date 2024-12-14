import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import { DownArrrow } from '../../assets/svg-icons';

const Dropdown = ({options, selectedValue, onValueChange, placeholder}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleSelect = item => {
    onValueChange(item);
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>
          {selectedValue ? selectedValue.label : placeholder}
        </Text>
        <DownArrrow/>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modal}>
            <FlatList
              data={options}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}>
                  <Text style={{color: "#000"}}>{item.full_name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 16,
    borderRadius: 5,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: "#C3C3C3"
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '50%',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
});

export default Dropdown;
