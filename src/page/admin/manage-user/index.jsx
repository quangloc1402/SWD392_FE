import { Button, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageUser() {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Delete User
  const handleDelete = async (id) => {
    try {
      await api.delete(`v1/account/${id}`);
      toast.success("Deleted Successfully!");
      fetchStaff();
    } catch (err) {
      console.error("Error in handleDelete:", err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  // Restore User
  const handleRestore = async (id) => {
    try {
      await api.put(`v1/account/${id}/restore`);
      toast.success("Restored Successfully!");
      // Update the status in the local state after successful restore
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === id ? { ...staff, isActive: true } : staff
        )
      );
    } catch (err) {
      console.error("Error in handleRestore:", err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  // Fetch Users
  const fetchStaff = async () => {
    try {
      const response = await api.get("/v1/account/user");
      setStaffs(response.data);
    } catch (err) {
      toast.error(err.response?.data || "An error occurred");
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
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive", // Assuming this field indicates if the user is active
      key: "status",
      render: (isActive) => (isActive ? "Active" : "Deleted"), // Display status based on isActive
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, staff) => (
        <>
          <Popconfirm
            title="Delete"
            description="Do you want to delete this user?"
            onConfirm={() => handleDelete(id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          {!staff.isActive && ( // Show Restore button only if the user is deleted
            <Button
              type="default"
              onClick={() => handleRestore(id)}
              style={{ marginLeft: 8 }}
            >
              Restore
            </Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>User Management</h1>
      <Table columns={columns} dataSource={staffs} rowKey="id" loading={loading} />
    </div>
  );
}

export default ManageUser;