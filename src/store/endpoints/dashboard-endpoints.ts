import { apiSlice } from '../api-slice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKpis: builder.query({
      query: () => '/dashboard/kpis',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Dashboard'],
    }),
    getInvoiceStatus: builder.query({
      query: () => '/dashboard/invoice-status',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Dashboard', 'Invoice'],
    }),
    getExpenseCategories: builder.query({
      query: () => '/dashboard/expense-categories',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Dashboard', 'Expense'],
    }),
    getMonthlyFinance: builder.query({
      query: () => '/dashboard/monthly-finance',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Dashboard', 'Invoice', 'Expense'],
    }),
    getRecentOverdueInvoices: builder.query({
      query: () => '/dashboard/recent-overdue-invoices',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Dashboard', 'Invoice'],
    }),
    getRecentClients: builder.query({
      query: () => '/dashboard/recent-clients',
      transformResponse: (response: any) => response?.data ?? response,
      providesTags: ['Dashboard', 'Client'],
    }),
  }),
});

export const {
  useGetKpisQuery,
  useGetInvoiceStatusQuery,
  useGetExpenseCategoriesQuery,
  useGetMonthlyFinanceQuery,
  useGetRecentOverdueInvoicesQuery,
  useGetRecentClientsQuery,
} = dashboardApi;
