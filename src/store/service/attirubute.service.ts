import { IAttribute } from "./../../admin/interface";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const attributeApi = createApi({
  reducerPath: "attributeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/product/attribute" }),
  endpoints: (builder) => ({
    GetAll: builder.query<IAttribute[], string>({
      query: (id) => ({
        url: "/",
        headers: {
          "access-token": String(localStorage.getItem("access-token")),
        },
      }),
    }),
    GetOne: builder.query<IAttribute, string>({
      query: (name) => name,
    }),
    GetIds: builder.query<IAttribute[], string[]>({
      query: (name) => "/ids=" + name.join(","),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetOneQuery, useGetIdsQuery } = attributeApi;
