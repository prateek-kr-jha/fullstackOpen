import axios from "axios";
const url = "/api/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => {
    console.log(request)
    return response.data
  });
};
const addPerson = (person) => {
  const request = axios.post(url, person);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};

const changeNumber = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject);
  return request.then(response => response.data); 
}
export default {
  getAll,
  addPerson,
  deletePerson,
  changeNumber
};
