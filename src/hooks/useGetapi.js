import {useEffect, useState} from 'react';
import axiosInstance from '../component/api';

const useGetapi = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(url);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setRefresh(false);
      }
    };

    fetchData();
  }, [url, refresh]);

  return {data, loading, error, refresh, setRefresh};
};

export default useGetapi;
