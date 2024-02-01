const mongoose=require("mongoose");
const schema=mongoose.Schema;
const Nameschema=new schema({
    
first_name:{type:String},
last_name:{type:String},
email:{type:String},
Gender:{type:String}

});
const Cityschema=new schema({
    _id :{type:Number},
    name :{type:String},
    city_name :{type:String},
    city:{type:Number},
    area:{type:Number},
    locality :{type:String},
    cost:{type:Number},
    address:{type:String},
    type:{type:String},
    Cuisine:{type:String},
});
const Namemodel=mongoose.model("name",Nameschema,"restaurentMeals");
 const Citymodel=mongoose.model("city",Cityschema,"citydetails");
module.exports=Namemodel;
module.exports=Citymodel;
