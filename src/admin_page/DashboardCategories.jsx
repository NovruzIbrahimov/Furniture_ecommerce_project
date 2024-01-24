/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../admin_page/dashboardCategories.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input, Modal, Typography } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { Divider, Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const { confirm } = Modal;
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Name",
    dataIndex: "name",
  },
 
];

function DashboardCategories() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState(null);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState(null);
  const [brands, setBrands] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [addBrandModalVisible, setAddBrandModalVisible] = useState(false);
  const [editBrandModalVisible, setEditBrandModalVisible] = useState(false);
  const [editBrandForm] = Form.useForm();
  const [addBrandForm] = Form.useForm();
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
      fetchData();
  }, []);

 
// ---------------------------------AXİOS GET METODU-------------------------------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/brands",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      console.log(response.data);

      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
// ---------------------------------START-------------------------------------------------------------
  const start = () => {
    setLoading(true);

    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
// ---------------------------------SELECET CHANGE-----------------------------------------------------
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
// -----------------------------ROW SELECTION---------------------------------------------------------
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
// --------------------------------DELETE MODAL--------------------------------------------------------
  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setSelectedDeleteRecord(record);
  };
// ----------------------------------ADD MODAL---------------------------------------------------------
  const showAddBrandModal = () => {
    setAddBrandModalVisible(true);
  };
// -----------------------------------EDIT MODAL-------------------------------------------------------
  const showEditBrandModal = (record) => {
    setEditBrandModalVisible(true);
    setSelectedEditRecord(record);
    editBrandForm.resetFields();
    editBrandForm.setFieldsValue({ name: record.name });
  };
//-------------------------------------HANDLE INPUT CHANGE---------------------------------------------
  const handleInputChange = (fieldName, value) => {
    addBrandForm.setFieldsValue({ [fieldName]: value });
    editBrandForm.setFieldsValue({ [fieldName]: value });
  };
// ----------------------------------AXIOS DELETE METODU-----------------------------------------------
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/brands/${selectedDeleteRecord._id}`,
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
// ----------------------------------AXIOS POST METODU-------------------------------------------------
  const handleAddBrand = async (values) => {
    
    try {
      const response = await axios.post(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/brands",
        {
          name: name,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Login successful", response.data);
      message.success(
        "id: " + response.data.data._id + "  brand added successfully"
      );
      editBrandForm.resetFields();
      setBrands((prevProducts) => [...prevProducts, response.data]);
      setAddBrandModalVisible(false);
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };
// ----------------------------------AXIOS PUT METODU---------------------------------------------------
  const handleEditBrand = async (values) => {
    try {
      const response = await axios.put(
        `https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/brands/${selectedEditRecord._id}`,
        values,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      setEditBrandModalVisible(false);
      message.success(
           response.data.data.data 
      );
      editBrandForm.resetFields();
    } catch (error) {
      console.error("Error updating brand:", error.message);
    }
  };

  const onCancel = () => {
    console.log("Canceling modal");
    addBrandForm.resetFields();
    console.log("Form fields reset");
    setDeleteModalVisible(false);
    setAddBrandModalVisible(false);
    setEditBrandModalVisible(false);
    console.log("Modal visibility set to false");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddBrand();
  };

  return (
    <div className="dashboardCategories-section">
      <div className="container">
        <div className="dashboardCategories-top">
          <div className="dashboardCategories-top-main">
            <div className="dashboardCategories-top-main-left">
             
            </div>
            <div className="dashboardCategories-top-main-right">
              
              <button className="bt-33-33" onClick={showAddBrandModal}>
                <FiPlus style={{ marginRight: "6px" }} />
                Add Category
              </button>
            </div>
          </div>
        </div>

        <div className="dashboardCategories-middle">
          <div className="dashboardCategories-middle-main">
            <div className="middle-main-1-1">
              <Input
                placeholder="Search by Category name"
                className="input-1-1"
              />
            </div>
            <div className="middle-main-4-4">
              <button className="bt-44-44">Filter</button>
              <button className="bt-55-55">Reset</button>
            </div>
          </div>
        </div>

        <div className="dashboardCategories-bottom">
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
            <Divider />

{/* -----------------------------------TABLE------------------------------------ */}
            <Table
              rowSelection={rowSelection}
              columns={[
                ...columns,
                {
                  title: "Action",
                  dataIndex: "action",
                  render: (_, record) => (
                    <>
                      <Typography.Link
                        onClick={() => showEditBrandModal(record)}
                      >
                        <FaRegEdit className="faedit" />
                      </Typography.Link>
                      <Typography.Link onClick={() => showDeleteModal(record)}>
                        <MdDeleteForever className="mddelete" />
                      </Typography.Link>
                    </>
                  ),
                },
              ]}
              dataSource={brands}
              rowKey="_id"
            />

          </div>
{/* --------------------------------DELETE MODAL----------------------------------*/}
          <Modal
            title="Delete Categories"
            open={deleteModalVisible}
            onOk={() => handleDelete(selectedDeleteRecord)}
            onCancel={onCancel}
          ></Modal>
{/* --------------------------------ADD MODAL----------------------------------*/}
          <Modal
            title="Add Category"
            open={addBrandModalVisible}
            onOk={() => addBrandForm.submit()}
            onCancel={onCancel}
          >
            <Form
              onSubmit={handleSubmit}
              form={addBrandForm}
              onFinish={handleAddBrand}
            >
              <Form.Item
                label="Category Name"
                name="productName"
                rules={[
                  {
                    required: true,
                    message: "Please enter the category name!",
                  },
                ]}
              >
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Item>

              
            </Form>
          </Modal>
{/* --------------------------------EDIT MODAL----------------------------------*/}
          <Modal
            title="Edit Category"
            open={editBrandModalVisible}
            onOk={() => editBrandForm.submit()}
            onCancel={onCancel}
          >
            <Form
              form={editBrandForm}
              initialValues={{
                name: selectedEditRecord ? selectedEditRecord.name : "",
              }}
              
              onFinish={handleEditBrand}
            >
              <Form.Item
                label="Category Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter the category name!",
                  },
                ]}
              >
                <Input
                  // onChange={(e) =>
                  //   handleInputChange("name", e.target.value)
                  // }
                />
              </Form.Item>

              
            </Form>
          </Modal>

        </div>
      </div>
    </div>
  );
}

export default DashboardCategories;
