import { weatherIcons } from "../constants/WeatherIcon";

const englishLetterPatern = /^[a-zA-Z\s]*$/;

export const isEnglishLetter = (str) => {
    return str.trim() === '' || englishLetterPatern.test(str);
}

export const setSelectedRowData = (option) => {
    return option.LocalizedName + ', ' + getCountryAndRegion(option);
}

export const getCountryAndRegion = (option) => {
    let str = option.Country.LocalizedName;
    if(option.LocalizedName !== option.AdministrativeArea.LocalizedName) {
        str += ', ' + option.AdministrativeArea.LocalizedName;
    }

    return str;
}

export const getIconImagePath = (iconId) => {
    const icon =  weatherIcons.find(icon => icon.value === iconId);

    if(!icon) {
        return null;
    }

    return icon.path;
}