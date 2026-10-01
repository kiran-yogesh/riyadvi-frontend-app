import client from './client';

export const submitContactEnquiry = async (payload) => {
  const res = await client.post('/contact', payload);
  return res.data;
};
