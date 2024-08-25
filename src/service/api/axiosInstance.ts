import axios from 'axios';

//get baseURL from env
const baseUrl =  process.env.REACT_APP_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
