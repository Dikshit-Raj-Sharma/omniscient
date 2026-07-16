import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response=await api.get("/products/dashboard");
        setProducts(response.data.data);

      } catch(error) {
        console.log("Failed to load products :/",error);
        setErr("Failed to load products");
      } finally{
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  if(loading){
    return (
    <h1>Loading Dashboard...</h1>
    );
  }
  if(err){
    return (
    <p>{err}</p>
    )
  }
  return (
    <div>
        {products.map((product) => (
            <div key={product.id}>{product.name}</div>
        ))}
    </div>
);
};

export { Dashboard };
