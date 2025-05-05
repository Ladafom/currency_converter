import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utils/apiUrl';

interface dataType {
  from:string,
  to:string,
  amount:string
}

export const currencyConverterApi = createApi({
  reducerPath: 'currencyConverterApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getAllCurrencies: builder.query<Record<string,string>, void>({
      query: () => 'currencies',
    }),
    getRate: builder.query<Record<string,string>, dataType>({
      query: (data) => `latest?base=${data.from}&symbols=${data.to}&amount=${data.amount}`,
    }),
  }),
});

export const {
  useGetAllCurrenciesQuery,
  useGetRateQuery,
} = currencyConverterApi;