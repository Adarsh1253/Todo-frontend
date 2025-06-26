import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-backend-qgoe.onrender.com",
});
console.log(Process.env.REACT_APP_API_URL);
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getTasks = () => API.get("/");
export const createTask = (data) => API.post("/", data);
export const updateTask = (id, data) => API.put(`/${id}`, data);
export const deleteTask = (id) => API.delete(`/${id}`);
