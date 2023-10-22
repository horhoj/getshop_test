import axios from 'axios';
import { DEFAULT_HEADERS } from '~/config/api';

export type NumVerifyResponse = {
  valid: boolean;
  number: string;
  local_format: string;
  international_format: string;
  country_prefix: string;
  country_code: string;
  country_name: string;
  location: string;
  carrier: string;
  line_type: string;
};

const axiosInstance = axios.create({
  baseURL: 'http://apilayer.net/api',
  headers: { ...DEFAULT_HEADERS },
});

export const numVerify = async (number: string) => {
  const res = await axiosInstance.request<NumVerifyResponse>({
    method: 'get',
    url: '/validate',
    params: {
      country_code: 'RU',
      number,
      access_key: '8e59e47c9da1bff69f2af1870498b665',
    },
  });

  return res.data.valid;
};
