
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";


function Userupdate(){
    const navigate= useNavigate();
    const backurl= import.meta.env.VITE_BU;
    const [form,setForm]= useState({
        name: "",
        role: "",
        email: "",
        avatar: ""
    });
    const {id} = useParams();
    useEffect(()=>{

        const user=async()=>{ 
            try{
                 const fetchuser=await fetch(`${backurl}/api/user/${id}`,{
                     method: "GET"
                });
                const data=await fetchuser.json();
                const user= data.user;
                if(!data.success){
                    alert("user not found")
                }else{
                    setForm({
                    name: user.name,
                    role: user.role ,
                    email: user.email,
                    avatar: user.avatar
                
                    })
                }
            }catch(err){

                console.error(err)
            }
    }
    if(id) user()},
    [id])
    const handlesubmit=async(e)=>{
        e.preventDefault();
        
        try{
        
        const fetchupdate= await fetch(`${backurl}/api/user/update/${id}`,{
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
        const data=await fetchupdate.json();
        if(data.success){
            alert("user updated successfully");
            navigate("/");
        }else{
            alert("something went wrong")
        }}
        catch(err){
            console.error(err);
        }
    }
    const handlechange=(e)=>{
        const {name,value}= e.target;
        setForm((form)=> ({...form,[name]: value}));
    }


    return (
    <div className="product-form-container">
      <h2>Update User</h2>
      <form onSubmit={handlesubmit} className="product-form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handlechange} />
        </div>

        <div className="form-group">
          <label>Role :</label>
          <input type="text" name="role" value={form.role} onChange={handlechange} />
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input type="text" name="email" value={form.email} onChange={handlechange} />
        </div>

        
        <div className="form-group">
          <label>Avatar :</label>
          <input type="text" name="avatar" value={form.avatar} onChange={handlechange} />
        </div>

        <button type="submit" className="submit-btn">Update User</button>
      </form>
    </div>
  );
}
export default Userupdate;