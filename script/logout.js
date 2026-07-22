export function logoutHandler() {
    const logoutBtn = document.querySelector(".logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token");
            alert("You have logged out!");
            window.location.href = "home.html"; // redirect back to login page
        });
    }
}
