const mongoose = require("mongoose");

const dbConnection = () =>{
    const connectionParams = {useNewUrlParser:true};
    mongoose.connect(process.env.DBConnectionString, connectionParams);

    mongoose.connection.on('connected',()=>{
        console.log("Connected to database sucessfully");
    });

    mongoose.connection.on("error",(err)=>{
        console.log("Error while connection to database:"+ err)
    });

    mongoose.connection.on("desconnection", ()=>{
        console.log("Mongodb connection disconnected");
    })
}

module.exports = dbConnection;