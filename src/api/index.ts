import axios from 'axios';

export const apiConfig = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'https://63447feb242c1f347f8782db.mockapi.io/Items'
});

export const pizzaAPI = {
  getPizzas(page:number = 1, limit:number = 4, sortBy:string, order:string,category?:number,search?:string) {
    return apiConfig.get('', {
      params: {
        page,limit,sortBy,order,category,search
      }
    });
  }
}