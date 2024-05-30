const englishLetterPatern = /^[a-zA-Z]+$/;

export const isEnglishLetter = (str) => {
    return str.trim() === '' || englishLetterPatern.test(str);
}