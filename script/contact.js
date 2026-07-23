import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();

const form = document.querySelector(".contact-form");

form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const name = document.getElementById("name").value;    
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    try{
        const response = await fetch("http://localhost:3000/anwarhassendev/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            message
        })
        })
        const data = await response.json();        

        if (data.success) {                        
            alert("message sent succesfuly"); 
            form.reset();                      
        } else {          
            alert("Message not sent");
        }
    }catch(e){        
        alert("Network error. Please try again.");
        console.error(e);
    }
});