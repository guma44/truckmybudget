import { TDBApi } from '.';

// initialize an empty api service that we'll inject endpoints into later as needed
export const tagsApi = TDBApi.injectEndpoints({
    endpoints: (builder) => ({
        createTag: builder.mutation({
            query(tag) {
                return {
                    url: '/tags',
                    method: 'POST',
                    credentials: 'include',
                    body: tag,
                };
            },
            invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
        }),
        getTags: builder.query({
            query() {
                return {
                    url: `/tags`,
                    credentials: 'include',
                };
            },
            providesTags: [{ type: 'Tags', id: 'LIST' }]
        }),
        updateTag: builder.mutation({
            query({id, tag}) {
              return {
                url: `/tags/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: tag,
              };
            },
            invalidatesTags: [{ type: 'Tags', id: 'LIST' }, {type: "Expenses", id: "LIST"}]
          }),
        deleteTag: builder.mutation({
            query(id) {
                return {
                    url: `/tags/${id}`,
                    credentials: 'include',
                    method: "DELETE"
                };
            },
            invalidatesTags: [{ type: "Tags", id: "LIST" }]
        }),
    }),
})

export const {
    useCreateTagMutation,
    useUpdateTagMutation,
    useGetTagsQuery,
    useDeleteTagMutation
} = tagsApi