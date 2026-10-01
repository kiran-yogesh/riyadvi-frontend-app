import client from './client';

export const submitCareerApplication = async (payload) => {
  const res = await client.post('/applications', payload);
  return res.data;
};
