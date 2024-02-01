const UserModel=require("../Appmodels/UserModel");
const jwt=require("jsonwebtoken");
const TOKENKEY="PRAVEEN7979";
module.exports.createUseraccount=async(request,response)=>{
    let Bodydata=request.body;
      let Userexist=await UserModel.find({email:Bodydata.email});
    if(Userexist.length >0){
        response.send({
            status:false,
            messege:"User already Exist"
        });
    }
    else{
    let NewUser=new UserModel({
        Name:Bodydata.Name,
        password:Bodydata.password,
        email:Bodydata.email,
        Phone:Bodydata.Phone,
        address:Bodydata.address
    });
    let UserResult=await NewUser.save();
    if(UserResult){
        response.send({
            status:true,
            messege:"You have been Registered Successfully"
        });
    }
    else{
        response.send({
            status:false,
            messege:"You Registration was Failed"
        });
    }
}
};
module.exports.userLogin=async (request,response)=>{
   let Bodydata=request.body;
   let UserLoginresult=await UserModel.findOne({
    email:Bodydata.email,
    password:Bodydata.password
   },{
    password:0,
    __v:0
   });
   if(UserLoginresult){
    let result={
        Name:UserLoginresult.Name,
        email:UserLoginresult.email,
        Phone:UserLoginresult.Phone

    };
    let Token=jwt.sign(result,TOKENKEY,{expiresIn:"24h"});
    response.send({
        status:true,
        messege:"Login succesfull",
        result
    });
   }
   else{
    response.send({
        status:false,
        messege:"Username Or Password error"
    });
   }
};