import { IPoromocode } from "../../hooks/interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IData {
  data: IPoromocode[];
  count: number;
}
// Define a service using a base URL and expected endpoints
export const promocodeApi = createApi({
  reducerPath: "promocodeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/promocode" }),
  endpoints: (builder) => ({
    GetAll: builder.query<IData, number>({
      query: (id) => ({
        url: "?count=" + id,
      }),
    }),
    GetById: builder.query<IPoromocode[], string>({
      query: (param) => ({
        url: "/id=" + param,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetByIdQuery } = promocodeApi;
