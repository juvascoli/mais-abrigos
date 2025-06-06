import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.11:8080',
});


api.interceptors.request.use(async (config) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0OTI0Mzg3OCwiZXhwIjoxNzQ5MzMwMjc4fQ.ukg0_vGlAzklhMFLfvprMrnJbHb0TAvMB5n5h7IrIgk'; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
