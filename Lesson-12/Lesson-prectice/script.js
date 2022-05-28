var container = document.getElementById("container");
var buttons = document.getElementsByTagName("button");

var firstPar = document.createElement("p"),
  secondPar = document.createElement("p");

firstPar.innerHTML =
  'Hello, here are <a href="https://www.facebook.com" >Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML =
  'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

console.log(buttons);

buttons[0].addEventListener("click", changeColor);

console.log(firstPar.children);

function changeColor() {
  for (var item of firstPar.children) {
    item.classList.toggle("changed");
  }
}

secondPar.onclick = function func(event) {
  event.preventDefault();
  alert(event.srcElement.href);
};
