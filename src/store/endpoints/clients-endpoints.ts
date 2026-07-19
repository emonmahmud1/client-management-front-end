import { apiSlice } from '../api-slice';

export const clientsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => '/clients',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Client'],
    }),
    getClientById: builder.query({
      query: (id: string) => `/clients/${id}`,
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: (_result, _error, id) => [{ type: 'Client', id }],
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: '/clients',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Client', 'Dashboard'],
    }),
    updateClient: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/clients/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Client', id }, 'Client', 'Dashboard'],
    }),
    deleteClient: builder.mutation({
      query: (id: string) => ({
        url: `/clients/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Client', 'Dashboard'],
    }),
  }),
});

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
