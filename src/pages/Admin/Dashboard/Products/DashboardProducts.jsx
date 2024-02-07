/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../Products/dashboardProducts.css";
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
import api from "../../../../config/axiosConfig";
import { message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { BounceLoader } from "react-spinners";

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
    title: "Stock",
    dataIndex: "stock",
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
  const [filterTitle, setFilterTitle] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    fetchData();
    getBrandList();
    setLoadingPage(false);
  }, [filterTitle, filterCategory, sortOption]);

  // --------------------------------------AXIOS GET METODU---------------------------------------------
  const fetchData = async () => {
    try {
      const response = await api.get("/dashboard/products", {
        params: {
          page: 1,
          perPage: 100,
          title: filterTitle,
          brandId: filterCategory,
          sort: sortOption === "priceLowToHigh" ? "productPrice" : sortOption,
        },
      });
      setProducts(response.data.data.product);
    } catch (error) {
      // console.error("Error fetching data:", error.message);
    }
  };
  // --------------------------------------START-------------------------------------------------------
  const start = () => {};
  // -----------------------------------------SELECT CHANGE-------------------------------------------
  const onSelectChange = (newSelectedRowKeys) => {
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
      const response = await api.delete(
        `/dashboard/products/${selectedDeleteRecord._id}`
      );

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
      const response = await api.post("/dashboard/products", {
        title: name,
        description: description,
        salePrice: price,
        productPrice: price,
        brandId: brandId,
        stock: 100,
        images: imageFileList,
      });

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

      const response = await api.put(
        `/dashboard/products/${selectedEditRecord._id}`,
        {
          title: values.productName,
          description: values.description,
          salePrice: values.productPrice,
          productPrice: values.productPrice,
          brandId: values.brandId,
          stock: 100,
          images: values.imageFileList,
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
      const response = await api.get("/dashboard/brands");

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

  const fileToBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });

  const handleChange = async ({ fileList }) => {
    const images = [];
    for await (const file of fileList) {
      const base64 = await fileToBase64(file.originFileObj);
      images.push(base64);
    }
    setImageFileList(images);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  // ----------------------------------CANCEL--------------------------------------------------------
  const onCancel = () => {
    addProductForm.resetFields();
    setSelectedEditRecord(null);
    setDeleteModalVisible(false);
    setAddProductModalVisible(false);
    setEditProductModalVisible(false);
  };
  // ----------------------------------HANDLE SUBMIT-------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddProduct();
  };

  const handleBrandChange = (value) => {
    setBrandId(value);
  };

  const getBrandName = (brandId) => {
    const brand = brandList.find((b) => b._id === brandId);
    return brand ? brand.name : "Unknown Brand";
  };

  const options = brandList.map((b) => ({
    value: b._id,
    label: getBrandName(b._id),
  }));

  const handleTitleFilterChange = (e) => {
    setFilterTitle(e.target.value);
  };

  const handleCategoryFilterChange = (value) => {
    setFilterCategory(value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const resetFilters = () => {
    setFilterTitle("");
    setFilterCategory("");
    setSortOption("");
  };

  return (
    <div className="dashboardProduct-section">
      {loadingPage ? (
        <div className="loading-spinner">
          <BounceLoader color="#f3f013" size={60} speedMultiplier={1} />
        </div>
      ) : (
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
                <Input
                  placeholder="Search Product"
                  className="input-1"
                  value={filterTitle}
                  onChange={handleTitleFilterChange}
                />
              </div>
              <div className="middle-main-2">
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  placeholder="Category"
                  options={options}
                  onChange={handleCategoryFilterChange}
                />
              </div>
              <div className="middle-main-3">
                <Select
                  showSearch
                  style={{
                    width: 200,
                  }}
                  onChange={handleSortChange}
                  placeholder="Price"
                >
                  <Select.Option key="priceLowToHigh" value="priceLowToHigh">
                    Low to High
                  </Select.Option>
                  <Select.Option key="priceHighToLow" value="priceHighToLow">
                    High to Low
                  </Select.Option>
                </Select>
              </div>
              <div className="middle-main-4">
                <button className="bt-44" onClick={fetchData}>
                  Filter
                </button>
                <button className="bt-55" onClick={resetFilters}>
                  Reset
                </button>
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
                    message: "Please upload a product image!",
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
                    message: "Please upload a product image!",
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
      )}
    </div>
  );
}

export default DashboardProducts;
