import api from "./api"

const baseUrl = "http://localhost:3001/api/diseaserecords"

export const getAll = async () => {
  const response = await api.get(baseUrl)
  return response.data
}

export const getById = async (id) => {
  const response = await api.get(`${baseUrl}/${id}`)
  return response.data
}

const createDiseaseRecord = async (data) => {
  const response = await api.post(baseUrl, data)
  return response.data
}

const deleteDiseaseRecord = async (id) => {
  const response = await api.delete(`${baseUrl}/${id}`)
  return response.data
}

const updateDiseaseRecord = async (id, updatedData) => {
  const response = await api.put(`${baseUrl}/${id}`, updatedData)
  return response.data
}

export default { getAll, getById, createDiseaseRecord, deleteDiseaseRecord, updateDiseaseRecord }
