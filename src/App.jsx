import Signup from "./auth/signup";
import Login from "./auth/login";
import Productadd from "./product/addproduct.jsx";
import {useNavigate, Route,Routes,Link, BrowserRouter } from "react-router-dom";
import Productlist from "./product/Getproduct.jsx";

import { useState } from "react";

import Productupdate from "./product/productupdate.jsx";
import Users from "./user/user.jsx";
import Cart from "./cart/cart.jsx";
import Userupdate from "./user/userupdate.jsx";

import Getcategory from "./category/getgategory.jsx";



function App(){
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [role,setRole]= useState(localStorage.getItem("role"));
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
    navigate("/");
  };
    return (
        <div>
       <nav>
        
         <Link to="/">Home</Link>{" | "}
        {!token ? (
          <>
            <Link to="/signup">Signup</Link>{" | "}
            <Link to="/login">Login</Link>
          </>) 
          :
          (<>{role==='admin'?(
                <>

                  <Link to="/product/create">Create Product</Link>{" | "}
                  <Link to ="/user">Users</Link>{" | "}
                  <Link to="/category">Category</Link>{" | "}
                  <button onClick={logout}>Logout</button>
                </>)
            :
          (<>
                <Link to= "/cart">Cart</Link>
                  <button onClick={logout}>Logout</button>
            </>)
            }</>
        )
        }

       </nav>
        <Routes>
          <Route path="/product/update/:id" element={<Productupdate/>}/>
            <Route path="/" element ={<Productlist/>}/>
            <Route path="/user" element ={<Users/>}/>
            <Route path="/cart" element ={ <Cart/>}/>
            <Route path="/user/update/:id" element={<Userupdate/>}/>
          
            <Route path="/admin/create-product" element={<Productadd/>}/>
            <Route path="/category" element={<Getcategory/>}/>
            <Route path="/product/create" element={
                    <Productadd/>}
              />
            <Route path="/signup" element= {<Signup/>}/>
            <Route path="/login" element={<Login setToken={setToken} setRole={setRole}/>} />
           
        </Routes>
        </div>
    )
}
export default App;