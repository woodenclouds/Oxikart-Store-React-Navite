import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {LogBg} from '../../assets/bg';
import textStyle from '../../assets/styles/textStyles';
import {InputLabel, PasswordField, TextField} from '../../component/inputs';
import {saveItem, validateForm} from '../../utils/functions';
import {loginSchema} from '../../utils/formSchemas';
import {setUserInfo} from '../../store/actions/userActions';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const loginUser = async () => {
    try {
      const response = await axios.post(
        'https://api.oxikart.in/api/v1/accounts/login/',
        {
          email: loginData.username,
          password: loginData.password,
        },
      );

      if (response.data.app_data.StatusCode === 6000) {
        saveItem('token', response?.data?.app_data.data.access_token);
        saveItem('role', response?.data?.app_data.data.roles[0]);
        if (response.data.pk) {
          saveItem('user_id', response?.data?.app_data.data.pk);
        }
        dispatch(
          setUserInfo({
            isVerified: true,
            token: response?.data?.app_data.data.access_token,
            role: response?.data?.app_data.data.roles[0],
            user_id: response?.data?.app_data.data.pk,
          }),
        );
        // Navigate to Home screen after successful login
        navigation.navigate('MainTab');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [validationErrors, setValidationErrors] = useState({});

  const handleSubmit = () => {
    const errors = validateForm(loginData, loginSchema);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      loginUser();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      // keyboardVerticalOffset={90}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <View style={styles.imageContainer}>
            <Image source={LogBg} style={styles.image} />
          </View>
          <View style={styles.cover}>
            <View style={{gap: 16}}>
              <Text style={textStyle.signIn}>Sign In</Text>
              <Text style={textStyle.subSign}>
                Login to your account and explore{'\n'}the orders
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <InputLabel>Email / Mobile number*</InputLabel>
                <TextField
                  placeholder="Enter Email id or mobile number"
                  value={loginData.username}
                  onChangeText={text =>
                    setLoginData(prev => ({...prev, username: text}))
                  }
                />
                {validationErrors.username ? (
                  <Text style={styles.error}>{validationErrors.username}</Text>
                ) : null}
              </View>
              <View style={styles.inputContainer}>
                <InputLabel>Password</InputLabel>
                <View>
                  <PasswordField
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChangeText={e =>
                      setLoginData(prev => ({...prev, password: e}))
                    }
                  />
                  {validationErrors.password ? (
                    <Text style={styles.error}>
                      {validationErrors.password}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
            <View style={styles.buttonSection}>
              <TouchableOpacity style={styles.grayButton}>
                <Text style={{color: '#007DDC', fontSize: 14}}>Need help</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.blueButton}
                onPress={() => handleSubmit()}>
                <Text style={{color: '#fff', fontSize: 14}}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    backgroundColor: '#fff',
    marginTop: -110,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    // flex: 1,
    gap: 50,
    justifyContent: 'space-evenly',
  },
  form: {
    gap: 25,
  },
  inputContainer: {
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    color: '#D64A4A',
    fontSize: '12px',
    fontWeight: '400',
    textAlign: 'right',
  },
  success: {
    marginTop: 5,
    color: 'green',
  },
});
