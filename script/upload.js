import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import {adminAccessControl }from "../script/admin.js"
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
adminAccessControl();
const form = document.getElementById("projectForm");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

// Image Preview
imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
        preview.style.display = "block";
    }
});
// Form Submit
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    try {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const image = imageInput.files[0];

        const formData = new FormData();

        // These names MUST match what your backend expects
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        // If you're using JWT authentication
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in as admin to upload a project.");
            return;
        }
        
        const response = await fetch(
            "http://localhost:3000/anwarhassendev/upload",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            }
        );        
        const data = await response.json();
        if (response.ok) {
            alert("Project uploaded successfully!");
            console.log(data);
            form.reset();
            preview.src = "";
            preview.style.display = "none";
        } else {
            alert(data.message || "Upload failed");
        }

    } catch (error) {
        console.error(error);

        alert("Something went wrong");
    }
});