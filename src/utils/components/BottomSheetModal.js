import React, {useEffect, useRef} from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Text,
} from 'react-native';
import {Divider} from 'react-native-elements';

const BottomSheetModal = ({isVisible, onClose, children, title}) => {
  const translateY = useRef(new Animated.Value(600)).current; // Start offscreen

  useEffect(() => {
    if (isVisible) {
      openModal();
    } else {
      closeModal();
    }
  }, [isVisible]);

  const openModal = () => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.spring(translateY, {
      toValue: 600,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="none" // Use 'none' because we're animating manually
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modal, {transform: [{translateY}]}]}>
        <View style={styles.topContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Divider />
        {children}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
    minHeight: 200, // Adjust as per your content
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  topContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    color: '#000',
    fontSize: 20,
  },
});

export default BottomSheetModal;
