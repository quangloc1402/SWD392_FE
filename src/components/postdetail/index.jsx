// src/pages/ProductDetail.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axios";
import { Card } from "antd";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`post/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product detail: ", error);
      toast.error("Could not fetch product details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <Card title={product.toyName} style={{ width: "80%", margin: "20px auto" }}>
      <img src={product.imageUrl} alt={product.toyName} />
      <p>Quantity: {product.quantity}</p>
      <p>Description: {product.description}</p>
      <p>Price: đ{product.price}</p>
      <p>Price by Day: đ{product.priceByDay}</p>
      <p>Deposit Fee: đ{product.depositFee}</p>
    </Card>
  );
};

export default ProductDetail;
