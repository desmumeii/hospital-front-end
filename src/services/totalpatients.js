import api from "./api"

const baseUrl = `${import.meta.env.VITE_API_URL}/api/totalpatients`

export const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

export const getById = async (id) => {
  const response = await api.get(`${baseUrl}/${id}`)
  return response.data
}

const createTotalPatient = async (data) => {
  const response = await api.post(baseUrl, data)
  return response.data
}

const deleteTotalPatient = async (id) => {
  const response = await api.delete(`${baseUrl}/${id}`)
  return response.data
}

const updateTotalPatient = async (id, updatedData) => {
  const response = await api.put(`${baseUrl}/${id}`, updatedData)
  return response.data
}

export default { getAll, getById, createTotalPatient, deleteTotalPatient, updateTotalPatient }
