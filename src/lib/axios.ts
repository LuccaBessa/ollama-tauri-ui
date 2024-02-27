import axios from 'axios';

const http = axios.create({
  baseURL: localStorage.getItem('base_ollama_url')!,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

export { http };
