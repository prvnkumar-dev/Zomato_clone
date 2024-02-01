const mongoose=require('mongoose');
const schema=mongoose.Schema;
const LocationSchema=new schema({
    
name:{type:String},
city_id:{type:Number},
location_id:{type:Number},
city:{type:String},
country_name:{type:String}
});
const LocationModel=mongoose.model("Location",LocationSchema,"Locations");
module.exports=LocationModel;