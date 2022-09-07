import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// initialize an empty api service that we'll inject endpoints into later as needed
export const groupsApi = createApi({
  reducerPath: "groups",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
  tagTypes: ['Groups'],
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query(group) {
        return {
          url: '/groups',
          method: 'POST',
          // credentials: 'include',
          body: group,
        };
      },
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }]
    }),
    getGroups: builder.query({
      query() {
        return {
          url: `/groups`,
          // credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Groups', id: 'LIST' }]
    }),
    deleteGroup: builder.mutation({
      query(id) {
        return {
          url: `/groups/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: [{ type: "Groups", id: "LIST"}]
    }),
  }),
})

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useDeleteGroupMutation
} = groupsApi