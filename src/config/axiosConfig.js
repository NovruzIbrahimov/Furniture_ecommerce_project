import axios from 'axios';

const baseURL = "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb";


const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token !== null) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );


instance.interceptors.response.use(
    (response) => response,
    (error) => {

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