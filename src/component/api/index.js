// axiosInstance.js
import axios from 'axios';
import { Alert } from 'react-native';
import { getItem } from '../../utils/functions';

const axiosInstance = axios.create({
  baseURL: 'https://api.oxikart.in/api/v1/',
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async config => {
    const token = await getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log('No token found, user may need to log in');
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Check if response is HTML, indicating a permission error
    if (typeof response.data === 'string' && response.data.includes('<h1>Permission Denied</h1>')) {
      console.log('Permission Denied HTML response received');
      Alert.alert('Permission Denied', 'You are not authorized to access this resource. Please log in again.');
      return Promise.reject(new Error('Permission Denied'));
    }
    
    const appData = response?.data?.app_data;

    if (appData && appData.StatusCode === 6000) {
      return appData;
    } else if (appData && appData.data) {      
      Alert.alert(appData.data.title, appData.data.message);
      return Promise.reject(new Error('Non-success status code'));
    } else {
      console.log('Unexpected response structure:', response.data);
      Alert.alert('Error', 'Unexpected response structure from server.');
      return Promise.reject(new Error('Unexpected response structure'));
    }
  },
  error => {
    console.log(`Error API Endpoint: ${error.config?.url}`, error);
    if (error.response && error.response.status === 401) {
      Alert.alert('Unauthorized', 'You are not authorized to access this resource.');
    } else {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
