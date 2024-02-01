import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormModal from "./formModal";
import LoginResult from "./loginresult";


const Home=()=>{
  let [MealType,SetMealType]=useState([]);
  let [LocationPlaceHolder,SetLocationPlaceHolder]=useState(["Click To Get Locations"]);
  let [LocationList,SetLocationList]=useState([]);
  let [RestaurentList,SetRestaurentList]=useState([]);
  let [loginres,SetLoginesult]=useState("");
  let Navigate=useNavigate();
  const GetMealTypeList=async ()=>{
    try {
      let URL=`http://localhost:3030/api//Get-meal-type-List`;
      let response=await fetch(URL);
      let data=await response.json();
      SetMealType(data.MealTypeResult);
      
    } catch (error) {
      console.log("server error");
      
    }
  
  }
//   let Filterdata=async ()=>{
//     let URL=`http://localhost:3030/api/filter`;
//     let {data}=await axios.post(URL,{mealtype:5});
//     // SetFilterResult(data.FilterResult);
//     console.log(data.FilterResult)
// }
  const GetLocationList=async ()=>{
    try {
      let URL=`http://localhost:3030/api/Get-Location-List`;
      let response=await fetch(URL);
      let data=await response.json();
      SetLocationList(data.LocationResult);
      SetLocationPlaceHolder("Here Is The Location List");

    } catch (error) {
      SetLocationPlaceHolder("Location Getting Failed");
    }
  }
  const GetRestaurentListByLocationId=async (id,name,city)=>{
    try {
      let URL=`http://localhost:3030/api/Get-restaurent-List-By-location-id/${id}`;
      let response=await fetch(URL);
      let data=await response.json();
      SetRestaurentList(data. RestaurentListResult);
      SetLocationPlaceHolder(`${name},${city}`);
      SetLocationList([]);

    } catch (error) {
      console.log(error);
    }


  }
  const getLoginresult=(res)=>{
    SetLoginesult(res);
    console.log(loginres)

  }
  useEffect(()=>{
    GetMealTypeList();
    // Filterdata();
  },[1]);
  return(
    <>
    
    <FormModal res={getLoginresult}/>
        
            <section className="row">
                {/*SECTION MAIN 1*/}
                <section className="col-lg-12 col-md-10 col-sm-12  main px-5 py-3 section1-main">
                 
                    {/* SECTION 1 NAVIGATION*/}
                    <section className="btn d-flex main-btn">
                          
                       { 
                       loginres ?(
                        <>
                      <div className="bg-light px-3 py-2 rounded-5 d-flex align-items-center ">
                      <p className="text-danger user-text m-0"><span className="fa-solid fa-user me-2"></span>{loginres.Name}</p>
                      </div>
                      </>)
                      :(<>
                     <button className="btn bg-none text-light " data-bs-toggle="modal" data-bs-target="#login">Login</button>
                        <button className="btn btn-outline-light c-account" data-bs-toggle="modal" data-bs-target="#create-account">Create an account</button>
                        
                    
                       </>)}</section>
                    {/* SECTION 2 LOGO*/}
                    <section className="d-flex justify-content-center align-items-center">
                        <div className=" main-logo-div bg-light text-danger h1 ">e!</div>
                    </section>
                    {/* SECTION 3 TEXT*/}
                    <section className="sec-3-text d-flex justify-content-center align-items-center mt-3">
                        <p className="text-light fs-2 ">Find the best restaurents,cafes,and bars</p>
                    </section>
                    {/* SECTION 4 SEARCHBOX*/}
                    <section className="d-flex justify-content-center align-items-center searchbox w-100" >
                      <section className=" Location-list">
                      <input type="text" placeholder={LocationPlaceHolder} className=" bg-light col-2.5 px-lg-4 py-lg-3 w-100 searchbox-location " readOnly
                        onFocus={GetLocationList}
                        />
                      <ul className="list-group">
                        {
                          LocationList.map((LocValue)=>{
                            return(
                              <li className="list-group-item" key={LocValue._id} onClick={()=>{
                                GetRestaurentListByLocationId(LocValue.city_id,LocValue.name,LocValue.city)
                              }}>{LocValue.name},{LocValue.city}</li>
                            )

                          })
                       
                        }
                     </ul>
                      </section>
                      <section className="searchicon-main d-flex w-50 Location-list">
                        <section className=" d-flex align-items-center justify-content-center">
                        <p className="fa-solid fa-magnifying-glass fs-4 mt-3 "></p>
                        </section>
                        <section className="searchbox-search ">
                        <input type="text" placeholder="search for restaurents" className="w-100  px-lg-5 py-lg-3 ms-lg-4  " readOnly/>
                        <ul className="list-group restaurent-list">
                        {
                          RestaurentList.map((RestaurentValue)=>{
                            return(
                              <li className="list-group-item" key={RestaurentValue._id} onClick={()=>{
                                Navigate(`/restaurent-page/${RestaurentValue._id}`);
                              }}>{RestaurentValue.name},{RestaurentValue.city_name}</li>
                            )

                          })
                       
                        }
                        </ul>

                        </section>
                      
                      
                    

                      </section>
              
                     
                  
                    </section>
                   
                    
                </section>
            </section>
       
         {/* SECTION MAIN 2*/}
         <section className="container-fluid">
            <section className="row">
                <section className="col-10 m-auto">
                    <section className="container-fluid">
                        <section className="row">
                            <section className="col-10 m-auto">
                                {/*SECTION 1 SEARCH*/}
                                <section className="mt-3">
                                <p className="fs-3 fw-bold item-container-topic">Quick Searches</p>
                                </section>
                                {/*SECTION 2 TYPE OF MEAL*/}
                            <section className="type-of-meal">
                                <p className="text-secondary ">Discover restaurents by type of meal</p>
                            </section>
                            {/*SECTION 3 ITEM CONTAINER*/}
                            <section className="item-container mt-4">
                              {
                                MealType.map((value,index)=>{
                                  return(
                                    <section key={value._id} className="item-container-boxes d-flex " onClick={()=>{
                                      Navigate(`/search-page/${value.mealtype}/${value.name}`);
                                    }}>
                                    <img src={`/images/MealType/${value.image}`}/>
                                    <section className="px-3 pt-3">
                                        <h1 className="fs-4 item-container-topic fw-bold">{value.name}</h1>
                                        <p className="item-container-subtopic">{value.content}</p>
                                    </section>
                                    </section>
                                  )

                                })
                           
                              }
                            </section>
                        </section>
                    </section>
                    </section>
                </section>
            </section>
         </section>
    </>
  );

};
export default Home;