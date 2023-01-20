import { AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';

export let axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://15.229.3.218:3333',
  timeout: 15000,
});


export const handleRequest = (url = '/', method: string = 'get', data: object = {}, headers?: object, options?: object) => {
  
  const token = localStorage.getItem('token')
  let newData = data;
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: method,
      url: url,
      headers: { 'Authorization': `Bearer ${token}` },
      data: newData,
      ...options,
    })
      .then((response: AxiosResponse) => {
        resolve(response);
      })

      .catch((error: AxiosError) => {

        if (error.response) {
          const { status } = error.response
          switch (status) {

            case 401:
              reject(error);
              break;
              case 500:
                reject(error)
                break;
            default:
              reject(error);
          }

          reject(error);
        }

        reject(error);
      });
  });
};


