const mongoose=require("mongoose");
const schema=mongoose.Schema;
const RestaurentSChema=new schema({
    name :{type:String},
    city_name :{type:String},
    city:{type:Number},
    area:{type:Number},
    locality :{type:String},
    cost:{type:Number},
    address:{type:String},
    type:[{
        mealtype:{type:Number},
        name:{type:String}
    }],
    Cuisine:[{
        cuisine:{type:Number},
        name:{type:String}
    }]

});
const RestaurentModel=mongoose.model("Restaurent",RestaurentSChema,"citydetails");
module.exports=RestaurentModel;