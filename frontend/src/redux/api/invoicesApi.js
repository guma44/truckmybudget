import { TDBApi } from '.';

// initialize an empty api service that we'll inject endpoints into later as needed
export const invoicesApi = TDBApi.injectEndpoints({
  endpoints: (builder) => ({
    createInvoice: builder.mutation({
      query(formData) {
        console.log(formData);
        return {
          url: '/invoices',
          method: 'POST',
          credentials: 'include',
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
          credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Invoices', id: 'LIST' }]
    }),
    downloadInvoice: builder.query({
      query(id) {
        return {
          url: `/invoices/${id}/download`,
          credentials: 'include',
        };
      },
      providesTags:  [{ type: 'Invoices', id: 'LIST' }]
    }),
  }),
})

export const {
  useDownloadInvoiceQuery,
  useCreateInvoiceMutation,
  useGetInvoicesQuery,
} = invoicesApi