import {
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query';
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import qs from 'qs';
import { toast } from 'react-toastify';

export type SuccessResponse = {
  Data:unknown
};

export type ErrorResponse = {
  statusCode: number;
  message: string;
  error: {
    InnerException: string;
    Message: string;
  }
};

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
  // use repeat format for array search params
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
  // transform response
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
    toast.error(parseResponse.Error.InnerException);
    return {
      statusCode: parseResponse.StatusCode,
      message: parseResponse.Message,
      error: parseResponse.Error,
    };
  },
});

export default customFetchBaseQuery;
