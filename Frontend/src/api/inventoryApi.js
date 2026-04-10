import axios from "axios";

const API = "http://localhost:5000/api/inventory";

export const getAll = () => axios.get(API);
export const create = (data) => axios.post(API, data);
export const update = (cs, data) => axios.put(`${API}/${cs}`, data);
export const remove = (cs) => axios.delete(`${API}/${cs}`);

// Add this:
export const getById = (cs) => axios.get(`${API}/${cs}`);