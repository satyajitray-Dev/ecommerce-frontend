import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Productlist(){
  const token = localStorage.getItem("token");
    const navigate= useNavigate();
    const [loading,setloading]=useState(true);
    const [products,setProducts]= useState([]);
    const[error,seterror]= useState(null);
    const [page, setpage] = useState(1);
    const [limit] = useState(6);
    const [totalpage, settotalpages] = useState(1);
    const [searchQuery, setsearchQuery]= useState('');
   
    const role = localStorage.getItem("role");
    const backend_url= import.meta.env.VITE_BU;
    const [category, setCategory] = useState("");
const [categories, setCategories] = useState([]);

useEffect(() => {
  const getCategories = async () => {
    try {
      const res = await fetch(`${backend_url}/api/category/`,{
        method: "GET"
      });
      const data = await res.json();

      if (data.success) {
        setCategories(data.category);
        setloading(false);
      }
    } catch (err) {
      console.error(err);
    }
    finally{
      setloading(false);
    }
  };

  getCategories();
}, [backend_url]);


    useEffect(()=>{
    const getproduct=async()=>{
      setloading(true);
        
        try{
            const res= await fetch(`${backend_url}/api/product/?page=${page}&limit=${limit}&search=${searchQuery}&category=${category}`,{
               
    
                method:"GET",
                
            });
            const data= await res.json();
            
            if(data.success){
                setProducts(data.products);
                
                settotalpages(data.totalpages);
            }
            else{
                seterror(data.message)
            }
        }
        catch(err){
            alert("something went wrong")}
    finally{
        setloading(false);
    }}
    getproduct();
}
    ,[backend_url,page,limit,searchQuery,category])
    const handlepagechange=(npage)=>{
      if(npage >= 1 && totalpage>=npage){
        setpage(npage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

    }
    const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem("userId");
    const backend_url = import.meta.env.VITE_BU;

    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const res = await fetch(`${backend_url}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          items: [{ productId: productId, quantity: 1 }],
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Product added to cart successfully!");
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };



  //delete
  const handleDelete = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    const res = await fetch(`${backend_url}/api/product/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

    if (data.success) {
      alert("Product deleted successfully!");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } else {
      alert(data.message || "Failed to delete product");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};
    return (<>
      <div className="category-section">
  <label htmlFor="category">Category:</label>
  <div className="select-wrapper">
    <select
      id="category"
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        setpage(1);
      }}
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat._id}>
          {cat.name}
        </option>
      ))}
    </select>
  </div>
</div>
<div className="search-bar-container">
  <div className="search-input-wrapper">
    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
    <input
      type="text"
      className="search-input"
      placeholder="Search product title..."
      value={searchQuery}
      onChange={(e) => {
        setsearchQuery(e.target.value);
        setpage(1);
      }}
    />
  </div>
</div>

     <div className="product-list-container">
       
         <div className="product-grid">
        {products.map((item) => (
          <div className="product-card" key={item._id}>
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <p className="description">{item.description}</p>
            <p className="price">Price: {item.price}</p>
            <p className="category">Category: {item.category?.name || item.category}</p>
            <div className="card-actions" key={item._id}>
              {/* 1. Add to Cart visible ONLY for 'user' or 'customer' */}
              {(role === "user" || role === "customer") && (
                <button onClick={() => handleAddToCart(item._id)}>
                  Add to Cart
                </button>
              )}
            {role==='admin' && (
            <button onClick={() => navigate(`/product/update/${item._id}`)}>
              Edit
            </button>
            )}  
            <br/>
            {role==='admin' && ( <button onClick={() => handleDelete(item._id)}>Delete</button>)}
            </div>
          </div>))}
          </div>
    <div>
      <button onClick={()=>handlepagechange(page-1)} disabled={page<=1}>{"<"}</button>
      <button onClick={()=>handlepagechange(page+1)} disabled={page>=totalpage}>
        {">"}
      </button>

    </div>
    </div>
    </>
  );

}
export default Productlist;