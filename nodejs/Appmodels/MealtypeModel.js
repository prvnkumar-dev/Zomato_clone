const mongoose=require("mongoose");
const schema=mongoose.Schema;
const MealTypeSchema=new schema({
    
name:{type:String},
content:{type:String},
image:{type:String},
mealtype:{type:Number}
});
const MealTypeModel=mongoose.model("mealType",MealTypeSchema,"meal_types");
module.exports=MealTypeModel;