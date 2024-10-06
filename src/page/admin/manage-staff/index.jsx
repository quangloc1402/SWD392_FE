import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import axios from "axios";
import { toast } from "react-toastify";
import FormItem from "antd/es/form/FormItem";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import uploadFile from "../../../assets/hook/useUpload";
import { render } from "react-dom";
function ManageStaff() {
  const [staffs, setStaffs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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
  //Create
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      const file = fileList[0];
      console.log(file);
      const url = await uploadFile(file.originFileObj);
      console.log(url);
      values.img = url;
      if (values.id) {
        const response = await api.put(
          `https://66fe45ce2b9aac9c997b1b3c.mockapi.io/Staff/${values.id}`,
          values
        );
        console.log(response.data);
      } else {
      }
      const response = await api.post(
        "https://66fe45ce2b9aac9c997b1b3c.mockapi.io/Staff",
        values
      );
      toast.success("Successfully saved! ");
      fetchStaff();
      form.resetFields;
      setOpenModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  //Delete
  const handleDelete = async (id) => {
    try {
      await api.delete(
        `https://66fe45ce2b9aac9c997b1b3c.mockapi.io/Staff/${id}`
      );
      toast.success("Delete Sucessfully ! ");
      fetchData();
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  const fetchStaff = async () => {
    try {
      const response = await axios.get(
        "https://66fe45ce2b9aac9c997b1b3c.mockapi.io/Staff"
      );

      console.log(response.data);
      setStaffs(response.data);
    } catch (err) {
      toast.error(err.response.data);
    }
  };
  useEffect(() => {
    fetchStaff();
  }, []);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (img) => <Image width={200} src={img} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, Staff) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setOpenModal(true);
              form.setFieldsValue(Staff);
            }}
          >
            Update
          </Button>
          ,
          <Popconfirm
            title="Delete"
            description="Do you want to Delete this Staff"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
            ,
          </Popconfirm>
        </>
      ),
    },
  ];
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    form.resetFields();
  };
  return (
    <div>
      <h1>Staff Management</h1>
      <Button onClick={() => setOpenModal(true)}> Create New Staff</Button>
      <Table columns={columns} dataSource={staffs} />
      <Modal
        title="Staff"
        open={openModal}
        onCancel={handleCloseModal}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          labelCol={{
            span: 24,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Staff name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input Staff's name!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="img" name="img">
            {" "}
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
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

export default ManageStaff;
