const englishLetterPatern = /^[a-zA-Z\s]*$/;

export const isEnglishLetter = (str) => {
    return str.trim() === '' || englishLetterPatern.test(str);
}