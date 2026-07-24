const express = require('express');
const cors = require('cors');
const path = require("path");
const connectToDb = require('./backend/database/db');
const userRouters = require('./backend/router/router');
const imageRoutes = require("./backend/router/image");

const app = express();
const port = 3000;
app.use("/stylesheet", express.static(path.join(__dirname, "stylesheet")));
app.use("/script", express.static(path.join(__dirname, "script")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "about.html")));
app.get("/project", (req, res) => res.sendFile(path.join(__dirname, "project.html")));
app.get("/contact", (req, res) => res.sendFile(path.join(__dirname, "contact.html")));
app.get("/login", (req, res) => res.sendFile(path.join(__dirname, "login.html")));
app.get("/signup", (req, res) => res.sendFile(path.join(__dirname, "signup.html")));
app.get("/admin", (req, res) => res.sendFile(path.join(__dirname, "admin.html")));
app.get("/autherization", (req, res) => res.sendFile(path.join(__dirname, "autherization.html")));
app.get("/delete", (req, res) => res.sendFile(path.join(__dirname, "delete.html")));
app.get("/upload", (req, res) => res.sendFile(path.join(__dirname, "upload.html")));
app.use("/image", express.static(path.join(__dirname, "image")));


connectToDb();


app.use(cors());
app.use(express.json());

app.use('/anwarhassendev',userRouters);
app.use('/anwarhassendev',imageRoutes);



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});