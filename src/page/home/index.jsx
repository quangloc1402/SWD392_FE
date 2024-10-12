import React, { useEffect, useState } from "react";
import "./index.scss";

import api from "../../config/axios";
function Home() {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        "https://670a190caf1a3998baa30985.mockapi.io/product"
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      <div style={{ margin: "100px auto" }} className="product-list">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
}
const Product = ({ product }) => {
  return (
    <div className="product">
      <img
        src="https://product.hstatic.net/1000120104/product/tbd05683819_37d2223e434249d6bf5f73cd54722871_master.jpg"
        alt=""
      />
      <h3>{product.toyName}</h3>
      <p>{product.category}</p>
      <p>{product.quantity}</p>
      <p>{product.Price}</p>
    </div>
  );
};

export default Home;
