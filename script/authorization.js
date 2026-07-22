import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import {adminAccessControl }from "../script/admin.js"
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
adminAccessControl();
async function loadUsers() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://localhost:3000/anwarhassendev/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  if (response.ok && data.success) {
    const usersContainer = document.getElementById("usersContainer");
    usersContainer.innerHTML = "";

    data.data.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("user-card");

      card.innerHTML = `
        <div class="user-header">
            <div class="user-icon">
            <i class="fa-solid fa-user"></i>
            </div>
            <h3 class="user-name">${user.userName}</h3>
        </div>
        <div class="user-info">
            <p>Email: ${user.email}</p>
            <p>Role: ${user.role}</p>
        </div>
        <div class="user-actions">
            <button class="make-admin" data-id="${user._id}">Make Admin</button>
            <button class="keep-user" data-id="${user._id}">Keep as User</button>
            <button class="delete-user" data-id="${user._id}">Delete User</button>
        </div>
        `;

      // Make Admin
      card.querySelector(".make-admin").addEventListener("click", async (e) => {
        const userId = e.target.getAttribute("data-id");
        await updateUserRole(userId, "admin");
      });

      // Keep as User
      card.querySelector(".keep-user").addEventListener("click", async (e) => {
        const userId = e.target.getAttribute("data-id");
        await updateUserRole(userId, "user");
      });

      // Delete User
      card.querySelector(".delete-user").addEventListener("click", async (e) => {
        const userId = e.target.getAttribute("data-id");
        await deleteUser(userId);
      });

      usersContainer.appendChild(card);
    });
  } else {
    alert(data.message || "Failed to fetch users");
  }
}

async function updateUserRole(userId, role) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/anwarhassendev/users/${userId}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ role })
  });

  const data = await response.json();
  alert(data.message);
  loadUsers(); // reload list
}

async function deleteUser(userId) {
  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/anwarhassendev/users/${userId}/delete`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  const data = await response.json();
  alert(data.message);
  loadUsers(); // reload list
}

document.addEventListener("DOMContentLoaded", loadUsers);
