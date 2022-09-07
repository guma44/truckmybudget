import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const invoicesApi = createApi({
  reducerPath: "invoices",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Invoices'],
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query(formData) {
        console.log(formData);
        return {
          url: '/invoices',
          method: 'POST',
          // credentials: 'include',
          body: formData,
        //  headers: { "Content-Type": "multipart/form-data" },
        };
      },
      invalidatesTags: [{ type: 'Invoices', id: 'LIST' }]
    }),
    getInvoices: builder.query({
      query() {
        return {
          url: `/invoices`,
          // credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Invoices', id: 'LIST' }]
    }),
  }),
})

export const {
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} = invoicesApi