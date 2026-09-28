/*import { useEffect } from "react";

import { useState } from "react";
import { useParams } from "react-router-dom";
const back_url=import.meta.env.VITE_BU;
function Productupdate(){
    const {id}= useParams();
    const [form,setform]= useState({
        title: "",
        price: "",
        image: "",
        description: "",
        stock:"",
        category: ""
    })
    const token= localStorage.getItem("token");
     useEffect(()=>{
        const fetchproducts=async()=>{
            try{
            const res= await fetch(`${back_url}/api/product/update/${id}`)
            const data = await res.json();
            if(data.success){
                const product= data.updatedproduct;
                setform({
                    title: product.title || "",
                    price: product.price || "",
                    image: null,
                    stock:product.stock || "",
                    description: product.description || "",
                    category: product.category || ""
                })
            }
            
        }catch(err){
            alert("id didnt fetch");

        }
    }
    if(id) fetchproducts();},
    [id])

    const handlechange= (e)=>{
        const {name,value, files} =e.target;
        setform({...form,[name]: files? files[0]: value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault()
        const formdata= new FormData();
        Object.entries(form).forEach(([key,value] )=> {
            if(value !== null || value !== ""){
                formdata.append(key,value)
            }
        });
    try{

    const response=await fetch(`${back_url}/api/product/update/${id}`,{
        method: "PUT",
        headers: { Authorization : `bearer ${token}`},
        body: formdata
        })
        const data=await response.json();
        if(data.success){
            alert(`product updated successfully`)
        }


        
    }catch(err){
        console.error(err)
        alert("something went wrong")
       
    }
}
    return (
        <form onSubmit={handlesubmit}>
            <div>
                <label>title</label>
            <input
            type="text"
            name="title"
            value={form.title}
            onChange={handlechange}/>
            </div>
            <div>
                <label>description</label>
            <input
            type="text"
            name="description"
            value={form.description}
            onChange={handlechange}/>
            </div>
            <div>
            <label>category</label>
            <input
            type="text"
            name="category"
            value={form.category}
            onChange={handlechange}/>
            </div>
            <div>
            <label> image </label>
            <input 
            type="file"
            name="image"
            accept= "image/*"
            onChange={handlechange}
            />
            </div>
            <div>
            <input
            type="number"
            name="price"
            value={form.price}
            onChange={handlechange}/>
            </div>
            <div>
                <label>stock</label>
            <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handlechange}/>
            </div>
            <button type="submit">update</button>
        </form>
    )
}
export default Productupdate;

*/
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

const back_url = import.meta.env.VITE_BU;

function Productupdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setform] = useState({
    title: "",
    price: "",
    image: null,
    description: "",
    stock: "",
    category: "",
  });
  const [preview,setPreview] = useState("");

  // 1. Fetch existing product to pre-fill form
  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const res = await fetch(`${back_url}/api/product/${id}`);
        const data = await res.json();

        if (data.success) {
          const product = data.updatedproduct || data.product;
          setform({
            title: product.title || "",
            price: product.price || "",
            description: product.description || "",
            stock: product.stock || "",
            category: typeof product.category === "object" ? product.category._id : (product.category || ""),
            image: null, 
          });
          if (product.image) {
            setPreview(product.image);
          }
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    if (id) fetchproduct();
  }, [id]);

const handlechange = (e) => {
  const { name, value, files } = e.target;
  if (files && files[0]) {
    const selectedFile = files[0];
    setform((prev) => ({ ...prev, [name]: selectedFile }));
    setPreview(URL.createObjectURL(selectedFile));
  } else {
    setform((prev) => ({ ...prev, [name]: value }));
  }
};

  const handlesubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== "") {
        formdata.append(key, value);
      }
    });

    try {
      const response = await fetch(`${back_url}/api/product/update/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formdata,
      });

      const data = await response.json();

      if (data.success) {
        alert("Product updated successfully!");
        navigate("/");
      } else {
        alert(data.message || "Failed to update product");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="product-form-container">
      <h2>Update Product</h2>
      <form onSubmit={handlesubmit} className="product-form">
        <div className="form-group">
          <label>Title :</label>
          <input type="text" name="title" value={form.title} onChange={handlechange} />
        </div>

        <div className="form-group">
          <label>Description :</label>
          <input type="text" name="description" value={form.description} onChange={handlechange} />
        </div>

        <div className="form-group">
          <label>Category :</label>
          <input type="text" name="category" value={form.category} onChange={handlechange} />
        </div>

        <div className="form-group">
          <label>Image :</label>
          <input type="file" name="image" accept="image/*" onChange={handlechange} />
        </div>
        {preview && (
          <div className="form-group image-preview-group">
            <label>Current / Selected Image:</label>
            <img
              src={preview}
              alt="Product Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "8px",
                border: "1px solid #444",
              }}
            />
          </div>)}

        <div className="form-group">
          <label>Price :</label>
          <input type="number" name="price" value={form.price} onChange={handlechange} />
        </div>

        <div className="form-group">
          <label>Stock :</label>
          <input type="number" name="stock" value={form.stock} onChange={handlechange} />
        </div>

        <button type="submit" className="submit-btn">Update Product</button>
      </form>
    </div>
  );
}

export default Productupdate;