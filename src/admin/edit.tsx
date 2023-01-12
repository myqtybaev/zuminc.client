import { useEffect } from "react";
import { axios } from "../hooks/axios";

export const EditAll = () => {
  useEffect(() => {
    axios.get("/api/product/editall").then(console.log);
  }, []);
  return <h1>edit all</h1>;
};
