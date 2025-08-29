import axios from 'axios';

const API_URL = (process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/tasks';

const api = axios.create({ baseURL: API_URL, timeout: 10000 });

export default {
  getTasks: params => api.get('/', { params }).then(r => r.data),
  createTask: body => api.post('/', body).then(r => r.data),
  updateTask: (id, body) => api.put(`/${id}`, body).then(r => r.data),
  toggleComplete: id => api.patch(`/${id}/complete`).then(r => r.data),
  deleteTask: id => api.delete(`/${id}`)
};
