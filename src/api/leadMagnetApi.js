import client from './client';

export const submitLeadMagnetDownload = async (payload) => {
  const res = await client.post('/lead-magnet', payload);
  return res.data;
};
