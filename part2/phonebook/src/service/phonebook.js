import axios from "axios";
const url = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};
const addPerson = (person) => {
  const request = axios.post(url, person);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${url}/${id}`);
  return request.then((response) => response.data);
};
export default {
  getAll,
  addPerson,
  deletePerson,
};
