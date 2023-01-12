import { AxiosRequestConfig } from "axios";
export const header: AxiosRequestConfig = {
  headers: {
    Auhorization: "Bearer " + localStorage.getItem("access-token")?.toString(),
  },
};
