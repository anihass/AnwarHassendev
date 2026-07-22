import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
export function adminAccessControl() {
  const adminBtn = document.querySelector(".admin-btn");

  adminBtn.addEventListener("click", (e) => {
    e.preventDefault(); // stop default navigation

    const token = localStorage.getItem("token");
    let role = null;

    if (token) {
      const decoded = parseJwt(token); // helper to decode JWT
      role = decoded?.role;
    }

    if (role === "admin") {
      // allow navigation
      window.location.href = "admin.html";
    } else {
      // block and alert
      alert("You have to be an admin to access this page");
    }
  });
}

// helper to decode JWT payload
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}
