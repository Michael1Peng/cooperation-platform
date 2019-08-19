import {city_data} from './area.data';

export const getProvinces = () => {
  const provinces = [];
  for (const province in city_data) {
    if (city_data.hasOwnProperty(province)) {
      provinces.push(province);
    }
  }
  return provinces;
};

export const getCities = (p: string) => {
  if (!p || !city_data.hasOwnProperty(p)) {
    return [];
  }

  // get the cities from province.
  const cities = [];
  const cityList = city_data[p];
  for (const city in cityList) {
    if (cityList.hasOwnProperty(city)) {
      cities.push(city);
    }
  }

  return cities;
};

export const getDistricts = (p: string, c: string) => {
  // check the provinces first
  if (!p || !city_data.hasOwnProperty(p)) {
    return [];
  }

  // check the city
  const cityList = city_data[p];
  if (!c || !cityList.hasOwnProperty(c)) {
    return [];
  }

  return cityList[c];
};


