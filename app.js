const navbar = document.querySelector("nav");
const menuIcon = document.getElementById("menu-bar");

menuIcon.onclick = () => { 
    menuIcon.classList.toggle("fa-times");
    navbar.classList.toggle("active");
}