import { TDBApi } from '.';

// initialize an empty api service that we'll inject endpoints into later as needed
export const tagsApi = TDBApi.injectEndpoints({
    endpoints: (builder) => ({
        createTag: builder.mutation({
            query(tag) {
                return {
                    url: '/tags',
                    method: 'POST',
                    // credentials: 'include',
                    body: tag,
                };
            },
            invalidatesTags: [{ type: 'Tags', id: 'LIST' }]
        }),
        getTags: builder.query({
            query() {
                return {
                    url: `/tags`,
                    // credentials: 'include',
                };
            },
            providesTags: [{ type: 'Tags', id: 'LIST' }]
        }),
        deleteTag: builder.mutation({
            query(id) {
                return {
                    url: `/tags/${id}`,
                    method: "DELETE"
                };
            },
            invalidatesTags: [{ type: "Tags", id: "LIST" }]
        }),
    }),
})

export const {
    useCreateTagMutation,
    useGetTagsQuery,
    useDeleteTagMutation
} = tagsApi