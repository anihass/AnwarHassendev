import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
import {adminAccessControl }from "../script/admin.js"
import { logoutHandler } from "./logout.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();
logoutHandler();
adminAccessControl();
