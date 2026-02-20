import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import axios from "axios";
import FormModal from "./formModal";
import CarouslPage from "./carousel";

const RestaurentPage=()=>{
    let {id}=useParams();
    let [RestaurentDetails,SetRestaurentDetails]=useState();
    let[MenuItems,SetMenuItems]=useState([]);
    let [Totalprice,SetTotalprice]=useState(0);

    let GetRestaurentDetails=async ()=>{
        try{
        let URL=`https://zomato-clone-txds.onrender.com/api/Get-restaurent-Details-by-id/${id}`;
        // let response=await fetch(URL,{method:"GET"});
        // let data=await response.json();
        let {data}=await axios.get(URL);
        SetRestaurentDetails(data.RestaurentDetailResult);
    }catch(error){
        console.log(error);

    }
}
const GetMenuItems=async ()=>{
    let URL=`https://zomato-clone-txds.onrender.com/api/Get-menu-items-by-restaurent-id/${id}`;
    let response=await fetch(URL,{method:"GET"});
    let data=await response.json();
    SetMenuItems(data.MenuItemResult);
    
}
const AddMenu=(index)=>{
    SetTotalprice(MenuItems[index].price + Totalprice);
    MenuItems[index].quantity +=1;
    SetMenuItems([...MenuItems]);
    

}
const DecreaseMenu=(index)=>{
    SetTotalprice( Totalprice-MenuItems[index].price);
    MenuItems[index].quantity -=1;
    SetMenuItems([...MenuItems]);
}
const MakePayment=async ()=>{
    let URL=`https://zomato-clone-txds.onrender.com/api/Create-order-id`;
    let {data}=await axios.post(URL,{Amount:Totalprice});
    let {order}=data;
   var options = {
    "key": "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
    "amount":order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency":order.currency,
    "name": "EDUREKA INTENSHIP",
    "description": "Test Transaction",
    "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcoupons.aninews.in%2Fedureka&psig=AOvVaw2l8mJ4Da0fJ3yW0JqIdDVz&ust=1703340821626000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICBzZqdo4MDFQAAAAAdAAAAABAD",
    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler":async function (response){
        let saveUserOrder=MenuItems.filter(ordermenu=>ordermenu.quantity >0);
        let SendPaymentDetail={
            payment_id:response.razorpay_payment_id,
            order_id:response.razorpay_order_id,
            signature:response.razorpay_signature,
            Userorder:saveUserOrder
            
           };
        
        try {
               let URL=`https://zomato-clone-txds.onrender.com/api/verify-payment`;
               let {data}=await axios.post(URL,SendPaymentDetail);
               if(data.status==true){
                alert("Payment was Succesfull,Order Was saved");
                window.location.assign("/");
               }
               else{
                alert("Payment failed");
                window.location.assign("/");
               }
            
        } catch (error) {
            console.log(error);
            
        }

    },
    "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
    },
};
var rzp1 = new window.Razorpay(options);
rzp1.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
    rzp1.open();
  
}
    useEffect(()=>{
        GetRestaurentDetails();
    },[]);
    return(
    <>
    {
        
        
        RestaurentDetails &&
        
        <section className="row">
              <div className="modal" tabIndex="-1" id="MenuItemModal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-center">Menus At {RestaurentDetails.name}</h5>
                      <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {
                           MenuItems.map((menu,index)=>{
                            
                            return(
                                
                                <section className="menuitem-main d-flex justify-content-between" key={menu._id}>
                                <section>
                                        <p className="fw-bold fs-4">{menu.name}</p>
                                        <p className="fw-bold">Rs {menu.price}</p>
                                        <p className="text-secondary">{menu.description}</p>
                                    </section>
                                    <section>
                                        <img src={`/images/${menu.images}`} width={100} height={100} alt="" />
                                        {menu.quantity === 0 ? (
                                            <div className=" d-flex justify-content-center"><button className="btn btn-primary Menu-Image-button" onClick={()=>{AddMenu(index)}}>Add</button></div>
                                        ):(
                                        <div className="d-flex">
                                           <button className="Menu-item-plusminus-button bg-light" onClick={()=>{DecreaseMenu(index)}}>-</button> 
                                           <button className="Menu-item-plusminus-button bg-light">{menu.quantity}</button> 
                                           
                                           <button className="Menu-item-plusminus-button bg-light" onClick={()=>{AddMenu(index)}}>+</button> 
                                        </div>)}
                                        </section>
                                        </section>
                                        
                                )
                            })
}
    
                    </div>
                    <hr />
                        <section className="d-flex justify-content-between p-4">
                            <section>
                            <p>Sub Total:<span className="fa fa-indian-rupee"></span> {Totalprice} </p>
                            </section>
                            <section>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#UserForm" >Process</button>

                            </section>
                        </section>
                    
                   
                  </div>
                </div>
              </div>
              <div className="modal" tabIndex="-1" id="UserForm">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title text-center">name</h5>
                      <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Full Name:</p>
                        <input type="text" name="" id="fullname" className="w-100 modal-input rounded-2 mb-4" />
                        <p>Email</p>
                        <input type="text" name="" id="Email"className="w-100 modal-input rounded-2 mb-4" />
                        <p>Address:</p>
                        <textarea name="Address" id="" cols="30" rows="5" className="w-100 modal-input rounded-2 mb-4"></textarea>
    
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#MenuItemModal">Back</button>
                        <button className="btn btn-success" onClick={MakePayment}>Pay now</button>

                    </div>
                  </div>
                </div>
              </div>
              <FormModal/>
            <Header/>
            <CarouslPage/>
            <section className="col-11 m-auto">
                <section className="image-body  Restaurent-page-image  mt-5">
                    <img src={`/images/${RestaurentDetails.image}`} alt="" />
                    <button className="image-gallery-btn border-0 p-2 text-light bg-danger rounded-2" data-bs-toggle="modal" data-bs-target="#carousel">Click To View Gallery</button>
                </section>
                
                
            
            <section className="mt-3">
                <p className="fw-bold fs-2">{RestaurentDetails.name}</p>
            </section>
            <section className="d-flex justify-content-between">
                <p className="text-secondary ">Overview</p>
                <button className="bg-danger text-light rounded-2 py-2 px-5 border-0 " data-bs-toggle="modal" data-bs-target="#MenuItemModal" onClick={GetMenuItems}>Menu Items</button>
            </section>
            <hr/>
            <section   className="mt-3">
                <p className="fw-bold"> Cuisine:</p>
                    <p className="text-secondary">{ RestaurentDetails.Cuisine.map(val=>val.name).join("  ,  ")}</p>
            </section>
            <section  className="mt-3">
                <p className="fw-bold">Average Cost:</p>
                <p className="text-secondary"><span className="fa fa-indian-rupee text-secondary"></span>{RestaurentDetails.cost} For Two Peoples</p>
            </section>
            <section  className="mt-3">
                <p className="fw-bold">Phone Number:</p>
                <p className="text-secondary">{RestaurentDetails.contact}</p>
            </section>
            <section>
                <p className="fw-bold">Address:</p>
                <p className="text-secondary">{RestaurentDetails.address}</p>
            </section>
        </section>
        </section>

    
}  
    </>
    );
};
export default RestaurentPage;