import {
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import qs from 'qs';

const customFetchBaseQuery = ({ ...props }:FetchBaseQueryArgs) => fetchBaseQuery({
  ...props,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      // include token in req header
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  responseHandler: async (response) => {
    const text = await response.text();
    let parseResponse;
    try {
      parseResponse = JSON.parse(text);
    } catch (error) {
      throw Error(`[requestClient] Error parsing response JSON data - ${JSON.stringify(error)}`);
    }

    if (parseResponse.Success) {
      return parseResponse.Data;
    }
    return {
      statusCode: parseResponse.StatusCode,
      message: parseResponse.Message,
      error: parseResponse.Error,
    };
  },
});

export default customFetchBaseQuery;
