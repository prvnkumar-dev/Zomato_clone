const mongoose=require("mongoose");
const schema=mongoose.Schema;
const MenuItemSchema=new schema({
    
name:{type:String},
description:{type:String},
ingredients:{type:String},
images:{type:String},
quantity:{type:Number},
price:{type:Number},
restaurentId:{type:String}
});
const MenuItemModel=mongoose.model("menuItem",MenuItemSchema,"menu_items");
module.exports=MenuItemModel;