import api from "./api";

const baseUrl = "http://localhost:3001/api/healthrecords";

export const getAll = async () => {
  const response = await api.get(baseUrl);
  return response.data;
};

export const getById = async (id) => {
  const response = await api.get(`${baseUrl}/${id}`);
  return response.data;
};

const createStaff = async (staffData) => {
  const response = await api.post(baseUrl, staffData);
  return response.data;
};

const deleteStaff = async (id) => {
  const response = await api.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updateStaff = async (id, updatedData) => {
  const response = await api.put(`${baseUrl}/${id}`, updatedData);
  return response.data;
};

export default { getAll, getById, createStaff, deleteStaff, updateStaff };