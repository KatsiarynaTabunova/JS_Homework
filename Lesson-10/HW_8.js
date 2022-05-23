//1
function filterNumbersArr(numbers) {
  return numbers.filter(function (item) {
    return item > 0;
  });
}
console.log(filterNumbersArr([-1, 0, 2, 34, -2]));

//2
function findFirstPositiveNumber(arr) {
  return arr.find(function (item) {
    return item > 0;
  });
}
console.log(findFirstPositiveNumber([-1, 0, 2, 34, -2]));

//3
function isPalindrome(word) {
  var changingWord = word.split("").reverse().join("").toLowerCase();

  return word.toLowerCase() == changingWord;
}
console.log(isPalindrome("шалаШ"));
console.log(isPalindrome("привет"));

//4
function areAnagrams(word1, word2) {
  var a = word1.toLowerCase().split("").sort().join();
  var b = word2.toLowerCase().split("").sort().join();

  return a == b;
}
console.log(areAnagrams("кот", "Отк"));
console.log(areAnagrams("кот", "атк"));
console.log(areAnagrams("кот", "отко"));

//5
//1 способ
function divideArr(arr, lengthNewArrs) {
  newArr = [];
  for (var i = 0; i < arr.length; i += lengthNewArrs) {
    newArr.push(arr.slice(i, i + lengthNewArrs));
  }
  return newArr;
}
//2 способ
function divideArr(arr, lengthNewArrs) {
  var newArr = [];
  while (arr.length > 0) {
    newArr.push(arr.splice(0, lengthNewArrs));
  }
  return newArr;
}
console.log(divideArr([1, 2, 3, 4], 2));
console.log(divideArr([1, 2, 3, 4, 5, 6, 7, 8], 3));

//6
function isPossibleDegreeOfTwo(number) {
  while (number >= 2) {
    number = number / 2;
  }
  if (number === 1) {
    return true;
  } else {
    return false;
  }
}
console.log(isPossibleDegreeOfTwo(5));

/