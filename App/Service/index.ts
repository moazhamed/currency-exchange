import axios from 'axios';

const baseURL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1';

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.response.use(
  response => response,
  error => {
    // alert(`some thing went wrong${error}`);
  },
);

export default instance;
