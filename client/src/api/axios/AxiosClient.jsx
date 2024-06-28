import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  withCredentials: true,
});
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

AxiosClient.interceptors.request.use(
  (config) => {
    console.log(document.cookie);
    console.log(getCookie("csrf_access_token"));
    config.headers["X-CSRF-TOKEN"] = getCookie("csrf_access_token");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default AxiosClient;
