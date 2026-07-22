import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import {adminAccessControl }from "../script/admin.js"
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
adminAccessControl();


// Fetch and display projects
async function loadProjects() {
    try {
        const response = await fetch("http://localhost:3000/anwarhassendev/getproject", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok && data.success) {
            const projectsContainer = document.getElementById("projectsContainer");
            projectsContainer.innerHTML = ""; // clear old content

            data.data.forEach(project => {
                const card = document.createElement("div");
                card.classList.add("project-card");

                card.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>              
                    <img src="${project.Url}" alt="${project.title}" />                                                          
                `;

                projectsContainer.appendChild(card);
            });
        } else {
            alert(data.message || "Failed to fetch projects");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong while fetching projects");
    }
}
document.addEventListener("DOMContentLoaded", loadProjects);
