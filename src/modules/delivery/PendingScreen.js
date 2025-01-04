import {useRef, useState} from 'react';
import useGetapi from '../../hooks/useGetapi';
import {
    Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DeliveryItem from '../../component/DeliveryItem';
import {BlurView} from '@react-native-community/blur';
import {Modal} from 'react-native';
import axiosInstance from '../../component/api';

const PendingScreen = ({combinedOrders, refresh, setRefresh}) => {
  const [visible, setVisible] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    // Move to the next input if a digit is entered
    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
    setOtp(newOtp);
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace' && otp[index] === '') {
      // Move to the previous input if backspace is pressed and current input is empty
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const verifyOtp = async () => {
    const otpCode = otp.join('');
    // Call API to verify OTP
    try {
      const response = await axiosInstance.post(
        `activities/delivery-verify-otp/${selectedOrder.id}/`,
        {otp: otpCode},
        { params: { deliver: true } }
      );
      if (response.StatusCode === 6000) {
        // OTP verified successfully
        setOtp(['', '', '', '']);
        ToastAndroid.show('OTP verified successfully', ToastAndroid.SHORT);
        setVisible(false);
      } else if (response.StatusCode === 6001) { // Invalid OTP
        Alert.alert(response.data.title, response.data.message);
      } else {
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVisible(false);
      setOtp(['', '', '', '']);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={combinedOrders}
        renderItem={({item}) => (
          <DeliveryItem
            item={item}
            setVisible={setVisible}
            setSelectedOrder={setSelectedOrder}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        style={{backgroundColor: '#fff'}}
        refreshing={refresh}
        onRefresh={() => setRefresh(!refresh)}
      />

      <Modal
        transparent
        visible={visible}
        animationType="slide"
        onRequestClose={() => setVisible(false)}>
        {/* Blur background overlay */}
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
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
        <View style={styles.modalContainer}>
          <View style={styles.sheetContent}>
            <View style={styles.container}>
              <Text style={styles.title}>Enter code</Text>
              <Text style={styles.subtitle}>
                Please enter the delivery code from customers phone
              </Text>

              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={event => handleKeyPress(event, index)}
                    ref={ref => (inputs.current[index] = ref)} // Save references to inputs
                  />
                ))}
              </View>
              <View style={{width: '100%', paddingBottom: 20}}>
                <TouchableOpacity style={styles.button} onPress={verifyOtp}>
                  <Text style={{color: '#fff'}}>Verify OTP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PendingScreen;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
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
    height: '60%',
  },
  sheetContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  container: {
    paddingTop: 30,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 28,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6E7475',
    fontSize: 14,
    textAlign: 'center',
    width: '80%',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingBottom: 50,
  },
  otpInput: {
    width: 70,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    marginHorizontal: 5,
    color: '#000',
  },
  button: {
    backgroundColor: '#007DDC',
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});
