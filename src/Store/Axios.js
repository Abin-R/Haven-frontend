import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import dayjs from 'dayjs';

const baseURL = 'https://haven.abinr.xyz/api';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();
// ... (rest of your code remains the same)
const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  console.log('Request:', req);
  const user = jwtDecode(localStorage.getItem('access_token'));
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (isExpired) {
    console.log('Token is expired');
  } else {
    console.log('Token is not expired');
    req.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
  }

  if (!isExpired) return req;

  console.log(localStorage.getItem('refresh_token'));

  try {
    const response = await axios.post(
      `${baseURL}/token/refresh/`,
      {
        refresh: localStorage.getItem('refresh_token'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        cancelToken: source.token,
      }
    );

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    req.headers.Authorization = `Bearer ${response.data.access}`;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error refreshing the token:', error);
    }
  }
  console.log("-----",req)
  return req;
});

export default axiosInstance;
