export function creatHeader(){
    const isLoggedIn = !!localStorage.getItem("token"); // check if token exists
    const currentPage = window.location.pathname.split("/").pop();
    return `
    <div class="logo">
      Anwar<span>Hassen</span>
    </div>

    <div class="nav-links">
      <a href="/" class="btn home-btn ${currentPage === "home" ? "active" : ""}">Home</a>
      <a href="/about" class="btn about-btn ${currentPage === "about" ? "active" : ""}">About</a>
      <a href="/project" class="btn project-btn ${currentPage === "project" ? "active" : ""}">Projects</a>
      <a href="/contact" class="btn contact-btn ${currentPage === "contact" ? "active" : ""}">Contact</a>
      ${isLoggedIn 
        ? `<a class="btn logout-btn">Logout</a>` 
        : `<a href="/login" class="btn login-btn ${currentPage === "login" ? "active" : ""}">Login</a>`}
      <a href="/signup" class="btn signin-btn ${currentPage === "signup" ? "active" : ""}">Sign Up</a>  
      <a href="/admin" class="btn admin-btn ${currentPage === "admin" ? "active" : ""}">
        <i class="fa-solid fa-user-tie "></i> 
      </a>                                   
    </div>                                                      
    
    <button id="theme-toggle">
      <i class="fas fa-sun"></i>
    </button>
    <div class="menu-toggle">☰</div>
  `;
}

export function humbergurMenuEffect(){
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle('active');
    });
}

export function toggleeffect(){
    const toggle = document.getElementById("theme-toggle");
    const theme = document.getElementById("theme-style");
    const body = document.body;

    // Apply saved theme on page load
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "day" && theme.getAttribute("href").includes("-night.css")) {
        theme.setAttribute("href", theme.getAttribute("href").replace("-night.css", "-day.css"));
        body.classList.remove("dark");
        toggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else if (savedTheme === "night" && theme.getAttribute("href").includes("-day.css")) {
        theme.setAttribute("href", theme.getAttribute("href").replace("-day.css", "-night.css"));
        body.classList.add("dark");
        toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle on click
    toggle.addEventListener("click", () => {
        let href = theme.getAttribute("href");

        if (href.includes("-night.css")) {
            theme.setAttribute("href", href.replace("-night.css", "-day.css"));
            body.classList.remove("dark");
            toggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem("theme", "day");
        } else if (href.includes("-day.css")) {
            theme.setAttribute("href", href.replace("-day.css", "-night.css"));
            body.classList.add("dark");
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", "night");
        }
    });
}
