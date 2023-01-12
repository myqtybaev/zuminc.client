import { IAttribute, IProduct, ICategory } from "./../../admin/interface";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IData {
  product: IProduct[];
  count: number;
}
// Define a service using a base URL and expected endpoints
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/product" }),
  endpoints: (builder) => ({
    GetAll: builder.query<IData, number>({
      query: (id) => ({
        url: "?count=" + id,
      }),
    }),
    GetQuery: builder.query<IData, string | undefined>({
      query: (query) => ({
        url: query ? query : "/",
      }),
    }),
    GetParam: builder.query<IProduct[], string>({
      query: (param) => ({
        url: "/param=" + param,
      }),
    }),
    GetOne: builder.query<IProduct, string | undefined>({
      query: (id) => ({ url: "/id=" + id }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetParamQuery, useGetOneQuery } = productApi;
