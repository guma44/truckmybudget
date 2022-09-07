import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const expensesApi = createApi({
  reducerPath: "expenses",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Expenses'],
  endpoints: (builder) => ({
    createExpense: builder.mutation({
      query(expense) {
        return {
          url: '/expenses',
          method: 'POST',
          // credentials: 'include',
          body: expense,
        };
      },
      invalidatesTags: [{ type: 'Expenses', id: 'LIST' }]
    }),
    getExpenses: builder.query({
      query() {
        return {
          url: `/expenses`,
          // credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Expenses', id: 'LIST' }]
    }),
    deleteExpense: builder.mutation({
      query(id) {
        return {
          url: `/expenses/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: [{ type: "Expenses", id: "LIST"}]
    }),
  }),
})

export const {
  useCreateExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpenseMutation
} = expensesApi