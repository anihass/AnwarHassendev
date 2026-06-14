import { creatHeader,humbergurMenuEffect,toggleeffect } from "./header.js";
const header = creatHeader();
document.querySelector('.navbar').innerHTML = header;
humbergurMenuEffect();
toggleeffect();

