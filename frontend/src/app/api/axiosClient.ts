import axios from 'axios';
import { getApiUrl } from '@/app/api/apiUrl';

export async function getAxiosClient() {
  return axios.create({
    baseURL: await getApiUrl(),
    headers: {
      'Content-type': 'application/json',
    },
    withCredentials: true,
  });
}
