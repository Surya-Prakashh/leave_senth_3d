import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const createLeave = (leaveData) => API.post('/leaves', leaveData);
export const getUserLeaves = (userId) => API.get(`/leaves/user/${userId}`);
export const getAllLeaves = () => API.get('/leaves');
export const updateLeaveStatus = (id, status) => API.put(`/leaves/${id}`, { status });