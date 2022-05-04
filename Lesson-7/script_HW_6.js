//2
function Cat() {
  var foodAmount = 50;
  //просто через функцию не работает. Только через объявление переменной.
  var formatFoodAmount = function formatFoodAmount() {
    return foodAmount + " гр.";
  };
  this.feed = function () {
    return "Насыпаем в миску " + formatFoodAmount() + " корма.";
  };
}
var cat = new Cat();
console.log(cat.feed());

//3
function Cat() {
  var foodAmount = 50;
  this.dailyNorm = function (food) {
    if (!arguments.length) return formatFoodAmount();

    if (food < 50) {
      throw new Error("Значение должно быть больше 50");
    }
    if (food > 100) {
      throw new Error("Слишком большое значение");
    }
    foodAmount = food;
  };
  //просто через функцию не работает. Только через объявление переменной.
  var formatFoodAmount = function formatFoodAmount() {
    return foodAmount + " гр.";
  };
  this.feed = function () {
    return "Насыпаем в миску " + this.dailyNorm() + " корма.";
  };
}
var cat = new Cat();
cat.dailyNorm(80);
console.log(cat.feed());
