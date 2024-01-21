import { ILoginInput } from 'types';
import { AUTH } from 'api/apiEndpoints';
import apiSlice from './api.slice';

export const usersAPISlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data: ILoginInput) => ({
        url: AUTH.LOGIN,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersAPISlice;
