const MenuItemModel=require("../Appmodels/MenuItemsModel");
module.exports.GetMenuItemsByRestaurentId=async(request,response)=>{
    const {restId}=request.params;
    const MenuItemResult=await MenuItemModel.find({restaurentId:restId});
    response.send({
        MenuItemResult
    });
};
