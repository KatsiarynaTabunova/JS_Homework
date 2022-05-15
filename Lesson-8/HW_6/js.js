var dropbtn = document.getElementById("dropbtn");
var logo = document.getElementById("logo_header");

if (window.innerWidth <= 500) {
  dropbtn.hidden = false;
  logo.hidden = true;
} else {
  dropbtn.hidden = true;
  logo.hidden = false;
}

window.addEventListener("resize", function (event) {
  var newWidth = window.innerWidth;

  newWidth > 500 ? (dropbtn.hidden = true) : (dropbtn.hidden = false);
  newWidth > 500 ? (logo.hidden = false) : (logo.hidden = true);
});

function showDrobdownMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
  console.log("csdvsfvs");
}
