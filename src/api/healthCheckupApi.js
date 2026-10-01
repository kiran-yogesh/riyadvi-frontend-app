import client from './client';

export const submitHealthCheckupAudit = async (payload) => {
  const res = await client.post('/health-checkup', payload);
  return res.data;
};
