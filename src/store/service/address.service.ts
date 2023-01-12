import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IData {
  country: string;
  city: string;
}
// Define a service using a base URL and expected endpoints
export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/address" }),
  endpoints: (builder) => ({
    GetAll: builder.query<IData[], string>({
      query: (id) => ({
        url: "",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery } = addressApi;
