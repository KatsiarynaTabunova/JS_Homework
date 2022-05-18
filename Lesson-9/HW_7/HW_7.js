// Функциональный стиль ООП

function Animal(name) {
  var name = name;
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
    return (
      "Насыпаем в миску " + self.dailyNorm() + " корма коту " + name + ". "
    );
  };
}

function Cat(name) {
  Animal.apply(this, arguments);

  this.catPleased = function () {
    return "Кот доволен ^_^";
  };

  var animalFeed = this.feed;

  this.feed = function () {
    console.log(animalFeed() + this.catPleased());
    return this;
  };

  this.stroke = function () {
    console.log("Гладим кота " + name + ".");
    return this;
  };
}

var cat = new Cat("Tom");
cat.dailyNorm(60);
cat.feed().stroke();

// Прототипный стиль ООП

function Animal(name) {
  this._name = name;
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
  return (
    "Насыпаем в миску " + this.dailyNorm() + " корма коту " + this._name + "у. "
  );
};

function Cat(name) {
  Animal.apply(this, arguments);
}

Cat.prototype = Object.create(Animal.prototype);
Cat.prototype.constructor = Cat;

Cat.prototype.catPleased = function () {
  return "Кот доволен ^_^";
};

Cat.prototype.feed = function () {
  console.log(Animal.prototype.feed.apply(this) + this.catPleased());
  return this;
};

Cat.prototype.stroke = function () {
  console.log("Гладим кота " + this._name + "a.");
  return this;
};

var cat = new Cat("Tom");

cat.dailyNorm(60);
cat.feed().stroke();
