import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser } from '../features/userSlice';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}users/`,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query({
      query() {
        return {
          url: 'me',
          credentials: 'include',
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
  }),
});