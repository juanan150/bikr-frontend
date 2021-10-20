import axios from "axios";
const { REACT_APP_URL } = process.env;

const customAxios = axios.create({
  baseURL: "http://10.0.2.2:3001",
});

export default customAxios;
