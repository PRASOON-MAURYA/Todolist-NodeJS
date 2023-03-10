const iconBurger = document.getElementById("iconBurger");
const iconCross = document.getElementById("iconCross");

const sideMenu = document.querySelector(".sideMenu");



iconBurger.addEventListener("click", function () {
  console.log(sideMenu)
    sideMenu.classList.toggle("active");
    // console.log("show")
  });
  
  iconCross.addEventListener("click", function () {
    sideMenu.classList.remove("active");
    // console.log("hide")
  });