import axios from "axios";

const instance = axios.create({
  baseURL: "https://noveltibackend.onrender.com/api",
});

export default instance;
