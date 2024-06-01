const englishLetterPatern = /^[a-zA-Z\s]*$/;

export const isEnglishLetter = (str) => {
    return str.trim() === '' || englishLetterPatern.test(str);
}

export const setSelectedRowData = (option) => {
    let str = option.LocalizedName;
    str += ', ' + option.Country.LocalizedName;

    if(option.LocalizedName !== option.AdministrativeArea.LocalizedName) {
        str += ', ' + option.AdministrativeArea.LocalizedName;
    }

    return str;
}