import { apiSlice } from '../api-slice';

export const expensesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query({
      query: () => '/expenses',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Expense'],
    }),
    getExpenseById: builder.query({
      query: (id: string) => `/expenses/${id}`,
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: (_result, _error, id) => [{ type: 'Expense', id }],
    }),
    createExpense: builder.mutation({
      query: (data) => ({
        url: '/expenses',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Expense', 'Dashboard'],
    }),
    updateExpense: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/expenses/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Expense', id }, 'Expense', 'Dashboard'],
    }),
    deleteExpense: builder.mutation({
      query: (id: string) => ({
        url: `/expenses/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Expense', 'Dashboard'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetExpenseByIdQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expensesApi;
