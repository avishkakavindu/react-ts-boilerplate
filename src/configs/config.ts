let ENV = process.env.REACT_APP_ENV || '';
const BASE_URL = process.env.BASE_URL || 'http://localhost:4000';

if (ENV) {
  ENV = ENV.trim();
  ENV = ENV.toLowerCase();
}

export const getBaseUrl = () => BASE_URL;
