import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.8:8080',
});


api.interceptors.request.use(async (config) => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc0OTM0NDgxNSwiZXhwIjoxNzQ5NDMxMjE1fQ.7dwnGSPodfhrIZdfVXlIKb5wD7KhlNl_H28DeQF6KMM'; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
