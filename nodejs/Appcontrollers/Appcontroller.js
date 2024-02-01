const Citymodel = require("../Appmodels/model");
const Namemodel=require("../Appmodels/model");
module.exports.Getname=async(request,response)=>{
  let {firstname}=request.params;
  let result=await Namemodel.find({first_name:firstname});
  response.send(result);
  

}
module.exports.Getcitydetails=async(request,response)=>{
  //const {cityid}=request.params;
  const result=await Citymodel.find();
  response.send(result);

}
