var navBar = ["landing", "education", "skills"];
function navbarHighlight(){
  alert("Hello");
  document.getElementById("getHome").style.backgroundColor = "red";
  }

function navBarToggle(navbarName){
    var navbarItem = document.getElementById("navbar-"+navbarName);
    navbarItem.style.fontSize = "120%";
  }
