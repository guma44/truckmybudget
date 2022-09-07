import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const accountsApi = createApi({
  reducerPath: "accounts",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Accounts'],
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query(formData) {
        console.log(formData);
        return {
          url: '/accounts',
          method: 'POST',
          // credentials: 'include',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Accounts', id: 'LIST' }]
    }),
    getAccounts: builder.query({
      query() {
        return {
          url: `/accounts`,
          // credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Accounts', id: 'LIST' }]
    }),
    deleteAccount: builder.mutation({
      query(id) {
        return {
          url: `/accounts/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: [{ type: "Accounts", id: "LIST"}]
    }),
    subtractFromAccount: builder.mutation({
      query({id, amount}) {
        return {
          url: `/accounts/${id}/subtract`,
          method: "PUT",
          body: {amount: amount}
        };
      },
      invalidatesTags: [{ type: "Accounts", id: "LIST"}]
    }),
    addToAccount: builder.mutation({
      query({id, amount}) {
        return {
          url: `/accounts/${id}/add`,
          method: "PUT",
          body: {amount: amount}
        };
      },
      invalidatesTags: [{ type: "Accounts", id: "LIST"}]
    }),
  }),
})

export const {
  useDeleteAccountMutation,
  useSubtractFromAccountMutation,
  useAddToAccountMutation,
  useCreateAccountMutation,
  useGetAccountsQuery,
} = accountsApi