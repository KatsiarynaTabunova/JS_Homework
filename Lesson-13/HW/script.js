var inp = document.getElementsByTagName('input');
var btn = document.getElementsByTagName('button');

btn[0].disabled = true;
for (var i = 0; i < inp.length; i++) {
    inp[i].addEventListener('keyup', function (event) {
        var disabled = false;

        for (var i = 0; i < inp.length; i++) {
            if (inp[i].value.length == 0) {
                disabled = true;
            }
        }
        btn[0].disabled = disabled;
    });
}

var currentTable;
var j = 0;

btn[0].addEventListener('click', function (event) {
    var error = false;

    for (var i = 0; i < inp.length; i++) {
        var number = inp[i].value;
        var isValid =
            !isNaN(number) && number % 1 === 0 && number > 0 && number <= 10;

        if (!isValid) {
            inp[i].value = '';
            error = true;
        }
    }
    if (error == true) {
        alert('Внимание! Введены неккоректные данные!');
    }

    var x = inp[0].value;
    var y = inp[1].value;

    createTable(x, y, 0);
});

function createTable(colms, rows) {
    if (currentTable != undefined) {
        currentTable.remove();
    }
    var table = document.createElement('table');
    var tBody = document.createElement('tbody');

    document.body.appendChild(table);
    table.appendChild(tBody);
    table.classList.add('table');

    for (var i = 1; i <= rows; i++) {
        var tr = document.createElement('tr');

        for (var k = 1; k <= colms; k++) {
            var td = document.createElement('td');
            tBody.appendChild(tr);
            tr.appendChild(td);

            td.classList.add('td');

            if ((i + k + j) % 2 == 0) {
                td.style.backgroundColor = 'black';
            }
        }
    }
    table.addEventListener('click', function () {
        j++;
        createTable(colms, rows);
    });
    currentTable = table;
}
