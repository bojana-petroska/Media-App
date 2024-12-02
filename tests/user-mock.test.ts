import axios from 'axios';

export const fetchExternalApi = async (url: string, params) => {
  const response = await axios.get(url, params);
  return response.data;
};
