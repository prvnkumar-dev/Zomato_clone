import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import FormModal from "./formModal";
import { useEffect, useState } from "react";
import axios from "axios";

const Search=()=>{
    let Navigate=useNavigate();
    let {mealtype_id,mealtype_name}=useParams();
    let [errorText,SeterrorText]=useState("");
    let [NoOfpage,SetNoOfpage]=useState([]);
    let [filterItems,SetFilterItems]=useState({
        mealtype:mealtype_id,
        pageNumber:1
    });
    let [Filterresult,SetFilterResult]=useState([]);
    // let [MealtypeRestaurent,SetMealtypeRestaurent]=useState([]);
    // useEffect(()=>{

    // })
    let [LocationList,SetlocationList]=useState([]);
    let  GetLocationDetails=async ()=>{
        let URL=`http://localhost:3030/api/Get-Location-List`;
        let {data}=await axios.get(URL);
        SetlocationList(data.LocationResult);
    }
    let Filterdata=async ()=>{
        let URL=`http://localhost:3030/api/filter`;
        let {data}=await axios.post(URL,{...filterItems});
        SetFilterResult(data.Pagedetails);
        SetNoOfpage(data.page)

        // NoOfpage.map((item)=>{
        //     console.log(item)
        // })
       if(data.Length===0){
        SeterrorText("Restaurent Not Matched To The Filters");
        
       }
       else{
        SeterrorText("")
       }
       
    }

    const FilterOptions=(type,event,num1,num2)=>{
        let {value}=event.target;
        switch(type){
            case "locDropdown":
                if(value===""){
                    delete filterItems.city_id;
                }
                else{
                    filterItems["city_id"]=value;
                }
                break
                case "PriceSort":
                    filterItems["Sort"]=value;
                    break
                case "checkCuisine":
                   
                    if(event.target.checked==true){
                        if(filterItems["Cuisine"] !==undefined){
                           let IncludeCheck=filterItems["Cuisine"].includes(Number(value));
                           if(IncludeCheck ==false){
                            filterItems["Cuisine"]=[...filterItems["Cuisine"],Number(value)]
                           }
                        }
                        else{
                            filterItems["Cuisine"]=[Number(value)];
                            
                        }
                    }
                    else{
                        
                        let RemoveCuisine=filterItems["Cuisine"].filter((item)=>{
                          return  Number(value) !==item;
                        })
                        if(RemoveCuisine.length>0){
                        filterItems["Cuisine"]=[...RemoveCuisine];
                        }
 
                        else{
                            delete filterItems.Cuisine;
                        }
                        
                        
                    }
                    
                    break
                    case "page":
                        console.log(value)
                        filterItems.pageNumber=Number(value)
                        break
                    case "priceCheck":
                        if(Number(num2) ===0){
                            filterItems["number1"]=Number(num1);
                            delete filterItems.number2;
                        }
                        else{
                        filterItems["number1"]=Number(num1);
                        filterItems["number2"]=Number(num2);
                        }
                        break
                    


        }
        SetFilterItems({...filterItems})
    }
    // let checkradio=(num1,num2)=>{
       
    //     // let res=Number(value)
    //     let arr=[];
    //      arr.push(num1,num2)
    //     // let result=res.map((item)=>item)
    //     console.log(arr)
    // }
    useEffect(()=>{
        GetLocationDetails();

    },[]);
    useEffect(()=>{
        Filterdata();
    },[filterItems])
    

    return(
        <>
        <section className="row">
            <section className="col-12">
                <Header/>
                <FormModal/>


    <p className="breakfast-para">{mealtype_name} Places NearBy Area</p>
    <section className="items-main">
        <section className="items-filters">
            <div className="filter-bold">Filters</div>
            <div className="filter-childbold">Select Location</div>
            <select name="" id="" className="filter-dropdown" onChange={(event)=>{
                FilterOptions("locDropdown",event)
            }}>
                <option value="">Select location</option>
                {
                    LocationList.map((location)=>{
                        return(
                            <option value={location.city_id}  key={location._id}>{location.name},{location.city}</option>
                        )
                    })
                }
            </select>
            <div className="filter-childbold">Cusine</div>
            <div className="filter-checkboxdiv">
                
               <div> <input type="checkbox" name="north" id="north" className="radio" value={1} onChange={(event)=>{FilterOptions("checkCuisine",event)}}/>
                <label htmlFor="north">North Indian</label></div>
                <div>  <input type="checkbox" name="north" id="south" value={2} onChange={(event)=>{FilterOptions("checkCuisine",event)}}/>
                <label htmlFor="south">South Indian</label></div>
                <div>  <input type="checkbox" name="north" id="chinese" value={3} onChange={(event)=>{FilterOptions("checkCuisine",event)}}/>
                <label htmlFor="chinese">Chinese</label></div>
                <div>   <input type="checkbox" name="north" id="fast" value={4} onChange={(event)=>{FilterOptions("checkCuisine",event)}}/>
                <label htmlFor="fast">Fast Food</label></div>
                <div>  <input type="checkbox" name="north" id="street" value={5} onChange={(event)=>{FilterOptions("checkCuisine",event)}}/>
                <label htmlFor="street">Street Food</label></div>
            </div>
            <div className="filter-childbold">
            Cost For Two</div>
            <div className="filter-radiodiv">
                <div><input type="radio" id="rad1" name="price" onChange={(event)=>{FilterOptions("priceCheck",event,500,0)}}/>
                <label htmlFor="rad1">Less Than '500</label></div>
                <div><input type="radio" id="rad2"  onChange={(event)=>{FilterOptions("priceCheck",event,500,1000)}} name="price"/>
                <label htmlFor="rad2">'500 to '1000</label></div>
                <div><input type="radio" id="rad3" name="price" onChange={(event)=>{FilterOptions("priceCheck",event,1000,1500)}}/>
                <label htmlFor="rad3">'1000 to '1500</label></div>
                <div><input type="radio" id="rad4" name="price" onChange={(event)=>{FilterOptions("priceCheck",event,1500,2000)}}/>
                <label htmlFor="rad4">'1500 to '2000</label></div>
                <div><input type="radio" id="rad5" name="price" onChange={(event)=>{FilterOptions("priceCheck",event,2000,0)}}/>
                <label htmlFor="rad5">'2000+ </label></div>
            </div>
            <div className="filter-bold">
                Sort </div>
                <div className="filter-radiodiv">
                    <div><input type="radio" id="low-high" name="prices" value="1" onChange={(event)=>FilterOptions("PriceSort",event)}/>
                    <label htmlFor="low-high">price Low to high</label></div>
                    <div><input type="radio" id="high-low" name="prices" value="-1" onChange={(event)=>FilterOptions("PriceSort",event)}/>
                    <label htmlFor="low-high">price high to low</label></div>
                </div>

        </section>
        <section className="item-box-main">
            {
                errorText  &&(
                <section className="errorRestaurent">
                <section className="error-image-container">
                    <img src="/images/error.png" alt="" />
                </section>
                <section className="messege-container">
                    <p>{errorText}</p>
                    <button onClick={()=>{
                        window.location.reload(true)
                    }}>REFRESH</button>
                </section>
            </section>)
            }
                {
                    Filterresult.map((val)=>{
                        return(
                            <section className="item-box1" key={val._id}  style={{cursor:"pointer"}} onClick={()=>{
                                Navigate(`/restaurent-page/${val._id}`)

                            }}>
                            <section className="box1-content1">
                             <section className="box1-content1-image"> <img src="/images/idly.png" alt=""/>
                             </section>
                             <section className="box1-content1-content">
                                 <h2 className="box1-content1-heading">{val.name}</h2>
                                     <p className="box1-content1-headchild">FORT</p>
                                     <p className="box1-content1-headchild2">{val.address}</p>
                             </section>
                            </section>
                            <section className="box1-content2 box2">
                             <div className="hrdiv m-2"></div>
                             <div className="box1-content2-detail bakery">CUSINES:<span>{
                                val.Cuisine.map((cuisine)=>{
                                    return(cuisine.name)
                                }).join(" , ")
                                }</span></div>
                             <div className="box1-content2-detail cost">COST FOR TWO:<span>${val.cost}</span></div>
                            </section>
                         </section>
                        )
                    })
                }
         
            <section className="nextpage-icons">
            <button>{"<"}</button>
                {
                    
                   NoOfpage.map((item,index)=>{
                    return(
                        <button className={`${item === filterItems.pageNumber ? "active" : ""}`} onClick={(event)=>FilterOptions("page",event)} value={item} key={index}>{item}</button>
                    )
                   })
                   
                }
                <button>{">"}</button>
            </section>

        </section>
       
        </section>
        </section>
        </section>
        </>
    );
};
export default Search;