import { TDBApi } from '.';

// initialize an empty api service that we'll inject endpoints into later as needed
export const expensesApi = TDBApi.injectEndpoints({
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
      invalidatesTags: [{ type: 'Expenses', id: 'LIST' }, {type: "Accounts", id: "LIST"}]
    }),
    updateExpense: builder.mutation({
      query({id, expense}) {
        return {
          url: `/expenses/${id}`,
          method: 'PUT',
          // credentials: 'include',
          body: expense,
        };
      },
      invalidatesTags: [{ type: 'Expenses', id: 'LIST' }, {type: "Accounts", id: "LIST"}]
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
      invalidatesTags: [{ type: "Expenses", id: "LIST"}, {type: "Accounts", id: "LIST"}]
    }),
  }),
})

export const {
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useGetExpensesQuery,
  useDeleteExpenseMutation
} = expensesApi