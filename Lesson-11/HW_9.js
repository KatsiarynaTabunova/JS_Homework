//1
function getArrObjs(arr) {
  return arr.map(function (firstName) {
    var newObjs = {};

    newObjs.name = firstName;
    return newObjs;
  });
}
console.log(getArrObjs(["Vasya", "Kate", "Sasha"]));

//2
function getTimeNow(arr) {
  return arr.reduce(function (initialValue, currentNumber) {
    return initialValue + " : " + currentNumber;
  }, "Текущее время");
}
console.log(getTimeNow(["00", "13", "24"]));

//3
function getNumberOfVowels(text) {
  var counter = 0;
  var arr = text.toLowerCase().split("");
  var arrVowels = ["а", "у", "о", "и", "э", "ы", "я", "ю", "е", "ё"];

  for (var i = 0; i < arr.length; i++) {
    if (arrVowels.indexOf(arr[i]) >= 0) {
      counter += 1;
    }
  }
  return counter;
}
console.log(getNumberOfVowels("Во двОре растЕт трава"));

//4
function countSentencesLetters(text) {
  var result = text.split(/[.?!]/).filter(function (element) {
    return element != "";
  });

  return result.map(function (element) {
    return (
      element.trim() +
      ": Letters quantity is: " +
      element.replace(",", "").replace(/ /g, "").length
    );
  });
}
console.log(
  countSentencesLetters("Привет, студент! Студент... Как дела, студент?")
);

//5*
function countMaxNumberRepeat(text) {
  var counter = {};
  var maxNumber = 1;
  var maxKey = 0;

  var arr = text
    .toLowerCase()
    .split(/[,.?!' ']/)
    .filter(function (element) {
      return element != "";
    });

  arr.forEach(function (word) {
    if (counter[word] != undefined) {
      counter[word] += 1;
    } else {
      counter[word] = 1;
    }
  });
  for (var key in counter) {
    if (counter[key] > maxNumber) {
      maxNumber = counter[key];
      maxKey = key;
    }
  }
  return maxKey + " - " + maxNumber;
}

console.log(
  countMaxNumberRepeat("Привет, студент! Студент... Как дела, студент?")
);
