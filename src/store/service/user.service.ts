import { IAttribute, IUser } from "./../../admin/interface";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/user" }),
  endpoints: (builder) => ({
    GetAll: builder.query<IUser[], number>({
      query: (count: number) => ({
        url: "/?count=" + count.toString(),
      }),
    }),
    GetOne: builder.query<IAttribute, string>({
      query: (name) => name,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetOneQuery } = usersApi;
