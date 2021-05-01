import axios from "axios";
const HttpRequest = axios.create();
HttpRequest.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("token") != null) {
      request.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    } else if (request.headers["public"] == "true") {
      delete request.headers["public"];
      return request;
    } else {
      return "";
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default HttpRequest;
