export function creatHeader(){
    const header = 
            `<div class="logo">
                Anwar<span>Hassen</span>
            </div>

           <div class="nav-links">
                <a href="#" class="btn home-btn active">Home</a>
                <a href="#" class="btn about-btn ">About</a>
                <a href="#" class="btn skills-btn ">Skills</a>
                <a href="#" class="btn project-btn ">Projects</a>
                <a href="#" class="btn contact-btn ">Contact</a>
                <a href="#" class="btn login-btn ">Login</a>  
                <a href="#" class="btn signin-btn">Sign in</a>  
                <a href="#" class="btn admin-btn ">Admin</a>                                   
            </div>                                                      
            
            <button id="theme-toggle">
                <i class="fas fa-sun"></i>
            </button>
            <div class="menu-toggle">☰</div>`
        
            return header;
};

export function humbergurMenuEffect(){
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle('active');
    });
};
export function toggleeffect(){
    const toggle = document.getElementById("theme-toggle");
    const theme = document.getElementById("theme-style");
    const body = document.body;
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
}



