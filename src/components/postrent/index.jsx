import { Button, Card, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch } from "react-redux";

function PostRent() {
  const [products, setProducts] = useState([]);
  const [pageCurrent, setPagecurrent] = useState(0);
  let pageSize = 5;
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        `toy?status=CREATED&TYPE=RENT&page=${pageCurrent}&size=${pageSize}`
      );
      const filteredProducts = response.data.filter(
        (product) => product.status === "CREATED" && product.toyType === "RENT"
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
      console.log(filteredProducts);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [pageCurrent]);
  const handlePage = async (page) => {
    console.log(page);
    setPagecurrent(page - 1);
    try {
      const response = await api.get(
        `toy?status=CREATED&type=RENT&page=${pageCurrent}&size=${pageSize}`
      );
      const filteredProducts = response.data.filter(
        (product) => product.toyType === "RENT" && product.status === "CREATED"
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
      console.log(filteredProducts);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };
  return (
    <div>
      <div style={{ margin: "100px auto" }} className="product-list">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
      <Pagination
        align="center"
        defaultCurrent={1}
        onChange={(page) => {
          handlePage(page);
        }}
        pageSize={pageSize}
        total={20}
      />
    </div>
  );
}
const Product = ({ product }) => {
  const dispatch = useDispatch();

  const handleRent = async (id, quantity, daysToRent) => {
    try {
      const response = await api.post(
        `order-rent/create?toyId=${id}&quantity=${quantity}&daysToRent=${daysToRent}`
      );
      window.open(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to rent", error);
      toast.error("Failed to rent");
    }
  };

  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.toyName} />
      <h3>{product.toyName}</h3>
      <p>{product.description}</p>
      <p>Quantity: {product.quantity}</p>

      <p>Price by Day: đ{product.priceByDay}</p>
      <p>Deposit Fee: đ{product.depositFee}</p>

      <center>
        <Button
          className="buttonAdd"
          onClick={() => handleRent(product.id, 1, 3)}
        >
          Thanh Toán
        </Button>

        <br />
        <Link to={`/post/${product.id}`}>
          <button>Detail</button>
        </Link>
      </center>
    </div>
  );
};

export default PostRent;
