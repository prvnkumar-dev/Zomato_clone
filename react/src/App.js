import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/search";
import PageProblem from "./components/pageError";
import RestaurentPage from "./components/Restaurentpage";


//import {useState} from "react";
const App=()=>{

  return(
    <>
    <section className="container-fluid">
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/search-page/:mealtype_id/:mealtype_name" element={<Search/>} />
        <Route path="/restaurent-page/:id" element={<RestaurentPage/>} />
        <Route path="*" element={<PageProblem/>} />
        
    </Routes>
    </section>
  
   </>
  );

};
export default App;