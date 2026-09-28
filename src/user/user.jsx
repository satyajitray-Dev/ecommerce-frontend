import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Users(){
    const navigate= useNavigate();
    const back_url= import.meta.env.VITE_BU;
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(null);
    const [users, setUsers]=  useState([]);
     const token = localStorage.getItem("token");
    useEffect(()=>{
        
        const getuser=async()=>{
            try{

        const  res= await fetch(`${back_url}/api/user/`,{
            method: "GET"
        })
        const data=await res.json();
        if(data.success){
            setUsers(data.users);
        }
        else{
            seterror(data.message);
        }
    }
    catch(err){
        alert("something went wrong");
        console.log(err);

    }finally{
        setloading(false);
    }
    };
    getuser()
    },
    []);
    
    if(loading){
        return <h1>loading...</h1>
    }
    if(error){
        return <h1>{error}</h1>
    }
    return(
        <div className="product-list-container">
      <h1>User Management</h1>

            <div className="product-grid">
                {users.map((user) => (
                <div key={user._id} className="product-card">
                    <div>
                        <img src={user.avatar} alt={user.name}></img>

                        <h2>{user.username || user.name || "No Name"}</h2>
                        <p className="description">{user.email || "No email provided"}</p>
                        <p className="category">ROLE: {user.userrole || user.role || "user"}</p>
                        <p className="price" style={{ fontSize: "11px", wordBreak: "break-all" }}>
                          ID: {user._id}</p>
                        <button onClick={()=>navigate(`/user/update/${user._id}`)}>
                            Edit
                        </button>
                    </div>
                </div>
            
          ))}
          </div>
        
      
    </div>
  )
}
export default Users;
