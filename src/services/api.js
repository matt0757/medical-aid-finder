import axios from 'axios';

// Create axios instance with base URL
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Facility API services
export const facilitiesService = {
  // Get all facilities
  getAllFacilities: () => api.get('/facilities'),
  
  // Get facility by ID
  getFacilityById: (id) => api.get(`/facilities/${id}`),
  
  // Get facilities near location
  getFacilitiesNearLocation: (longitude, latitude, maxDistance) => 
    api.get(`/facilities/near/${longitude}/${latitude}/${maxDistance || ''}`),
  
  // Get facilities by service
  getFacilitiesByService: (serviceName) => api.get(`/facilities/service/${serviceName}`),
  
  // Create facility (requires auth)
  createFacility: (facilityData) => api.post('/facilities', facilityData),
  
  // Update facility (requires auth)
  updateFacility: (id, facilityData) => api.put(`/facilities/${id}`, facilityData),
  
  // Delete facility (requires auth)
  deleteFacility: (id) => api.delete(`/facilities/${id}`)
};

// User API services
export const userService = {
  // Register new user
  register: (userData) => api.post('/auth/register', userData),
  
  // Login user
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Get current user profile
  getCurrentUser: () => api.get('/auth/me'),
  
  // Save facility to favorites
  saveFacility: (userId, facilityId) => 
    api.post(`/users/${userId}/save-facility/${facilityId}`),
  
  // Remove facility from favorites
  removeSavedFacility: (userId, facilityId) => 
    api.delete(`/users/${userId}/save-facility/${facilityId}`)
};

export default {
  facilitiesService,
  userService
};