/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../admin_page/dashboardProducts.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Input,
  Modal,
  Typography,
  Select,
  Upload,
  Button,
  Table,
  Tooltip,
} from "antd";
import { FiPlus } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    render: (text) => (
      <Tooltip title={text}>
        <div
          style={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </Tooltip>
    ),
  },
  {
    title: "Product Title",
    dataIndex: "title",
  },
  {
    title: "Description",
    dataIndex: "description",
    render: (text) => (
      <Tooltip title={text}>
        <div
          style={{
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </Tooltip>
    ),
  },
  {
    title: "Product Price",
    dataIndex: "productPrice",
  },
  {
    title: "Brand Id",
    dataIndex: "brandId",
    render: (text) => (
      <Tooltip title={text}>
        <div
          style={{
            maxWidth: "100px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      </Tooltip>
    ),
  },
];

function DashboardProducts() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEditRecord, setSelectedEditRecord] = useState(null);
  const [selectedDeleteRecord, setSelectedDeleteRecord] = useState(null);
  const [addProductModalVisible, setAddProductModalVisible] = useState(false);
  const [editProductModalVisible, setEditProductModalVisible] = useState(false);
  const [editProductForm] = Form.useForm();
  const [addProductForm] = Form.useForm();
  const [products, setProducts] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [imageFileList, setImageFileList] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
    getBrandList();
  }, []);

  // --------------------------------------AXIOS GET METODU---------------------------------------------
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/products?page=1&perPage=100&stock=inStock",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setProducts(response.data.data.product);
    } catch (error) {
      // console.error("Error fetching data:", error.message);
    }
  };
  // --------------------------------------START-------------------------------------------------------
  const start = () => {
    // setLoading(true);
    // setTimeout(() => {
    //   setSelectedRowKeys([]);
    //   setLoading(false);
    // }, 1000);
  };
  // -----------------------------------------SELECT CHANGE-------------------------------------------
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  // -------------------------------------------ROW SELECTION-----------------------------------------
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;
  // ----------------------------------------DELETE MODAL---------------------------------------------
  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setSelectedDeleteRecord(record);
  };
  // ---------------------------------------ADD MODAL------------------------------------------------
  const showAddProductModal = () => {
    setAddProductModalVisible(true);
  };
  // ---------------------------------------EDIT MODAL------------------------------------------------
  const showEditProductModal = (record) => {
    setEditProductModalVisible(true);
    setSelectedEditRecord(record);
    editProductForm.resetFields();
    editProductForm.setFieldsValue({
      productName: record.title,
      productDescription: record.description,
      productPrice: record.productPrice,
    });
  };
  // --------------------------------------HANDLE INPUT CHANGE----------------------------------------
  const handleInputChange = (fieldName, value) => {
    addProductForm.setFieldsValue({ [fieldName]: value });
    editProductForm.setFieldsValue({ [fieldName]: value });
  };
  // -----------------------------------AXIOS DELETE METODU-------------------------------------------
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/products/${selectedDeleteRecord._id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Login successful", response.data);
      message.success(response.data.data);
      fetchData();
      setDeleteModalVisible(false);
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };
  // -------------------------------------AXIOS POST METODU--------------------------------------------
  const handleAddProduct = async (values) => {
    try {
      const response = await axios.post(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/products",
        {
          title: name,
          description: description,
          salePrice: 1,
          productPrice: price,
          brandId: brandId,
          stock: 100,
          images: imageFileList,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log("Login successful", response.data);
      message.success(
        "id: " + response.data.data._id + "  product added successfully"
      );
      fetchData();
      addProductForm.resetFields();
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setAddProductModalVisible(false);
    } catch (error) {
      console.error("Error creating product:", error.message);
    }
  };
  // -----------------------------------AXIOS PUT METODU----------------------------------------------
  const handleEditProduct = async (values) => {
    try {
      setSelectedEditRecord();

      const response = await axios.put(
        `https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/products/${selectedEditRecord._id}`,
        {
          title: values.productName,
          description: values.description,
          salePrice: 1,
          productPrice: values.productPrice,
          brandId: values.brandId,
          stock: 100,
          images: values.imageFileList,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      fetchData();
      setEditProductModalVisible(false);
      message.success("id: " + response.data.data.data + "");
      editProductForm.resetFields();
    } catch (error) {
      console.error("Error updating product:", error.message);
      message.error("Failed to update product. Please try again.");
      setSelectedEditRecord();
    }
  };
  // -----------------------------------AXIOS GET BRAND LIST METODU------------------------------------------------
  const getBrandList = async () => {
    try {
      const response = await axios.get(
        "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/dashboard/brands",
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);

      setBrandList(response.data.data);
    } catch (error) {
      // console.error("Error fetching data:", error.message);
    }
  };

  // -----------------------------------IMAGE UPLOAD-------------------------------------------------

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async (file) => {};

  const handleChange = ({ fileList }) => {
    console.log("fileList:" + JSON.stringify(fileList));
    const images = fileList
      .filter((file) => file.thumbUrl !== null && file.thumbUrl !== undefined)
      .map((file) => file.thumbUrl);
    console.log("Images:", images);
    setImageFileList(images, () => {
      console.log("Image file list updated:", imageFileList);
    });
  };

  

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // ----------------------------------CANCEL--------------------------------------------------------
  const onCancel = () => {
    console.log("Canceling modal");
    addProductForm.resetFields();
    console.log("Form fields reset");
    setSelectedEditRecord(null);
    setDeleteModalVisible(false);
    setAddProductModalVisible(false);
    setEditProductModalVisible(false);
    console.log("Modal visibility set to false");
  };
  // ----------------------------------HANDLE SUBMIT-------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct();
  };

  const handleBrandChange = (value) => {
    setBrandId(value);
    console.log(brandId);
  };

  return (
    <div className="dashboardProduct-section">
      <div className="container">
        <div className="dashboardProduct-top">
          <div className="dashboardProduct-top-main">
            <div className="dashboardProduct-top-main-left"></div>
            <div className="dashboardProduct-top-main-right">
              <button className="bt-33" onClick={showAddProductModal}>
                <FiPlus style={{ marginRight: "6px" }} />
                Add Product
              </button>
            </div>
          </div>
        </div>

        <div className="dashboardProduct-middle">
          <div className="dashboardProduct-middle-main">
            <div className="middle-main-1">
              <Input placeholder="Search Product" className="input-1" />
            </div>
            <div className="middle-main-2">
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Not Identified",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                  {
                    value: "3",
                    label: "Communicated",
                  },
                  {
                    value: "4",
                    label: "Identified",
                  },
                  {
                    value: "5",
                    label: "Resolved",
                  },
                  {
                    value: "6",
                    label: "Cancelled",
                  },
                ]}
              />
            </div>
            <div className="middle-main-3">
              <Select
                showSearch
                style={{
                  width: 200,
                }}
                placeholder="Price"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Low to High",
                  },
                  {
                    value: "2",
                    label: "Date added",
                  },
                  {
                    value: "3",
                    label: "Date updated",
                  },
                  {
                    value: "4",
                    label: "Status-out of stock",
                  },
                  {
                    value: "5",
                    label: "Status selling",
                  },
                  {
                    value: "6",
                    label: "High to Low",
                  },
                ]}
              />
            </div>
            <div className="middle-main-4">
              <button className="bt-44">Filter</button>
              <button className="bt-55">Reset</button>
            </div>
          </div>
        </div>

        <div className="dashboardProduct-bottom">
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
          {/*-------------------------------TABLE------------------------------------------- */}
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
                      onClick={() => showEditProductModal(record)}
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
            dataSource={products}
            rowKey="_id"
          />
        </div>
        {/* --------------------------------DELETE MODAl-----------------------------------*/}
        <Modal
          title="Delete Products"
          open={deleteModalVisible}
          onOk={() => handleDelete(selectedDeleteRecord)}
          onCancel={onCancel}
        ></Modal>
        {/* --------------------------------ADD MODAl-----------------------------------*/}
        <Modal
          title="Add Product"
          open={addProductModalVisible}
          onOk={() => addProductForm.submit()}
          onCancel={onCancel}
        >
          <Form
            onSubmit={handleSubmit}
            form={addProductForm}
            onFinish={handleAddProduct}
          >
            <Form.Item
              label="Product Title/Name"
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Please enter the product title/name!",
                },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>

            <Form.Item label="Product Description" name="productDescription">
              <Input.TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Product Price"
              name="productPrice"
              rules={[
                {
                  required: true,
                  message: "Please enter the product price!",
                },
              ]}
            >
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Select Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please select a brand!",
                },
              ]}
            >
              <Select
                placeholder="Select a brand"
                onChange={handleBrandChange}
                value={brandId}
              >
                {brandList.map((brand) => (
                  <Select.Option key={brand._id} value={brand._id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Product Images"
              name="productImages"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one product image!",
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={imageFileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={dummyRequest}
              >
                {imageFileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
        {/* --------------------------------EDIT MODAl-----------------------------------*/}
        <Modal
          title="Edit Product"
          onCancel={onCancel}
          open={editProductModalVisible}
          onOk={() => editProductForm.submit()}
        >
          <Form
            form={editProductForm}
            initialValues={{
              productName: selectedEditRecord ? selectedEditRecord.title : "",
              productDescription: selectedEditRecord
                ? selectedEditRecord.description
                : "",
              productPrice: selectedEditRecord
                ? selectedEditRecord.productPrice
                : "",
            }}
            onFinish={handleEditProduct}
          >
            <Form.Item
              label="Product Title/Name"
              name="productName"
              rules={[
                {
                  required: true,
                  message: "Please enter the product title/name!",
                },
              ]}
            >
              <Input
                onChange={(e) =>
                  handleInputChange("productName", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item label="Product Description" name="productDescription">
              <Input.TextArea
                onChange={(e) =>
                  handleInputChange("productDescription", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              label="Product Price"
              name="productPrice"
              rules={[
                {
                  required: true,
                  message: "Please enter the product price!",
                },
              ]}
            >
              <Input
                type="number"
                onChange={(e) =>
                  handleInputChange("productPrice", e.target.value)
                }
              />
            </Form.Item>

            <Form.Item
              label="Select Brand"
              name="brand"
              rules={[
                {
                  required: true,
                  message: "Please select a brand!",
                },
              ]}
            >
              <Select
                placeholder="Select a brand"
                onChange={handleBrandChange}
                value={brandId}
              >
                {brandList.map((brand) => (
                  <Select.Option key={brand._id} value={brand._id}>
                    {brand.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Product Images"
              name="productImages"
              rules={[
                {
                  required: true,
                  message: "Please upload at least one product image!",
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={imageFileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={dummyRequest}
              >
                {imageFileList.length >= 8 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default DashboardProducts;
