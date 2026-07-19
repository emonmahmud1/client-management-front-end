import { apiSlice } from '../api-slice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // Backend wraps: { statusCode, success, message, data: { accessToken, refreshToken, user } }
      transformResponse: (response: any) => response?.data ?? response,
    }),
  }),
});

export const { useLoginMutation } = authApi;
