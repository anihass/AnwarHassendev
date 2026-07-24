import { adminAccessControl } from "./admin.js";
import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import { logoutHandler } from "./logout.js";

// Render header
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
adminAccessControl();

const form = document.querySelector("form");
const messageBox = document.getElementById("message");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("https://anwarhassendev.onrender.com/anwarhassendev/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName, password })
        });

        const data = await response.json();
        messageBox.textContent = data.message;

        if (data.success) {
            // Save token
            localStorage.setItem("token", data.accesstoken);
            messageBox.style.color = "green";
            alert("Login successful!");
            window.location.href = "/home";             
        } else {
            messageBox.style.color = "red";
            alert("Login failed: " + data.message);
        }

    } catch (error) {
        messageBox.textContent = "Network error. Please try again.";
        messageBox.style.color = "red";
        alert("Network error. Please try again.");
        console.error(error);
    }
});
