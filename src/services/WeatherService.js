import axios from 'axios';

const BASE_URL = 'http://dataservice.accuweather.com';

export const getLocationsMatchAnAutocomplete = async (city) => {
    try {
        const response = await axios.get(`${BASE_URL}/locations/v1/cities/autocomplete`, {
            params: {
              apikey: process.env.REACT_APP_API_KEY,
              q: city,
            },
        });
        
        return { data: response.data || [], status: response.status };
    } catch (error) {
        return { data: null, status: error.response ? error.response.status : 500 };
    }
};

export const getCurrentCityWeather = async (locationKey) => {
    try {
        const response = await axios.get(`${BASE_URL}/currentconditions/v1/${locationKey}`, {
            params: {
              apikey: process.env.REACT_APP_API_KEY,
            },
        });

        return { data: response.data[0] || {}, status: response.status };
    } catch (error) {
        return { data: null, status: error.response ? error.response.status : 500 };
    }
};

export const getCityWeatherForOneDay = async (locationKey) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecasts/v1/daily/1day/${locationKey}`, {
            params: {
              metric: true,
              apikey: process.env.REACT_APP_API_KEY,
            },
          });

        return { data: response.data.DailyForecasts[0] || {}, status: response.status };
    } catch (error) {
        return { data: null, status: error.response ? error.response.status : 500 };
    }
};

export const getCityWeatherForLastFiveDay = async (locationKey) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecasts/v1/daily/5day/${locationKey}`, {
            params: {
              metric: true,
              apikey: process.env.REACT_APP_API_KEY,
            },
          });

        return { data: response.data.DailyForecasts || [], status: response.status };
    } catch (error) {
        return { data: null, status: error.response ? error.response.status : 500 };
    }
};