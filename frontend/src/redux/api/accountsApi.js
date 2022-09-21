import { TDBApi } from '.';

// initialize an empty api service that we'll inject endpoints into later as needed
export const accountsApi = TDBApi.injectEndpoints({

  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query(formData) {
        return {
          url: '/accounts',
          method: 'POST',
          body: formData,
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: 'Accounts', id: 'LIST' }]
    }),
    getAccounts: builder.query({
      query() {
        return {
          url: `/accounts`,
          credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Accounts', id: 'LIST' }]
    }),
    deleteAccount: builder.mutation({
      query(id) {
        return {
          url: `/accounts/${id}`,
          method: "DELETE",
          credentials: 'include',
        };
      },
      invalidatesTags: [{ type: "Accounts", id: "LIST"}]
    }),
  }),
  overrideExisting: false
})

export const {
  useDeleteAccountMutation,
  useCreateAccountMutation,
  useGetAccountsQuery,
} = accountsApi
