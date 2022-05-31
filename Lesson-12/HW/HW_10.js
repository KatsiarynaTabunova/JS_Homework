var table = document.createElement('table'),
    tbody = document.createElement('tbody');

document.body.appendChild(table);
table.appendChild(tbody);

var currentTablerow;

var button = createTableRows(1, 1);
button.cells[0].innerText = '"Добавить"';
button.cells[0].colSpan = 3;

button.addEventListener('click', function () {
    createTableRows(3, 1);
});

createTableRows(3, 1);
createTableRows(3, 1);
createTableRows(3, 1);

function createTableRows(cols, rows) {
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        for (var k = 0; k < cols; k++) {
            var td = document.createElement('td');

            tr.appendChild(td);
            td.className = 'td';
        }
        if (currentTablerow == undefined) {
            tbody.appendChild(tr);
        } else {
            tbody.insertBefore(tr, currentTablerow);
        }
    }
    currentTablerow = tr;
    return tr;
}

table.style.borderCollapse = 'collapse';

var input = document.createElement('input');
input.type = 'text';
input.className = 'input';

table.addEventListener('click', function (event) {
    if (event.target != button.cells[0]) {
        var text = event.target.textContent;

        event.target.textContent = null;
        event.target.appendChild(input).focus();
        input.value = text;
    }
});

table.addEventListener('focusout', function (event) {
    event.target.parentElement.innerHTML = event.target.value;
    event.target.value = null;
});

//*
table.addEventListener('keyup', function (event) {
    if (event.keyCode == 13) {
        if (event.target != button.cells[0]) {
            var text = event.target.value;
            event.target.textContent = null;

            var perernt = event.target.parentElement;
            perernt.textContent = text;
        }
    }
});
