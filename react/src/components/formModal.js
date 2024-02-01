import axios from "axios";
import { useState } from "react";

const FormModal=({res})=>{
    const [NewUser,SetNewUser]=useState({
        Name:"",
        password:"",
        email:"",
        Phone:"",
        address:""
    });
    const [Login,SetLogin]=useState({
      email:"",
      password:""
    });
    let [loginResult,SetLoginesult]=useState("");
    const [passwordType,setPasswordType]=useState("password");
    const CreateNewUser=async ()=>{
        let URL=`http://localhost:3030/api/create-user-account`;
        let {data}=await axios.post(URL,NewUser);
        if(data.status==true){
            alert(data.messege);
            window.location.assign("/");
        }
        else{
            alert(data.messege);
        }
    }
    const LoginUser=async ()=>{
        let URL=`http://localhost:3030/api/user-login`;
        let {data}=await axios.post(URL,{...Login});
        if(data){
          alert(data.messege);
          SetLoginesult(data.result)

        }
        else{
          alert("server Error");
        }

    } 
    if(loginResult!==""){
      res(loginResult)
    }
    return(
        <>
                    <div className="modal" tabIndex="-1" id="login">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">LOGIN</h5>
                  <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="modal-body-items form-check">
                    <div>
                  <input type="text" placeholder="Enter the Email" className="input-textbox" value={Login.email} onChange={(event)=>{SetLogin({...Login,email:event.target.value})}}/>
                  </div>
                  ,<div>
                  <input type={passwordType} placeholder="Enter the Password" className="input-textbox" value={Login.password} onChange={(event)=>{SetLogin({...Login,password:event.target.value})}}/>
                  </div>
                  <div className="mt-3 input-checkbox">
                  <input type="checkbox" id="show-pass" className="form-check-input" onChange={(event)=>{
                    if(event.target.checked){
                      setPasswordType("text")
                    }
                    else{
                      setPasswordType("password")
                    }
                  }}/>
                  <label htmlFor="show-pass" className="form-check-label ">Show password</label>
                  </div>
                  <div className="m-4 ">
                    <p>continue with <span className="fa fa-brands fa-google-plus-g text-danger mx-2"></span>Google <span className="fa fa-brands fa-facebook-f text-primary mx-2"></span>Facebook</p>
                  </div>
                  <div>
                    <p>create an account ?<a href="" className="mx-2" data-bs-toggle="modal" data-bs-target="#create-account">sign up</a></p>
                  </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={LoginUser}>login</button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal" tabindex="-1" id="create-account">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-center">SIGN UP</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="modal-body-items form-check">
                    <div>
                  <input type="text" placeholder="Enter the Name" className="input-textbox mb-4" value={NewUser.Name} onChange={(event)=>{SetNewUser({...NewUser,Name:event.target.value})}} />
                  </div>
                 
                    <div>
                  <input type="text" placeholder="Enter the Email" className="input-textbox mb-4"  value={NewUser.email} onChange={(event)=>{SetNewUser({...NewUser,email:event.target.value})}}/>
                  </div>
                  <div>
                    <input type="text" placeholder="Enter the Phone number" className="input-textbox mb-4" value={NewUser.Phone} onChange={(event)=>{SetNewUser({...NewUser,Phone:event.target.value})}}/>
                    </div>
                  <div>
                  <input type="password" placeholder="Enter the Password" className="input-textbox mb-4" value={NewUser.password} onChange={(event)=>{SetNewUser({...NewUser,password:event.target.value})}}/>
                  </div>
                  <div>
                    <textarea name="" id="" cols="30" rows="3" className="input-textbox" placeholder="Enter The Address" value={NewUser.address} onChange={(event)=>{SetNewUser({...NewUser,address:event.target.value})}}></textarea>
                    
                    </div>

                  <div className="m-4 ">
                    <p>signup with <span className="fa fa-brands fa-google-plus-g text-danger mx-2"></span>Google <span className="fa fa-brands fa-facebook-f text-primary mx-2"></span>Facebook</p>
                  </div>
                  <div>
                    <p>Already have an account ?<a href="" data-bs-toggle="modal" data-bs-target="#login" className="mx-2">login</a></p>
                  </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={CreateNewUser}>signup</button>
                  <button type="button" className="btn btn-danger" data-bs-dismiss="modal">cancel</button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
    );
    
}
export default FormModal;