const mongoose=require("mongoose");
const schema=mongoose.Schema;
const UserSchema=new schema({
    Name:{type:String},
    password:{type:String},
    email:{type:String},
    Phone:{type:String},
    address:{type:String}
});
const UserModel=mongoose.model("user",UserSchema,"users");
module.exports=UserModel;