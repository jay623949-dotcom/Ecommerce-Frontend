import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../interceptors/axiosConfig";
import DetailedCard from "../reusable-components/DetailedCard";

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

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
      <DetailedCard product={product} />
    </div>
  );
}

export default Product;