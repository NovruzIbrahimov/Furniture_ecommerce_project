import axios from 'axios';
import store from '../redux/store'; // Assuming this is where your Redux store is defined
import { setLoading } from '../redux/slice/loadingSlice'; // Assuming this is where your loading slice is defined

const baseURL = "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb";

const instance = axios.create({
  baseURL: baseURL,
});

let requestsCount = 0;

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token !== null) {
      config.headers.Authorization = token;
    }
    requestsCount++;
    if (requestsCount === 1) {
      store.dispatch(setLoading(true)); // Dispatch action to set loading state to true
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    requestsCount--;
    if (requestsCount === 0) {
      store.dispatch(setLoading(false)); // Dispatch action to set loading state to false
    }
    return response;
  },
  (error) => {
    requestsCount--;
    store.dispatch(setLoading(false)); // Dispatch action to set loading state to false
    console.error('Error occurred in API request:', error);

    const errorMessage = 'An error occurred while processing your request.';

    if (error.response) {
      error.message = error.response.data.message || errorMessage;
    } else if (error.request) {
      error.message = errorMessage;
    } else {
      error.message = errorMessage;
    }

    return Promise.reject(error);
  }
);

export default instance;