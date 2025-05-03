import axios from "axios";

// Create a base axios instance
export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`|| 'http://127.0.0.1:8000/',
    timeout: 10000,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });