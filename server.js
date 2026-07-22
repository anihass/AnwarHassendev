const express = require('express');
const cors = require('cors');
const connectToDb = require('./backend/database/db');
const userRouters = require('./backend/router/router');
const imageRoutes = require("./backend/router/image");
const port = 3000;
connectToDb();


const app = express();
app.use(cors());
app.use(express.json());

app.use('/anwarhassendev',userRouters);
app.use('/anwarhassendev',imageRoutes);



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});