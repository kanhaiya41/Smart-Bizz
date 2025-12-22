// src/apiConfig.js

// Change this to an empty string. 
// This forces the request to go through your localhost proxy.
export const BASE_URL = ''; 

export const API_ENDPOINTS = {
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGIN: `${BASE_URL}/auth/login`,
};