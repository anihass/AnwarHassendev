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
const messageBox =document.getElementById("message");

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    const email = document.getElementById("email").value;
    try{
        const response = await fetch("http://localhost:3000/anwarhassendev/signUp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userName,
            email,
            password
        })
    });
    const data = await response.json();        
        if (data.success) {                        
            alert("account created successfuly!"); 
            form.reset();                      
        } else {          
            alert("unable to creat account");
        }
    }catch(e){
         alert("Network error. Please try again.");
        console.error(e);
    }
});