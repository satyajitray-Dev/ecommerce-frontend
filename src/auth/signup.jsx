import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


 const Back_url= import.meta.env.VITE_BU;

function Signup(){
    //console.log(Back_url);
    const [form, setform]= useState({
       "name": "",
       "password": "",
       "email": "",
       
       "avatar": null

    }
    );
    const navigate= useNavigate();
    const handlechange=(e)=>{
        const {name,value,files} = e.target;
        setform({...form, [name] : files? files[0] : value});
    }
    const handlesubmit = async(e)=>{
        e.preventDefault();
        const formdata= new FormData();
        Object.entries(form).forEach(([Key,value] )=> {
             if (value !== null && value !== undefined) {
            formdata.append(Key, value);
    }
            
        });
        try{
            const response= await fetch(`${Back_url}/api/auth/signup`,{
            method: "POST",
            body: formdata
            }
        );
        const data=await response.json();
        if (!response.ok) {
            throw new Error(data.message || "Signup failed");
        }
        alert("signup successfull");
        console.log("Signup successful:", data);
        navigate("/");

    }
    catch(error){
            console.error("signup error :", error)

        }

    }
    return (
        <div className="product-form-container">
            <h1>Sign Up</h1>
        <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label>Name</label>
            <input 

            type="text"
            name= "name"
            value= {form.name}
            placeholder="Name"
            onChange={handlechange}
            /></div>
            <div className="form-group">
                <label>Email Id</label>
            <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            onChange={handlechange}
            /></div>
            <div className="form-group">
                <label>Password</label>
            <input
            type="password"
            name="password"
            value={form.password}
            placeholder="password"
            onChange={handlechange}
            /></div>
           <div className="form-group">
                    <label>Avatar :</label>
                    <input 
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handlechange}/>
                </div>
           
            <button type="submit" className="submit-btn">signup</button>

        </form>

         </div>
    )
}
export default Signup;