import { useEffect, useState } from "react"

function Getcategory(){
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true)

    const backurl= import.meta.env.VITE_BU;
    useEffect(()=>{
        
        const getcategory=async()=>{
            try{
                const res= await fetch(`${backurl}/api/category/`,{
                    method: "GET"
                })
                if(!res){
                    alert("error in fetching")
                }
                const data=await res.json();
                if(data.success){
                     setCategory(data.category);
                }
                else{
                alert("categories not found")
                }
            }
            catch(err){
                alert("something went wrong");
                console.log(err);
            }
            finally{
                setLoading(false);
            }
        }
        if(!loading){
            return <h1>loading....</h1>
        }
        getcategory()},
    [])


    return(
    <div className="product-list-container">
      <div className="product-grid">
        {category.map((item) => (
          <div className="product-card" key={item._id}>
            <img src={item.image} alt={item.image} />
            <h2>{item.name}</h2>
            <p className="description">{item.slug}</p>
            </div>
        ))}
            </div>
            </div>
    )
}
export default Getcategory;