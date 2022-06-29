{
  //1
  let { a, b, ...rest } = { a: 1, b: 2, c: 3, d: 4 };
  const obj = rest;
  console.log(a, b, obj);
}
{
  //2 (1 способ)
  let personName = prompt("Введите Ваше имя!");
  const obj = {
    personName,
    sayHi() {
      return `Hi, ${this.name}!`;
    },
  };
  console.log(obj.sayHi());
}
{
  //2 (2 способ)
  let personName = prompt("Введите Ваше имя!");
  const createObj = (name) => {
    return {
      name,
      sayHi() {
        return `Hi, ${this.name}!`;
      },
    };
  };
  const obj = createObj(personName);
  console.log(obj.sayHi());
}
{
  //3
  function doCalculation({ x, y, z = 1 }) {
    return x ** y * z;
  }

  console.log(doCalculation({ a: 2, b: 3 }));
}

{
  //4
  let arr = ["Kate", 18];

  function greeting(name, age) {
    return `"Hello, I'm (${name}) and I'm (${age}) years old.`;
  }

  console.log(greeting(...arr));
}
{
  //5
  function getNumbers(...numbersArr) {
    for (let number of numbersArr) {
      console.log(number);
    }
  }

  getNumbers(1, 2, 3);
}
{
  //6
  function countVowelLetters(text) {
    const vowelLetters = [
      "а",
      "я",
      "ы",
      "и",
      "о",
      "ё",
      "у",
      "ю",
      "э",
      "е",
      "a",
      "e",
      "i",
      "o",
      "u",
      "y",
    ];
    [...text.toLowerCase()].filter((element) => vowelLetters.includes(element))
      .length;
  }

  console.log(countVowelLetters("Шла Саша по шоссе И сосала сУшку")); // 12
}
{
  //7
  function findUsers(arr) {
    return {
      "Пользователи младше 40": arr.filter((user) => user.age < 40),
      "Пользователь с именем Федор": arr.find((user) =>
        user.name.startsWith("Fedor")
      ),
    };
  }

  console.log(
    findUsers([
      { name: "Vasya Pupkin", age: 25 },
      { name: "Ivan Petrov", age: 30 },
      { name: "Fedor Ivanov", age: 42 },
    ])
  );
}
{
  //8
  function getArrObjs(arr) {
    return arr.map((name) => ({ [`Пользователь ${++i}`]: name }));
  }

  console.log(getArrObjs(["Kate", "Olga", "Alex"]));
}
{
  //9
  function mergeObjects(arr) {
    return arr.reduce((acc, item) => Object.assign({}, acc, item));
  }

  console.log(
    mergeObjects([
      { name: "Vasya" },
      { name: "Piotr", age: 25 },
      { salary: "2000$" },
    ])
  );
}
{
  //10
  class Animal {
    constructor(name) {
      this.name = name;
      this._foodAmount = 50;
    }

    _formatFoodAmount() {
      return `${this._foodAmount} гр.`;
    }

    dailyNorm(amount) {
      if (!arguments.length) return this._formatFoodAmount();

      if (amount < 30 || amount > 100) {
        return "Недопустимое количество корма.";
      }

      this._foodAmount = amount;
    }

    feed() {
      console.log(`Насыпаем в миску ${this.dailyNorm()} корма.`);
    }
  }

  class Cat extends Animal {
    feed() {
      super.feed();
      console.log("Кот доволен ^_^");
      return this;
    }

    stroke() {
      console.log("Гладим кота.");
      return this;
    }
  }

  const barsik = new Cat("Барсик");
  barsik.feed().stroke();
}
{
  //11
  function createPromise(number1, number2) {
    return new Promise((resolve, reject) => {
      if (Number.isInteger(number1) && Number.isInteger(number2)) {
        let currentNumber = number1;

        if (currentNumber > number2) {
          [currentNumber, number2] = [number2, number1];
        }

        setTimeout(function printNumber() {
          if (currentNumber !== number2) {
            console.log(`${currentNumber++}`);
            if (currentNumber <= number2) {
              setTimeout(printNumber, 1000);
            }
          } else {
            resolve(currentNumber);
          }
        }, 1000);
      } else {
        reject("Ввели неккоректное число");
      }
    });
  }

  createPromise(6, 4)
    .then((currentNumber) => {
      console.log(`Результат: ${currentNumber}`);
    })
    .catch((error) => console.log(`Возникла ошибка: ${error}!`))
    .finally(() => console.log("Работа функции-промиса завершена."));
}
