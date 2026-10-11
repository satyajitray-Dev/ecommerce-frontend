import { useState } from "react";
import "../App.css";
const backend_url=import.meta.env.VITE_BU;
function Productadd(){
    const[form,setform] = useState({
            title: "",
            description: "",
            price: "",
            category: "",
            image: "",
            stock: "",
    })
    const token =localStorage.getItem("token");
    
    const handlechange=(e)=>{
        const {name,value,files} = e.target;
        setform({...form,[name]: files? files[0] : value});

    }
    
    const handlesubmit=async(e)=>{
        e.preventDefault();
         const formdata= new FormData();
        Object.entries(form).forEach(([Key,value] )=> {
             if (value !== null && value !== undefined) {
            formdata.append(Key, value);
    }
            
        });
        try{
        const res=await fetch(`${backend_url}/api/product/add`,{
            method: "POST",
            headers: { Authorization: `Bearer ${token}`},
            body:formdata
        
        });
        if (res.status === 404) {
            alert("Access denied: Admin role required.");
            return;
        }
        const data=await res.json();
        if(data.success){
            alert("product created successfully")
            setform({
                title: "",
                description: "",
                price: "",
                category: "",
                image: null,
                stock: ""
            })
        }

        }catch(err){
            alert("something went wrong");
            console.log(err);
        }

    }
    if(!token){
        return null;
    }
    return (
        <div className="product-form-container">
            <h2>Add product</h2>
            <form onSubmit={handlesubmit}>
                <div className="form-group">
                    <label>Title :</label>
                    <input 
                    type="text"
                    name="title"
                    value={form.title}
                    placeholder="title"
                    onChange={handlechange}/>
                </div>
                <div className="form-group">
                    <label>Description :</label>
                    <input 
                    type="text"
                    name="description"
                    value={form.description}
                    placeholder="description"
                    onChange={handlechange}/>
                    </div>
                <div className="form-group">
                    <label>Price :</label>
                    <input 
                    type="number"
                    name="price"
                    value={form.price}
                    placeholder="price"
                    onChange={handlechange}/>
                </div>
                <div className="form-group">
                    <label>Category :</label>
                    <input 
                    type="text"
                    name="category"
                    value={form.category}
                    placeholder="category"
                    onChange={handlechange}/>
                </div>
                 <div className="form-group">
                    <label>Image :</label>
                    <input 
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handlechange}/>
                </div>
                 <div className="form-group">
                    <label>Stock :</label>
                    <input 
                    type="number"
                    name="stock"
                    value={form.stock}
                    placeholder="stock"
                    onChange={handlechange}/>
                </div>
                
                <button type="submit" className="submit-btn">Add</button>
               
            </form>
        </div>
    )

}
export default Productadd;