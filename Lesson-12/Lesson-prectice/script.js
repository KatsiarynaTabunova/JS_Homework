var container = document.getElementById('container');
var buttons = document.getElementsByTagName('button');

var firstPar = document.createElement('p'),
    secondPar = document.createElement('p');

firstPar.innerHTML =
    'Hello, here are <a href="https://www.facebook.com" >Link 1</a> and <a href="https://twitter.com">Link 2</a>';
secondPar.innerHTML =
    'Hello, here are <a href="http://google.by">Link 3</a> and <a href="https://vk.com">Link 4</a>';

container.appendChild(firstPar);
container.appendChild(secondPar);

buttons[0].addEventListener('click', changeColor);

function changeColor() {
    for (var i = 0; i < firstPar.children.length; i++) {
        firstPar.children[i].classList.toggle('changed');
    }
}

secondPar.onclick = function func(event) {
    if (event.target.href != undefined) {
        event.preventDefault();
        alert(event.target.href);
    }
};
