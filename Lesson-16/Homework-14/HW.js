//1
/^[a-z]{3,10}_[a-z]{3,10}(-\d{4})?@([\da-z]{1,10}[\-\.]?[\da-z]{1,10}).com$/gi.test(
    'name_surname-1234@gmail.com'
);

//2
function checkPhoneNumber(number) {
    var result = +number.search(
        /(((\+?375-|8-0)(25|29|33|44|17))-[1-9]{1}[\d]{2}-[\d]{2}-[\d]{2})|(((\+?375|80)(25|29|33|55|17))[1-9]{1}[\d]{6})/
    );
    return result === 0;
}
console.log(checkPhoneNumber('+375-25-777-77-77'));

//3
//1 способ
function getNumberOfVowels(text) {
    var result = text.toLowerCase().match(/[аеёиоуыэюя]/g);

    return result.length;
}
console.log(getNumberOfVowels('Во двОре растЕт трава'));

//2 способ
function getNumberOfVowels(text) {
    var result = text.match(/[аеёиоуыэюяАЕЁИОУЫЭЮЯ]/g);

    return result.length;
}
console.log(getNumberOfVowels('Во двОре растЕт трава'));

//3 способ
function getNumberOfVowels(text) {
    var changedText = text.replace(/А|Е|Ё|И|О|У|Ы|Э|Ю|Я/gi, function (text) {
        return text.toLowerCase();
    });
    var result = changedText.match(/[аеёиоуыэюя]/g);

    return result.length;
}
console.log(getNumberOfVowels('Во двОре растЕт трава'));

//4 способ
function getNumberOfVowels(text) {
    var result = text
        .toLowerCase()
        .split(/[^аеёиоуыэюя]/)
        .filter(isNotEmpty);
    return result.length;
}
function isNotEmpty(element) {
    return element != '';
}
console.log(getNumberOfVowels('Во двОре растЕт трава'));
