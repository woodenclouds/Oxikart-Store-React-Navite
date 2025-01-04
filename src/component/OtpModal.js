import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const OtpModal = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
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
  
  const handleSubmit = () => {

  };

  return (
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
        <TouchableOpacity style={styles.button}>
          <Text style={{color: '#fff'}}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpModal;

const styles = StyleSheet.create({
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
