const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const Approuter=require("./Approuters/Approuter");
const PORT=3030;
const URL="mongodb://localhost:27017/Restaurent";
 app.use("/api",Approuter);
mongoose.connect(URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("Database Connected Succesfully");
        console.log("Server Is Running under the port",PORT);})
}).catch(()=>{
    console.log("Database Not connnected");
});
