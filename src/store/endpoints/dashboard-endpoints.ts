import { apiSlice } from '../api-slice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKpis: builder.query({
      query: () => '/dashboard/kpis',
      providesTags: ['Dashboard'],
    }),
    getInvoiceStatus: builder.query({
      query: () => '/dashboard/invoice-status',
      providesTags: ['Dashboard', 'Invoice'],
    }),
    getExpenseCategories: builder.query({
      query: () => '/dashboard/expense-categories',
      providesTags: ['Dashboard', 'Expense'],
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetInvoiceStatusQuery,
  useGetExpenseCategoriesQuery,
} = dashboardApi;
