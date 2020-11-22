import axios from 'axios';

const instance = axios.create({
  // withCredentials: true,
  baseURL: 'https://geocode-maps.yandex.ru/1.x/',
});

const instanceSECONDtest_To_Get_Objects = axios.create({
  // withCredentials: true,
  baseURL: 'https://search-maps.yandex.ru/v1/',
});

export const mainRequest = {
  getObjectCoordinates(geocode: string) {
    return instance.get(`?geocode=${geocode}`);
  },
  getDesplayObjects(objectType: string, location: string, streetName: string, objectCount: number) {
    return instanceSECONDtest_To_Get_Objects.get(`?text=${objectType}, ${location}, ${streetName} &type=biz&lang=ru_RU&results=${objectCount}`);
  }
}
//
// axios.defaults.params = {};
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

export const setMobileInterceptorsSECONDtest_To_Get_Objects = (instanceSECONDtest_To_Get_Objects: any) => {
  instanceSECONDtest_To_Get_Objects.interceptors.request.use(
    async (config: any) => {
      const apiKey = '568dafa6-e76b-459f-adab-c4761fc807ed'
      config.params = {...config.params, apikey: apiKey}
      return config;
    },
    (error: any) => Promise.reject(error)
  );
}

setMobileInterceptorsSECONDtest_To_Get_Objects(instanceSECONDtest_To_Get_Objects)
