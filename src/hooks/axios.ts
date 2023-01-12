import Axios from "axios";
export const headers = {
  "access-token": String(localStorage.getItem("access-token")),
};

export const axios = {
  post: (api: string, body: object) => {
    return Axios.post(api, body, { headers });
  },
  put: (api: string, body: object) => {
    return Axios.put(api, body, { headers });
  },
  get: (api: string) => {
    return Axios.get(api, { headers: headers });
  },
  delete: (api: string) => {
    return Axios.delete(api, { headers: headers });
  },
};
