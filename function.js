function lengthSelect(wordLengthString, wordLengthValue) 
{
    WORD_LENGTH = wordLengthValue;
    sessionStorage.wordLength = wordLengthValue;
    sessionStorage.wordLengthString = wordLengthString;
    location.reload();
};