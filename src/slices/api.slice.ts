import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getBaseUrl } from '../configs/config';

const baseQuery = fetchBaseQuery({ baseUrl: getBaseUrl() });

const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});

export default apiSlice;
