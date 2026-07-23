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
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});
connectToDb();


app.use(cors());
app.use(express.json());

app.use('/anwarhassendev',userRouters);
app.use('/anwarhassendev',imageRoutes);



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});