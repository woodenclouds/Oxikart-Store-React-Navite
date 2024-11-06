import axios from 'axios';
import axiosInstance from '../component/api';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../store/actions/userActions';
import { saveItem } from '../utils/functions';

const useLogin = ({ username, password }, navigation) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);
  const dispatch = useDispatch();

  const login = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axiosInstance.post('accounts/login/', {
        email: username,
        password: password,
      });
      if (response.StatusCode === 6000) {
        console.log(response);
        saveItem('token', response?.data?.access?.access);
        saveItem('role', response.data.roles[0]);
        console.log(response.data.roles[0], 'rolee');
        if (response.data.pk) {
          saveItem('user_id', response.data.pk);
        }
        dispatch(
          setUserInfo({
            isVerified: true,
            token: response.data.access_token,
            role: response.data.roles[0],
            user_id: response.data.pk,
          }),
        );

        // Navigate to Home screen after successful login
        navigation.navigate('MainTab');
      }
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, data };
};

export default useLogin;
