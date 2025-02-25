import { config } from '../config';

export const getOrigin = () => {
  if (!import.meta.env.SSR) return location.origin;
  return import.meta.env.MODE === 'development'
    ? 'http://localhost:1337'
    : config.host;
};
