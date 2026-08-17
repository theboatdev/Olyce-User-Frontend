import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPackages = async () => {
  const response = await api.get('/packages');
  return response.data;
};

export const fetchPackageBySlug = async (slug: string) => {
  // Implement a specific endpoint in backend if needed, or filter here.
  const response = await api.get(`/packages?slug=${slug}`);
  return response.data[0];
};

export const createPaymentIntent = async (bookingId: string) => {
  const response = await api.post('/payments/create-payment-intent', {
    bookingId
  });
  return response.data;
};

export const createBookingRecord = async (bookingData: any) => {
  const response = await api.post('/bookings', bookingData);
  return response.data;
};

export default api;
