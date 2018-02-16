import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  console.log(axios.get(baseUrl))
  return axios.get(baseUrl)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const destroy = (person) => {
    console.log(person)
    return axios.delete(`${baseUrl}/${person.id}`,)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

export default { getAll, create, destroy, update }