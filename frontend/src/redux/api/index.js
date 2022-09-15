import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

// initialize an empty api service that we'll inject endpoints into later as needed
export const TDBApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
  reducerPath: "tdb",
  tagTypes: ['Accounts', 'Expenses', 'Groups', 'Tags', 'Invoices'],
  endpoints: () => ({}),
})