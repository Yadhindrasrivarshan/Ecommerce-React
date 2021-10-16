import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
//const TOKEN='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTllM2VjMjM2MzVkNWNiNmRhODA4YSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMzM1MzI5OCwiZXhwIjoxNjMzNjEyNDk4fQ.RgbKUv4DrM1rUQZ0rWf7dTrX7_0Ebo0LZpYO_rAdwYc'
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
