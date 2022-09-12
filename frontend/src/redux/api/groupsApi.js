import { TDBApi } from '.';

// initialize an empty api service that we'll inject endpoints into later as needed
export const groupsApi = TDBApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query(group) {
        return {
          url: '/groups',
          method: 'POST',
          credentials: 'include',
          body: group,
        };
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }]
    }),
    updateGroup: builder.mutation({
      query({id, group}) {
        return {
          url: `/groups/${id}`,
          method: 'PUT',
          credentials: 'include',
          body: group,
        };
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }, {type: "Expenses", id: "LIST"}]
    }),
    getGroups: builder.query({
      query() {
        return {
          url: `/groups`,
          credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Groups', id: 'LIST' }]
    }),
    deleteGroup: builder.mutation({
      query(id) {
        return {
          url: `/groups/${id}`,
          credentials: 'include',
          method: "DELETE"
        };
      },
      invalidatesTags: [{ type: "Groups", id: "LIST"}]
    }),
  }),
})

export const {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useGetGroupsQuery,
  useDeleteGroupMutation
} = groupsApi