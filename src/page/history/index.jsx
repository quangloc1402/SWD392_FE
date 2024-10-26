import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Alert, Button, Form, Input, Modal, Rate, Table } from "antd";
import { render } from "react-dom";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
function History() {
  const [Oders, setOrders] = useState([]);
  const[form] = useForm();
  const [selectedOrder, setSelectedOrder] =useState(null);
  const fetchHistory = async () => {
    try {
      const response = await api.get("/orders/history");
      setOrders(response.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFeedback= async (values) =>{
  values.postId= selectedOrder.id;
 
 try{
     const response = await api.post("feedback",values);
     fetchHistory();
     setSelectedOrder(null);
     form.resetFields();
     toast.success("Succesfully created feedback");
    } catch(e){
      console.log(e)
    }

  }
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title:"FeedBack",
      dataIndex:"feedback",
      key:"feedback",
      render:(feedback, record) => record 
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (value, record) =>{
        return( <Button type="primary" onClick={() => {
          setSelectedOrder(record)
        }}
        >
          Feedback
          
          </Button>
        )
      }
    },
    
  ];
  return (
    <div className="history">
      Lịch Sử Mua Hàng
      <Table dataSource={Oders} columns={columns} />
      <Modal title="Feedback" open={selectedOrder} onOk={()=> form.submit()} onCancel={()=>{
        setSelectedOrder(null)
        }}
        >
      <Alert message={`Feedback cho don hang ${selectedOrder?.id}`} type="info" />
        
        <Form labelCol={{
          span: 25,
        }}
        onFinish={handleFeedback}
        form={form}
        >
          <Form.Item label="Rating" name="rating">
      <Rate />
      </Form.Item>
      <Form.Item label="Feedback" name="content">
      <Input.TextArea />
      </Form.Item>
      </Form>
      </Modal>
    </div>
  );
}

export default History;
