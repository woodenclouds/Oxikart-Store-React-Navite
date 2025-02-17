import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const OtpModal = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // State to store the OTP digits

  const handleChange = (text, index) => {
    // Update the corresponding digit
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus the next input if a digit is entered
    if (text && index < otp.length - 1) {
      const nextInput = inputs[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const inputs = []; // To store input references for programmatically focusing

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
            ref={input => (inputs[index] = input)}
          />
        ))}
      </View>
      <View style={{width: '100%', paddingHorizontal: 15, paddingBottom: 20}}>
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
    color: '#5A5A5A',
    fontSize: 14,
    textAlign: 'center',
    width: '80%',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
    paddingBottom: 50,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    textAlign: 'center',
    fontSize: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#007DDC',
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});
