/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../Order/dashboardOrders.css";
import {
  Input,
  Select,
  Button,
  DatePicker,
  Table,
  Typography,
  message,
} from "antd";
import { IoIosCloudDownload } from "react-icons/io";
import api from "../../../../config/axiosConfig";
import { CiDeliveryTruck } from "react-icons/ci";

const { Option } = Select;

const selectOptions1 = ["delivered", "Pending", "Processing", "Cancel"];
const selectOptions2 = [
  "Last 5 days orders",
  "Last 7 days orders",
  "Last 15 days orders",
  "Last 30 days orders",
];
const selectOptions3 = ["Cash", "Card", "Credit"];

function DashboardOrders() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get("/dashboard/orders");
      setData(response.data.data.data);
    } catch (error) {
      console.error("Error fetching data:");
    }
  };

  const showEditOrderModal = (action, record) => {
    setSelectedId(record._id);
    setSelectedAction(action);
  };

  const doAction = (record) => {
    setSelectedId(record._id);
    handleUpdate(record);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await api.put(`/dashboard/orders/${selectedId}`, {
        status: selectedAction,
      });
      fetchData();
    } catch (error) {
      message.error("Failed to update product. Please try again.");
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleStatusChange = (value) => {
    setStatusFilter(value);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleDateChange = (dates) => {
    if (dates && dates.length === 2 && dates[0] && dates[1]) {
      setDateRange(dates);
    }
  };

  const hasSelected = selectedRowKeys.length > 0;

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Sifariş vaxtı", dataIndex: "createdAt", key: "createdAt" },
    { title: "Ad", dataIndex: ["customer", "name"], key: "customerName" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Cəm", dataIndex: "total", key: "total" },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Select
          style={{ width: 120 }}
          onChange={(value) => showEditOrderModal(value, record)}
        >
          {selectOptions1.map((option, index) => (
            <Option key={index} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Yeniləmə",
      dataIndex: "update",
      key: "update",
      render: (_, record) => (
        <Typography.Link onClick={() => doAction(record)}>
          <CiDeliveryTruck className="delivery-icon" />
        </Typography.Link>
      ),
    },
  ];

  return (
    <div className="dashboardOrders-section">
      <div className="container">
        <div className="dashboardOrders-top">
          <div className="dashboardOrders-top-main">
            <Input
              placeholder="Axtarış"
              style={{ marginRight: 10, width: 220 }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Select
              style={{ width: 220, marginRight: 10 }}
              placeholder="Status"
              onChange={handleStatusChange}
            >
              {selectOptions1.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: 220, marginRight: 10 }}
              placeholder="Sifariş limiti"
              onChange={(value) => console.log(value)}
            >
              {selectOptions2.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <Select
              style={{ width: 220, marginRight: 10 }}
              placeholder="Metod"
              onChange={(value) => console.log(value)}
            >
              {selectOptions3.map((option, index) => (
                <Option key={index} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
            <Button style={{ width: 220, backgroundColor: "#10B981" }}>
              Sifarişləri yükləyin
              <IoIosCloudDownload />
            </Button>
          </div>
        </div>

        <div className="dashboardOrders-middle">
          <div className="dashboardOrders-middle-main">
            <DatePicker
              style={{ marginRight: 10, width: 380 }}
              placeholder="Başlama vaxtı"
              onChange={handleDateChange}
            />
            <DatePicker
              style={{ marginRight: 10, width: 380 }}
              placeholder="Bitmə vaxtı"
              onChange={handleDateChange}
            />
            <Button
              style={{
                marginRight: 10,
                width: 200,
                backgroundColor: "#047857",
              }}
            >
              Filtrləyin
            </Button>
            <Button style={{ width: 200 }}>Sıfırlayın</Button>
          </div>
        </div>

        <div className="dashboardOrders-bottom">
          <div>
            <Button type="primary" disabled={!hasSelected}>
              Yenidən yükləyin
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </span>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
            rowKey="_id"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardOrders;
