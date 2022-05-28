var table = document.createElement("table"),
  tbody = document.createElement("tbody");

document.body.appendChild(table);
table.appendChild(tbody);

var currentTablerow;

var button = createTableRows(1, 1);
button.cells[0].innerText = "Добавить";
button.cells[0].colSpan = 3;

button.addEventListener("click", function () {
  createTableRows(3, 1);
});

createTableRows(3, 1);
createTableRows(3, 1);
createTableRows(3, 1);

function createTableRows(cols, rows) {
  for (var i = 0; i < rows; i++) {
    var tr = document.createElement("tr");

    for (var k = 0; k < cols; k++) {
      var td = document.createElement("td");

      tr.appendChild(td);

      var input = document.createElement("input");
      input.type = "text";

      td.appendChild(input);

      td.style.cssText =
        "border: 1px solid black; height: 40px; width: 250px; padding: 10px; text-align: center; font-size: 30px";
      input.style.cssText = "border: none; height: 30px; width: 200px";
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

table.style.borderCollapse = "collapse";

// table.addEventListener("click", function (event) {
//   console.log(event.target);
//   console.log(focus());
//   // event.target.firstChild.focus();
//   event.target = input.focus();
// });
