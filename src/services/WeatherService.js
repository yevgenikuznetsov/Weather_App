import { moscowRussionWeatehrOneDay } from "../constants/Response1DayWeatherConst";
import { locationsMatchAnAutocomplete } from "../constants/ResponseSearchCirtConst";

export const getLocationsMatchAnAutocomplete = (city) => {
    return new Promise(resolve => setTimeout(() => resolve(locationsMatchAnAutocomplete), 5000));
}

export const getCityWeatherForOneDay = (cityKey) => {
    return new Promise(resolve => setTimeout(() => resolve(moscowRussionWeatehrOneDay), 5000));
}