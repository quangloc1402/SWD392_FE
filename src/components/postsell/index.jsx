import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  message,
  Select,
  Spin,
  Upload,
  Image,
} from "antd";
import api from "../../config/axios"; // Ensure this is set up correctly
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../assets/hook/useUpload";
const { Option } = Select;

function PostSell() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]); // State to store categories
  const [loading, setLoading] = useState(true); // Loading state
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
      console.log(values);
      // Ensure categoryId is an array
      values.imageUrl = await uploadFile(values.imageUrl.file.originFileObj);
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
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
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
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default PostSell;
