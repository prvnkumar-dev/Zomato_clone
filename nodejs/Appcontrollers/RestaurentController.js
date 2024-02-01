const RestaurentModel=require("../Appmodels/RestaurentModel");
const MealTypeModel=require("../Appmodels/MealtypeModel");
module.exports.GetRestaurentListByLocationId=async (request,response)=>{
    let {locId}=request.params;
    let RestaurentListResult=await RestaurentModel.find({city:locId},{name:1,city_name:1,locality:1});
    response.send({
        RestaurentListResult
    });

};
module.exports.GetRestaurentDetailsById=async(request,response)=>{
    let {restId}=request.params;
    let RestaurentDetailResult=await RestaurentModel.findById(restId);
    response.send({
        RestaurentDetailResult
    });
};
module.exports.GetMealTypeList=async (request,response)=>{
    let MealTypeResult=await MealTypeModel.find();
    response.send({
        MealTypeResult
    });

};
module.exports.Filter=async (request,response)=>{
    let {mealtype,city_id,Sort,Cuisine,pageNumber,number1,number2}=request.body;
    Sort=Sort ===undefined ? 1 : Sort;
    let filter={};
    if(city_id !==undefined) filter["city"]=city_id;
    // if(cost !==undefined) filter["cost"]={$lte:cost};
    if(mealtype!==undefined) filter["type.mealtype"]=mealtype;
    if(Cuisine !==undefined) filter["Cuisine.cuisine"]=Cuisine;
    if(number2 ==undefined){
        if(number1==500){
            filter["cost"]={$lte:number1}
        }
        if(number1==2000){
            filter["cost"]={$gte:number1}
        }
    }
    else{
        if(number1==500 && number2==1000){
            filter["cost"]={$gte:number1,$lte:number2}
        }
        if(number1==1000 && number2==1500){
            filter["cost"]={$gte:number1,$lte:number2}
        }
        if(number1==1500 && number2==2000){
            filter["cost"]={$gte:number1,$lte:number2}
        }

    }
    let FilterResult=await RestaurentModel.find(filter,{
        name :1,
        city_name :1,
        city:1,
        area:1,
        locality :1,
        cost:1,
        address:1,
        Cuisine:1,
        type:1
    }).sort({cost:Number(Sort)});
    let PageContent=2;
    let LastIndex=Number(pageNumber)* PageContent;
    let FirstIndex=LastIndex-PageContent;
    let Pagedetails=FilterResult.slice(FirstIndex,LastIndex);
    let PageResult=Math.ceil(FilterResult.length/PageContent);
    let PageArray=[];
    for(let i=1;i<=PageResult;i++){
      PageArray.push(i)
    }
    response.send({
        status:true,
        number1,
        Pagedetails,
       page:PageArray,
       Length:Pagedetails.length
       
        
    });

};
module.exports.PractiseSort=async (req,res)=>{
    let result=await RestaurentModel.find().sort({cost:-1})
    res.send({
        result
    })
}
