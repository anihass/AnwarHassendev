import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import {adminAccessControl }from "./admin.js"
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
adminAccessControl();
async function loadProjects() {
    try {
        const response = await fetch("https://anwarhassendev.onrender.com/anwarhassendev/getproject", {
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
                    <img src="${project.Url}" alt="${project.title}" />
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <button class="delete-btn" data-id="${project._id}">Delete</button>                                  
                `;

                // Attach delete handler
                const deleteBtn = card.querySelector(".delete-btn");
                deleteBtn.addEventListener("click", async (e) => {
                    const projectId = e.target.getAttribute("data-id"); // get MongoDB _id
                    try {                       
                        const token = localStorage.getItem("token");

                        const delResponse = await fetch(`http://localhost:3000/anwarhassendev/deleteproject/${projectId}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`   // <-- include token
                        }
                        });
                        const delData = await delResponse.json();
                        if (delResponse.ok && delData.success) {
                            alert("Project deleted successfully");
                            loadProjects(); // reload list
                        } else {
                            alert(delData.message || "Failed to delete project");
                        }
                    } catch (error) {
                        console.error(error);
                        alert("Something went wrong while deleting project");
                    }
                });

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
