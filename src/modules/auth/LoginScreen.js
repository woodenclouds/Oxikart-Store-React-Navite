import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { LogBg } from '../../assets/bg';
import textStyle from '../../assets/styles/textStyles';
import { InputLabel, PasswordField, TextField } from '../../component/inputs';
import useLogin from '../../hooks/useLogin';
import { validateForm } from '../../utils/functions';
import { loginSchema } from '../../utils/formSchemas';

const LoginScreen = ({ navigation }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  
  const { login, loading, error, data } = useLogin(loginData, navigation);  // Pass navigation here

  const [validationErrors, setValidationErrors] = useState({});
  
  const handleSubmit = () => {
    const errors = validateForm(loginData, loginSchema);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      login();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={LogBg} style={styles.image} />
      </View>
      <View style={styles.cover}>
        <View>
          <Text style={textStyle.signIn}>Sign In</Text>
          <Text style={[textStyle.subSign, { width: '50%' }]}>
            Login to your account and explore the orders
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={styles.inputContainer}>
            <InputLabel>Email / Mobile number*</InputLabel>
            <TextField
              placeholder="Enter Email id or mobile number"
              value={loginData.username}
              onChangeText={text =>
                setLoginData(prev => ({ ...prev, username: text }))
              }
            />
            {validationErrors.username ? (
              <Text style={styles.error}>{validationErrors.username}</Text>
            ) : (
              <Text style={{ color: '#fff' }}>e </Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <InputLabel>Password*</InputLabel>
            <View>
              <PasswordField
                placeholder="Enter your password"
                value={loginData.password}
                onChangeText={e =>
                  setLoginData(prev => ({ ...prev, password: e }))
                }
              />
              {validationErrors.password ? (
                <Text style={styles.error}>{validationErrors.password}</Text>
              ) : (
                <Text style={{ color: '#fff' }}>e</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.grayButton}>
            <Text style={{ color: '#007DDC', fontSize: 14 }}>Need help</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => handleSubmit()}>
            <Text style={{ color: '#fff', fontSize: 14 }}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      {data && <Text style={styles.success}>Login successful!</Text>}
    </View>
  );
};

export default LoginScreen;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
  },
  cover: {
    position: 'absolute',
    width: '100%',
    height: '65%',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  inputContainer: {
    marginTop: 30,
  },
  buttonSection: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grayButton: {
    borderWidth: 1,
    borderColor: '#007DDC',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: '49%',
    borderRadius: 4,
  },
  blueButton: {
    backgroundColor: '#007DDC',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: '49%',
    borderRadius: 4,
  },
  error: {
    marginTop: 5,
    color: 'red',
  },
  success: {
    marginTop: 5,
    color: 'green',
  },
});
