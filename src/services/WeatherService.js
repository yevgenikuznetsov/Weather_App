import { moscowRussionWeatehrOneDay, telAvivIsraelWeatehrOneDay } from "../constants/Response1DayWeatherConst";
import { locationsMatchAnAutocomplete, telAvivAutocomplete } from "../constants/ResponseSearchCirtConst";

export const getLocationsMatchAnAutocomplete = (city) => {
    return new Promise(resolve => setTimeout(() => "Tel Aviv" === city ? resolve(telAvivAutocomplete) : resolve(locationsMatchAnAutocomplete), 5000));
}

export const getCityWeatherForOneDay = (cityKey) => {
    return new Promise(resolve => setTimeout(() => 215854 === cityKey ? resolve(telAvivIsraelWeatehrOneDay) : resolve(moscowRussionWeatehrOneDay), 5000));
}