import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const ReusableBottomSheet = forwardRef(({content, height}, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    openSheet: () => setVisible(true),
    closeSheet: () => setVisible(false),
  }));

  const handleOverlayPress = () => {
    setVisible(false);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      {/* Blur background overlay */}
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.blurContainer}>
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
        </View>
      </TouchableWithoutFeedback>

      {/* Modal content */}
      <View style={[styles.modalContainer, {height}]}>
        <View style={styles.sheetContent}>{content}</View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});

export default ReusableBottomSheet;
