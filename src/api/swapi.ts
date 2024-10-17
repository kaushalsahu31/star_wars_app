import axios from 'axios';

const BASE_URL = 'https://swapi.dev/api';

export const getPeople = (url: string = `${BASE_URL}/people`) => {
  return axios.get(url);
};

export const getHomeworld = (url: string) => {
  return axios.get(url);
};
