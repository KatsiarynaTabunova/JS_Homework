// Функциональный стиль ООП

function Animal() {
  var foodAmount = 50;
  var self = this;

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

  function formatFoodAmount() {
    return foodAmount + " гр.";
  }

  self.feed = function () {
    return "Насыпаем в миску " + self.dailyNorm() + " корма. ";
  };
}

function Cat() {
  Animal.call(this);

  this.catPleased = function () {
    return "Кот доволен ^_^";
  };

  var animalFeed = this.feed;

  this.feed = function () {
    console.log(animalFeed() + this.catPleased());
    return this;
  };

  this.stroke = function () {
    console.log("Гладим кота.");
    return this;
  };
}

var tom = new Cat();
tom.dailyNorm(60);
tom.feed().stroke();

// Прототипный стиль ООП

function Animal() {
  this._foodAmount = 50;
}

Animal.prototype._formatFoodAmount = function () {
  return this._foodAmount + " гр.";
};

Animal.prototype.dailyNorm = function (food) {
  if (!arguments.length) return this._formatFoodAmount();

  if (food < 50) {
    throw new Error("Значение должно быть больше 50");
  }

  if (food > 100) {
    throw new Error("Слишком большое значение");
  }

  this._foodAmount = food;
};

Animal.prototype.feed = function () {
  return "Насыпаем в миску " + this.dailyNorm() + " корма. ";
};

function Cat() {
  Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.catPleased = function () {
  return "Кот доволен ^_^";
};

Cat.prototype.feed = function () {
  return Animal.prototype.feed.apply(this) + this.catPleased();
};

Cat.prototype.stroke = function () {
  return "Гладим кота.";
};

var tom = new Cat();

tom.dailyNorm(60);
console.log(tom.feed());
console.log(tom.stroke());
