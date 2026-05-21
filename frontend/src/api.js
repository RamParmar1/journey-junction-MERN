import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem('jj_user'));
  if (user && user.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }
  return req;
});

// Booking API calls
export const createBooking = (bookingData) => API.post('/bookings', bookingData);
export const getMyBookings = () => API.get('/bookings/my');
export const getBooking = (id) => API.get(`/bookings/${id}`);
export const cancelBooking = (id) => API.put(`/bookings/${id}/cancel`);
export const deleteBooking = (id) => API.delete(`/bookings/${id}`);
export const getAllBookings = () => API.get('/bookings');
export const updateBookingStatus = (id, status) => API.put(`/bookings/${id}/status`, { status });

// Package API calls
export const getPackages = () => API.get('/packages');
export const getPackage = (id) => API.get(`/packages/${id}`);

// User API calls
export const login = (userData) => API.post('/users/login', userData);
export const register = (userData) => API.post('/users', userData);
export const getProfile = () => API.get('/users/profile');