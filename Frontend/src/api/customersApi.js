import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";

export const getAllCustomers = () => axios.get(API_URL);
export const getCustomerById = (vsp) => axios.get(`${API_URL}/${vsp}`);
export const updateCustomer = (vsp, data) => axios.put(`${API_URL}/${vsp}`, data);
export const removeCustomer = (vsp) => axios.delete(`${API_URL}/${vsp}`);
export const addCustomer = (data) => axios.post(API_URL, data);