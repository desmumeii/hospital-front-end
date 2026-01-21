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

export default { getAll, getById };