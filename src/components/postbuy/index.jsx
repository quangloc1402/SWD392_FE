import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, message, Select, Spin } from "antd";
import api from "../../config/axios"; // Ensure this is set up correctly

const { Option } = Select;

function PostBuy() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("category"); // Replace with your actual endpoint
        setCategories(response.data); // Assuming the response data is an array of categories
      } catch (error) {
        message.error("Failed to fetch categories: " + error.message);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Ensure categoryId is an array
      values.categoryId = [Number(values.categoryId)];

      const response = await api.post("post/buy", values);
      message.success("Post successful!");
      console.log("Success:", response.data); // Log the response data
      form.resetFields(); // Reset form fields
    } catch (error) {
      message.error(
        "Error occurred: " + (error.response?.data?.message || error.message)
      );
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Tạo Đơn Bán Hàng</h2>
      {loading ? (
        <Spin tip="Loading categories..." /> // Show loading spinner while fetching categories
      ) : (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="toyName"
            label="Tên Sản Phẩm"
            rules={[{ required: true, message: "Please input the toy name!" }]}
          >
            <Input placeholder="Enter toy name" />
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Số Lượng"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber min={1} placeholder="Enter quantity" />
          </Form.Item>

          <Form.Item
            name="imageUrl"
            label="Hình ảnh đồ chơi"
            rules={[
              { required: false, message: "Please input the image URL!" },
            ]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Mô Tả"
            rules={[
              { required: true, message: "Please input the description!" },
            ]}
          >
            <Input.TextArea
              placeholder="Enter description"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber min={0} step={0.01} placeholder="Enter price" />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="Chọn Danh Mục"
            rules={[
              { required: true, message: "Please select a category ID!" },
            ]}
          >
            <Select
              placeholder="Select category"
              options={
                categories?.map((item) => ({
                  label: item.categoryName, // Sử dụng `label` để hiển thị
                  value: item.id, // Sử dụng `value` cho giá trị
                })) || []
              } // Nếu categories không có dữ liệu, trả về mảng rỗng
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}

export default PostBuy;
