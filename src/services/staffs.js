import axios from "axios";

const baseUrl = "http://localhost:3001/api/healthrecords";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const createStaff = async (staffData) => {
  const response = await axios.post(baseUrl, staffData);
  return response.data;
};

const deleteStaff = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updateStaff = async (id, updatedData) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedData);
  return response.data;
};

export default { getAll, getById, createStaff, deleteStaff, updateStaff };