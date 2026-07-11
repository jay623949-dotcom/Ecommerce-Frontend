import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../interceptors/axiosConfig";
import DetailedCard from "../reusable-components/DetailedCard";
import { useAuth } from "../context/AuthContext";

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [isAdmin,setIsAdmin] = useState(false);

  const {roles} = useAuth(); 

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchAdmin = async() =>{
    try{
      const res = await api.get("/Greet/profile");
      setIsAdmin(res.data.roletype?.includes("ADMIN"));
    }
    catch(err){
      console.log(err);
    }
  }

  useEffect(() =>{
    fetchAdmin(); 
  },[]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/Greet/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DetailedCard product={product} isAdmin = {isAdmin} />
    </div>
  );
}

export default Product;