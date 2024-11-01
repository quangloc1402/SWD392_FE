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
import api from "../../config/axios";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../assets/hook/useUpload";
import { Row, Col } from 'antd';
import styles from "./PostSell.module.scss"; // Import the SCSS module

const { Option } = Select;

function PostSell() {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
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
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
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
        const response = await api.get("category");
        setCategories(response.data);
      } catch (error) {
        message.error("Failed to fetch categories: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (values) => {
    try {
      values.imageUrl = await uploadFile(values.imageUrl.file.originFileObj);
      values.categoryId = [Number(values.categoryId)];
      const response = await api.post("post/buy", values);
      message.success("Post successful!");
      form.resetFields();
    } catch (error) {
      message.error(
        "Error occurred: " + (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formContent}>
        <h2>Tạo Đơn Bán Hàng</h2>
        {loading ? (
          <Spin tip="Loading categories..." />
        ) : (
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={16} className={styles.row}>
              <Col span={10}>
                <Form.Item
                  name="toyName"
                  label="Tên Sản Phẩm"
                  rules={[
                    { required: true, message: "Please input the toy name!" },
                    { min: 3, message: "Toy name must be at least 3 characters" },
                  ]}
                >
                  <Input placeholder="Enter toy name" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="categoryId"
                  label="Chọn Danh Mục"
                  rules={[
                    { required: true, message: "Please select a category!" },
                  ]}
                >
                  <Select
                    placeholder="Select category"
                    options={
                      categories?.map((item) => ({
                        label: item.categoryName,
                        value: item.id,
                      })) || []
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="quantity"
                  label="Số Lượng"
                  rules={[
                    { required: true, message: "Please input the quantity!" },
                    { type: "number", min: 1, message: "Quantity must be at least 1" },
                  ]}
                >
                  <InputNumber min={1} placeholder="Enter quantity" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[
                    { required: true, message: "Please input the price!" },
                    { type: "number", min: 0.01, message: "Price must be positive" },
                  ]}
                >
                  <InputNumber min={0.01} step={0.01} placeholder="Enter price" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="description"
                  label="Mô Tả"
                  rules={[
                    { required: true, message: "Please input the description!" },
                    { min: 10, message: "Description must be at least 10 characters" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Enter description"
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} className={styles.row}>
              <Col span={12}>
                <Form.Item
                  name="imageUrl"
                  label="Hình ảnh đồ chơi"
                  rules={[
                    { required: true, message: "Please upload at least one image!" },
                    {
                      validator: (_, value) =>
                        value?.fileList?.length
                          ? Promise.resolve()
                          : Promise.reject("Please upload an image."),
                    },
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
              </Col>

            </Row>


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
    </div>
  );
}

export default PostSell;
