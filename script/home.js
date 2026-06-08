const toggle = document.getElementById("theme-toggle");
const theme = document.getElementById("theme-style");
const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle('active');
});
toggle.addEventListener("click", () => {
    if(theme.getAttribute("href") === "stylesheet/home-night.css"){
        // Switch to day mode
        theme.setAttribute("href","stylesheet/home-day.css");
        body.classList.remove("dark");   // remove dark class
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        // Switch back to night mode
        theme.setAttribute("href","stylesheet/home-night.css");
        body.classList.add("dark");      // add dark class
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});