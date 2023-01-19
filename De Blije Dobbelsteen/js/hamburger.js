//hamburger menu
function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
    x.style.display = "none";
    } else {
    x.style.display = "block";
    }
}
// Inklappen hamburgermenu
var hamburgerMenu = document.getElementById("myLinks");
document.body.addEventListener("click",function(event) {
    if (hamburgerMenu.style.display === 'block' && event.target.id != "hbmenu") {
        hamburgerMenu.style.display = 'none'; 
    }
});