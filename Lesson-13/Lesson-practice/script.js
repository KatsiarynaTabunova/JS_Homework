//1
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
    var link = event.target;

    if (link.tagName == 'A') {
        event.preventDefault();

        if (localStorage.getItem(link.innerHTML) == null) {
            localStorage.setItem(
                link.innerHTML,
                JSON.stringify({ path: link.href })
            );

            link.href = '#';
            alert('Cсылка была сохранена!');
        } else {
            alert(JSON.parse(localStorage.getItem(link.innerHTML)).path);
        }
    }
};
localStorage.clear();

//2

function runRequest(url) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    xhr.send();

    xhr.onload = function () {
        var statusType = Math.round(this.status / 100);

        try {
            console.log(this.status);
            var result = JSON.parse(this.response).data;

            console.log(result);
        } catch (error) {
            console.log('возникло исключение!');
            console.log('тип исключения:' + error.name);
            console.log('текст исключения:' + error.message);
        }
    };

    xhr.onerror = function (error) {
        console.error(this.status);
    };

    xhr.onloadend = function () {
        console.log('Запрос завершен');
    };
}

runRequest('https://reqres.in/api/users?page=2');

runRequest('https://reqres.in/api2/users?page=2');

runRequest('https://reqres2.in/api2/users?page=2');
