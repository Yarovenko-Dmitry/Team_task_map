import axios from 'axios';

const addObjInstance = axios.create({ 
  baseURL: 'https://geocode-maps.yandex.ru/1.x/',
});

const searchObjInstance = axios.create({ 
  baseURL: 'https://search-maps.yandex.ru/v1/',
});

export const mainRequest = {
  getObjectCoordinates(geocode: string) {
    return addObjInstance.get(`?geocode=${geocode}`);
  },
  getDesplayObjects(objectType: string, location: string, streetName: string, objectCount: number) {
    return searchObjInstance.get(`?text=${objectType}, ${location}, ${streetName} &type=biz&lang=ru_RU&results=${objectCount}`);
  }
}
//
// axios.defaults.params = {};
export const setAddObjInterceptors = (addObjInstance: any) => {
    addObjInstance.interceptors.request.use(
    async (config: any) => {
      const apiKey = '62863b39-ff46-4e0f-a09b-34ed4079f28a'
      const format = 'json'
      config.params = {...config.params, apikey: apiKey, format: format}
      return config;
    },
    (error: any) => Promise.reject(error)
  );
}

setAddObjInterceptors(addObjInstance)

export const setSearchObjInterceptors = (searchObjInstance: any) => {
    searchObjInstance.interceptors.request.use(
    async (config: any) => {
      const apiKey = '568dafa6-e76b-459f-adab-c4761fc807ed'
      config.params = {...config.params, apikey: apiKey}
      return config;
    },
    (error: any) => Promise.reject(error)
  );
}

setSearchObjInterceptors(searchObjInstance)
