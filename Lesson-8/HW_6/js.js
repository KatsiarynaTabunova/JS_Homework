toggleMenu();

window.addEventListener("resize", function (event) {
  toggleMenu();
});

function showDropdownMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function toggleMenu() {
  var dropbtn = document.getElementById("dropbtn");
  var logo = document.getElementById("logo_header");

  if (window.innerWidth <= 500) {
    dropbtn.hidden = false;
    logo.hidden = true;
    document.getElementById("myDropdown").classList.add("dropdown_content");
  } else {
    dropbtn.hidden = true;
    logo.hidden = false;
    document.getElementById("myDropdown").classList.remove("dropdown_content");
  }
}
