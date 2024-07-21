// frontend/src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Sesuaikan URL backend Anda

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
