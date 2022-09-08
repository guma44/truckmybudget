import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const TDBApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  reducerPath: "tdb",
  tagTypes: ['Accounts', 'Expenses', 'Groups', 'Tags', 'Invoices'],
  endpoints: () => ({}),
})