const LocationModel=require("../Appmodels/LocationModel");
module.exports.GetLocationList=async (request,response)=>{
    const LocationResult=await LocationModel.find();
    response.send({
        LocationResult
    });

};