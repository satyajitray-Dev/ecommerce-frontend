import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Backend_url= import.meta.env.VITE_BU;
function Login({setToken,setRole}){
    const navigate= useNavigate();
   
    const [form,setform] = useState({
        email: "",
      
        password:""
    });

    const handlechange= (e)=>{
        setform({...form,[e.target.name]: e.target.value})
    }

    const handlesubmit= async(e)=>{
        e.preventDefault();
        try{
            const res= await fetch(`${Backend_url}/api/auth/login`,{
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(form)
            });
            const data= await res.json();

            if(data.success){
                localStorage.setItem("token",data.token);
                localStorage.setItem("userId",data.userId);
                localStorage.setItem("role",data.userrole);
                setToken(data.token);
                setRole(data.userrole);
               
           navigate("/");
            console.log("login success :", data);}
            
        }catch(err){
            console.error("error : " ,err);
        }
    }
    return (
        <div className="product-form-container">
            <h1>Login</h1>
        <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label>Email Id</label>
            <input 
            type="email"
            name="email"
            value={form.email}
            placeholder="email"
            onChange={handlechange}/></div>
            <div className="form-group">
                <label>Password</label>

            <input
            type="password"
            name="password"
            value={form.password}
            placeholder="password"
            onChange={handlechange}/></div>
            <button type="submit" className="submit-btn">login</button>
            </form>
            </div>

    )
}
export default Login;