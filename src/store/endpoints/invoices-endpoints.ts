import { apiSlice } from '../api-slice';

export const invoicesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => '/invoices',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Invoice'],
    }),
    getInvoiceById: builder.query({
      query: (id: string) => `/invoices/${id}`,
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: (_result, _error, id) => [{ type: 'Invoice', id }],
    }),
    createInvoice: builder.mutation({
      query: (data) => ({
        url: '/invoices',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Invoice', 'Client', 'Dashboard'],
    }),
    deleteInvoice: builder.mutation({
      query: (id: string) => ({
        url: `/invoices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Invoice', 'Client', 'Dashboard'],
    }),
    createPayment: builder.mutation({
      query: (data) => ({
        url: '/invoices/payments',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Invoice', 'Client', 'Dashboard'],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetInvoiceByIdQuery,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useCreatePaymentMutation,
} = invoicesApi;
