const express = require('express');
const cors = require("cors");
require("dotenv").config();
const dbConnection = require("./dbConnect");
const app = express();
const movieRoutes = require('./routes/movies');


dbConnection();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.use("/api",movieRoutes);
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})