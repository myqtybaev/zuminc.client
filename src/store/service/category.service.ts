import { ICategory } from "./../../admin/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { headers } from "../../hooks/axios";

// Define a service using a base URL and expected endpoints
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/product/category" }),
  endpoints: (builder) => ({
    GetAll: builder.query<ICategory[], string>({
      query: (id) => ({
        url: "/",
        headers,
      }),
    }),
    getOne: builder.query<ICategory, string>({
      query: (id) => ({
        url: "/" + id,
        headers,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = categoryApi;
