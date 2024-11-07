import { Button, Input, Popconfirm, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../../../config/axios";
import { toast } from "react-toastify";

function ManageUser() {
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]); // State for filtered results
  const [loading, setLoading] = useState(false);
  const [restoreLoading, setRestoreLoading] = useState(null); // Track which user is being restored
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Delete User
  const handleDelete = async (id) => {
    try {
      await api.delete(`v1/account/${id}`);
      toast.success("Deleted Successfully!");

      // Update the status in the local state after successful deletion
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === id ? { ...staff, isActive: false } : staff
        )
      );
      fetchStaff();
    } catch (err) {
      console.error("Error in handleDelete:", err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  // Restore User
  const handleRestore = async (id) => {
    setRestoreLoading(id); // Set loading for this particular user
    try {
      await api.put(`v1/account/${id}/restore`);
      toast.success("Restored Successfully!");

      // Update the status in the local state after successful restore
      setStaffs((prevStaffs) =>
        prevStaffs.map((staff) =>
          staff.id === id ? { ...staff, isActive: true } : staff
        )
      );
      fetchStaff();
    } catch (err) {
      console.error("Error in handleRestore:", err);
      const errorMessage = err.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      setRestoreLoading(null); // Clear the loading state
    }
  };

  // Fetch Users
  const fetchStaff = async () => {
    try {
      const response = await api.get("/v1/account/user");
      setStaffs(response.data);
      setFilteredStaffs(response.data); // Initialize filtered data
    } catch (err) {
      toast.error(err.response?.data || "An error occurred");
    }
  };

  // Filter staff by search term
  useEffect(() => {
    const filtered = staffs.filter(staff =>
      staff.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchTerm, staffs]);

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
      title: "Is Active",
      dataIndex: "active",
      key: "active",
      render: (e) => <Tag color={e ? "green" : "red"}>{e ? "True" : "False"}</Tag>
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "action",
      render: (id, staff) => (
        <>
          {staff.active ? (
            <Popconfirm
              title="Delete"
              description="Do you want to ban this user?"
              onConfirm={() => handleDelete(id)}
            >
              <Button type="primary" danger>
                Ban
              </Button>
            </Popconfirm>
          ) : (
            <Button
              type="default"
              onClick={() => handleRestore(id)}
              loading={restoreLoading === id} // Show loading if restoring this user
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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Input
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200 }}
        />
      </div>
      <Table columns={columns} dataSource={filteredStaffs} rowKey="id" loading={loading} />
    </div>
  );
}

export default ManageUser;
