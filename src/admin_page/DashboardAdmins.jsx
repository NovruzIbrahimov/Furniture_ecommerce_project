/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../admin_page/dashboardAdmins.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Input, Modal } from "antd";
import { Table, Form, InputNumber, Popconfirm, Typography } from "antd";
import { CiExport } from "react-icons/ci";
import { CiImport } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FiPlus } from "react-icons/fi";

const { confirm } = Modal;
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    width: "15%",
    editable: true,
  },
  {
    title: "Joining Date",
    dataIndex: "createdAt",
    width: "20%",
    editable: true,
  },
  {
    title: "Name",
    dataIndex: "name",
    width: "25%",
    editable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "30%",
    editable: true,
  },
];

function DashboardAdmins() {
  const [form] = Form.useForm();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState(null);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState(null);
  const [addCustomerModalVisible, setAddCustomerModalVisible] = useState(false);
  const [editCustomerModalVisible, setEditCustomerModalVisible] =useState(false);
  const [editCustomerForm] = Form.useForm();
  const [addCustomerForm] = Form.useForm();
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
      fetchData();
  }, []);

// ------------------------------------------AXIOS GET METODU-------------------------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/users",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      // console.log(response.data.data.product);
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
// -----------------------------------------AXIOS POST METODU------------------------------------------
  const handleAddAdmin = async (values) => {
    try {
      const response = await axios.post(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/register",
        {
          name: name,
          surname: "null",
          email: email,
          password: password,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Login successful", response.data);
      message.success(
        "id: " + response.data.data.user._id + "  Admin added successfully"
      );
      editCustomerForm.resetFields();
      setCustomers((prevProducts) => [...prevProducts, response.data]);
      setAddCustomerModalVisible(false);
    } catch (error) {
      console.error("Error creating admin:", error.message);
    }
  };
// -----------------------------------------AXIOS DELETE METODU----------------------------------------
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/users/${selectedDeleteRecord._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Login successful", response.data);
      message.success(response.data.data);

      setDeleteModalVisible(false);
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
// ----------------------------------------START-------------------------------------------------------
  const start = () => {
    setLoading(true);

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
// -----------------------------------SELECT CHANGE---------------------------------------------------
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
// ---------------------------------ROW SELECTION----------------------------------------------------
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
// ---------------------------------HAS SELECTED-----------------------------------------------------
  const hasSelected = selectedRowKeys.length > 0;
//----------------------------------------SHOW DELETE MODAL------------------------------------------
  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setSelectedDeleteRecord(record);
  };
// --------------------------------------SHOW ADD MODAL----------------------------------------------
  const showAddAdminModal = () => {
    setAddCustomerModalVisible(true);
  };
// --------------------------------------SHOW EDIT MODAL---------------------------------------------
  const showEditAdminModal = (record) => {
    setEditCustomerModalVisible(true);
    setSelectedEditRecord(record);
    editCustomerForm.resetFields();
    editCustomerForm.setFieldsValue({customerName: record.name,customerEmail: record.email })
  };
// -------------------------------------HANDLE INPUT CHANGE-----------------------------------------
  const handleInputChange = (fieldName, value) => {
    addCustomerForm.setFieldsValue({ [fieldName]: value });
    editCustomerForm.setFieldsValue({ [fieldName]: value });
  };
// ------------------------------------CANCEL-------------------------------------------------------
  const onCancel = () => {
    console.log("Canceling modal");
    addCustomerForm.resetFields();
    console.log("Form fields reset");
    setDeleteModalVisible(false);
    setAddCustomerModalVisible(false);
    setEditCustomerModalVisible(false);
    console.log("Modal visibility set to false");
  };
// -----------------------------------HANDLE SUBMIT------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAdmin();
  };

  return (
    <div className="dashboardCustomers-section">
      <div className="container">
        <div className="dashboardCustomers-top">
          <div className="dashboardCustomers-top-main">
            <div className="dashboardCustomers-top-main-left">
              <button className="bt-1-11">
                <CiExport style={{ marginRight: "6px" }} />
                Export
              </button>
              <button className="bt-2-22">
                <CiImport style={{ marginRight: "6px" }} />
                Import
              </button>
            </div>
            <div className="dashboardCustomers-top-main-right">
              <button className="bt-33" onClick={showAddAdminModal}>
                <FiPlus style={{ marginRight: "6px" }} />
                Add Admin
              </button>
            </div>
          </div>
        </div>

        <div className="dashboardCustomers-middle">
          <div className="dashboardCustomers-middle-main">
            <div className="middle-main-1-11">
              <Input
                placeholder="Search by name/email/phone"
                className="input-1-11"
                name="search"
              />
            </div>
            <div className="middle-main-4-44">
              <button className="bt-44-444">Filter</button>
              <button className="bt-55-555">Reset</button>
            </div>
          </div>
        </div>

        <div className="dashboardCustomers-bottom">
          <div>
            <Button
              type="primary"
              onClick={start}
              disabled={!hasSelected}
              loading={loading}
            >
              Reload
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
{/*-----------------------------------TABLE------------------------------------------ */}
          <Table
            rowSelection={rowSelection}
            columns={[
              ...columns,
              {
                title: "Action",
                dataIndex: "action",
                render: (_, record) => (
                  <>
                    <Typography.Link onClick={() => showEditAdminModal(record)}>
                      <FaRegEdit className="faedit" />
                    </Typography.Link>

                    <Typography.Link onClick={() => showDeleteModal(record)}>
                      <MdDeleteForever className="mddelete" />
                    </Typography.Link>
                  </>
                ),
              },
            ]}
            dataSource={customers}
            rowKey="_id"
          />
        </div>
{/*-----------------------------------ADD MODAL------------------------------------------ */}
        <Modal
          title="Add Admin"
          onCancel={onCancel}
          open={addCustomerModalVisible}
          onOk={() => addCustomerForm.submit()}
        >
          <Form
            onSubmit={handleSubmit}
            form={addCustomerForm}
            onFinish={handleAddAdmin}
          >
            <Form.Item
              label="Admin Name"
              name="adminName"
              rules={[
                {
                  required: true,
                  message: "Please enter the Admin name!",
                },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Admin Email"
              name="adminEmail"
              rules={[
                {
                  required: true,
                  message: "Please enter the Admin email!",
                },
              ]}
            >
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Admin Password"
              name="adminPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter the Admin password!",
                },
              ]}
            >
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

          </Form>
        </Modal>
{/*-----------------------------------EDIT MODAL----------------------------------------- */}
        <Modal
          title="Edit Admin"
          onCancel={onCancel}
          open={editCustomerModalVisible}
          onOk={() => editCustomerForm.submit()}
        >
          <Form
            form={editCustomerForm}
            initialValues={{
              customerName: selectedEditRecord ? selectedEditRecord.name : "",
              customerEmail: selectedEditRecord ? selectedEditRecord.email : "",
            }}
          >
            <Form.Item
              label="Admin Name"
              name="adminName"
              rules={[
                {
                  required: true,
                  message: "Please enter the Admin name!",
                },
              ]}
            >
              <Input
                onChange={(e) => handleInputChange("adminName", e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Admin Email"
              name="adminEmail"
              rules={[
                {
                  required: true,
                  message: "Please enter the Admin email!",
                },
              ]}
            >
              <Input
                onChange={(e) =>
                  handleInputChange("adminEmail", e.target.value)
                }
              />
            </Form.Item>
          </Form>
        </Modal>
{/*-----------------------------------DELETE MODAL--------------------------------------- */}
        <Modal
          title="Delete Admin"
          open={deleteModalVisible}
          onOk={() => handleDelete(selectedDeleteRecord)}
          onCancel={onCancel}
        ></Modal>
      </div>
    </div>
  );
}

export default DashboardAdmins;
