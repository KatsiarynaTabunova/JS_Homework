"use strict";

var a = 3;
var b = 5;
//1 способ (сложения-вычитание):
a = a + b;
b = a - b; //a=8,b=3
a = a - b;
console.log(a, b);

//2 способ (вычитания-сложение):
a = a - b;
b = a + b; //a=-2,b=3
a = -a + b;
console.log(a, b);

//3 способ (умножения-деления):
a = a * b;
b = a / b; //a=15, b=3
a = a / b;
console.log(a, b);

//4 способ (3-яя переменная):
var c;
c = a; //c=3,
a = b; //a=5,b=5
b = c; //c=3,b=3
console.log(a, b);
