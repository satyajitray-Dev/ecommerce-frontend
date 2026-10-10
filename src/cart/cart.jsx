import { useState } from "react";
import { useEffect } from "react"
import { Link } from "react-router-dom";
function Cart(){
    const [loading, setloading] = useState(true);
    const back_url=import.meta.env.VITE_BU;
    const userid= localStorage.getItem("userId");
    const [cart,setCart] = useState([]);
    useEffect(()=>{
    const fetchcart =async()=>{
        try{
        const res= await fetch(`${back_url}/api/cart/${userid}`,{
            method: "GET"
        })
        const data= await res.json();
        if(data.success){ 
            setCart(data.get.items);
        }
    }catch(err){
        console.error("error in fetch cart")
    }
    finally{
        setloading(false);
    }
    }
    fetchcart();
},[userid])
if(loading){
    return <h1>cart loading...</h1>
}
if (cart.length === 0) {
    return (
      <div className="product-list-container">
        <h1>Your Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/">Explore Products</Link>
      </div>
    );
  }
  const totalCartValue = cart.reduce(
  (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
  0
);

    return(
    <div className="product-list-container">
      <h1>Your Shopping Cart</h1>

        <div className="product-grid">
          {cart.map((item) => (
            <div key={item.productId?._id || item._id} className="product-card">
              <img
                src={item.productId?.image}
                alt={item.productId?.title}
              />
              <h2>{item.productId?.title || item.productId?.name || "Product"}</h2>
              <p className="price">Price: {item.productId?.price}</p>
              <p className="category">Quantity: {item.quantity}</p>
              <p className="description">
                Subtotal: {(item.productId?.price || 0) * item.quantity}
              </p>
            </div>
           
          ))}
        </div>
        <h3 className="cart-total">Total Cart Value: ₹{totalCartValue}</h3>
      
    </div>
  )

}
export default Cart;