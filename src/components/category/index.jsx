import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Button, Menu } from "antd";
import "./index.scss";

function Category() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("category");
      setCategories(response.data);
      console.log(response.data);
    } catch (e) {
      console.log("Error category: ", e);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="product-list">
      {categories.map((category) => (
        <Categories category={category} />
      ))}
    </div>
  );
}
const Categories = ({ category }) => {
  return (
    <div>
      <Menu.Item>
        {category.categoryName}
      </Menu.Item>
    </div>
  );
};

export default Category;
