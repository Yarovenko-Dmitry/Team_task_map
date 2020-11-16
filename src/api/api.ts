import axios from 'axios';

const instance = axios.create({
  // withCredentials: true,
  baseURL: 'https://geocode-maps.yandex.ru/1.x/',
});

export const mainRequest = {
  getObjectCoordinates(geocode: string) {
    return instance.get(`?geocode=${geocode}`);
  }}

axios.defaults.params = {};
export const setMobileInterceptors = (instance: any) => {
  instance.interceptors.request.use(
    async (config: any) => {
      const apiKey = '62863b39-ff46-4e0f-a09b-34ed4079f28a'
      const format = 'json'
        config.params = {...config.params, apikey: apiKey, format: format}
      return config;
    },
    (error: any) => Promise.reject(error)
  );
}

setMobileInterceptors(instance)