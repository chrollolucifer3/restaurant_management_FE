import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import ButtonRES from "../../components/UI/Button";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListPayment } from "../../api/payment";
import ModalShowListFood from "./ModalShowListFood";
import {
  setVisibleModalShowListFood,
  setBills,  // Action để reset bills
  setPaymentSuccess, // Action để reset trạng thái thanh toán
} from "../../states/modules/payment";

function Payment() {
  const dispatch = useDispatch();
  const payments = useSelector((state) => state.payment?.payments || []);
  const isLoadingTablePayment = useSelector(
    (state) => state.payment?.isLoadingTablePayment || false
  );
  const visibleModalShowListFood = useSelector(
    (state) => state.payment?.visibleModalShowListFood || false
  );
  const bills = useSelector((state) => state.payment?.bills || []);
  const isPaymentSuccess = useSelector(
    (state) => state.payment?.isPaymentSuccess || false
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedTableIds, setSelectedTableIds] = useState([]);

  useEffect(() => {
    dispatch(getListPayment());
  }, [dispatch]);

  const handlePayment = () => {
    const selectedTableIdsArray = selectedRows.map((row) => ({
      id: row.table_id,
    }));
  
    // Cập nhật state để truyền vào modal
    setSelectedTableIds(selectedTableIdsArray);
  
    // Hiển thị modal
    dispatch(setVisibleModalShowListFood(true));
    };

  const handleModalClose = () => {
    dispatch(setVisibleModalShowListFood(false)); // Đóng modal
  };

  useEffect(() => {
    const handlePrintBill = () => {
      // Kiểm tra sự tồn tại của bills và listTableResponse
      if (
        !bills ||
        !bills.listTableResponse ||
        !Array.isArray(bills.listTableResponse)
      ) {
        console.error(
          "Bills data is missing or listTableResponse is not an array"
        );
        return;
      }
  
      // Mở cửa sổ in
      const printWindow = window.open("", "", "height=600,width=800");
      printWindow.document.write("<html><head><title>Bill</title>");
      
      // Thêm CSS vào trong phần head
      printWindow.document.write(`
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            color: #000; /* Đảm bảo tất cả chữ đều màu đen */
          }
          h1 {
            text-align: center;
            color: #000; /* Tên cửa hàng vẫn màu đen */
          }
          h3 {
            text-align: left;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
          }
          th {
            background-color: #f4f4f4;
            font-weight: bold;
          }
          td {
            background-color: #fff;
          }
          .table-summary {
            margin-top: 30px;
          }
        </style>
      `);
      printWindow.document.write("</head><body>");
  
      // Thêm thông tin nhà hàng, mã hóa đơn và ngày
      const restaurantName = "LAST STOP"; // Tên nhà hàng của bạn
      const currentDate = new Date().toLocaleDateString(); // Lấy ngày hiện tại
  
      // Tên nhà hàng được căn giữa
      printWindow.document.write("<h1>" + restaurantName + "</h1>");
      printWindow.document.write("<h3>Date: " + currentDate + "</h3>");
  
      // Thêm thông tin khách hàng trước bảng
      printWindow.document.write(
        "<h3>Customer: " +
          (bills.customer && bills.customer.customer_name
            ? bills.customer.customer_name
            : "N/A") +
          "</h3>"
      );
      printWindow.document.write(
        "<h3>Phone: " +
          (bills.customer && bills.customer.phone_number
            ? bills.customer.phone_number
            : "N/A") +
          "</h3>"
      );
  
      printWindow.document.write("<h1>Bill Details</h1>");
      printWindow.document.write('<table>');
  
      // Thêm tiêu đề cho bảng
      printWindow.document.write(
        "<thead><tr><th>Table</th><th>Name</th><th>Quantity</th><th>Price</th><th>Total Price</th></tr></thead>"
      );
      printWindow.document.write("<tbody>");
  
      // Lặp qua danh sách các bàn và món ăn của từng bàn
      bills.listTableResponse.forEach((table) => {
        table.listFoods.forEach((bill) => {
          const price = bill.price || 0;
          const quantity = bill.quantity || 0;
          const totalPrice = price * quantity;
  
          printWindow.document.write(
            `<tr><td>${table.number}</td><td>${bill.name}</td><td>${quantity}</td><td>${price.toLocaleString()} VND</td><td>${totalPrice.toLocaleString()} VND</td></tr>`
          );
        });
      });
  
      printWindow.document.write("</tbody></table>");
  
      // Kiểm tra và đảm bảo các giá trị hợp lệ trước khi hiển thị
      const totalOrder =
        typeof bills.totalOrder === "number" ? bills.totalOrder : 0;
      const totalSale = typeof bills.totalSale === "number" ? bills.totalSale : 0;
      const totalAfterDiscount =
        typeof bills.totalAfterUseDiscount === "number"
          ? bills.totalAfterUseDiscount
          : 0;
  
      printWindow.document.write(
        `<h3>Total Order: ${totalOrder.toLocaleString()} VND</h3>`
      );
      printWindow.document.write(
        `<h3>Total Sale: ${totalSale.toLocaleString()} VND</h3>`
      );
      printWindow.document.write(
        `<h3>Total After Discount: ${totalAfterDiscount.toLocaleString()} VND</h3>`
      );
  
      printWindow.document.write("</body></html>");
      printWindow.document.close(); // Necessary for the print dialog to show
      printWindow.focus(); // Đảm bảo cửa sổ in được focus trước khi in
      printWindow.print(); // Trigger the print dialog immediately
  
      // Sau khi in hóa đơn, reset lại state
      dispatch(setBills([])); // Reset bills về giá trị rỗng
      dispatch(setPaymentSuccess(false)); // Reset trạng thái thanh toán
    };
  
    if (isPaymentSuccess) {
      handlePrintBill(); // In hóa đơn khi thanh toán thành công
    }
  }, [bills, isPaymentSuccess, dispatch]); // Thêm dependencies cần thiết
  
  
  

  const columns = [
    {
      title: "Number",
      dataIndex: "number",
      key: "number",
      render: (text, record) => <span>{record.number}</span>,
    },
    {
      title: "Seat number",
      dataIndex: "seat_number",
      key: "seat_number",
      render: (text, record) => <span>{record.seat_number}</span>,
    },
    {
      title: "Customer name",
      dataIndex: "full_name",
      key: "full_name",
      render: (text, record) => <span>{record.full_name}</span>,
    },
    {
      title: "Phone number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text, record) => <span>{record.phone_number}</span>,
    },
    {
      title: "Time reserved",
      dataIndex: "time_reserved",
      key: "time_reserved",
      render: (text, record) => <span>{record.time_reserved}</span>,
    },
  ];

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.boxFilterWrap}>
            <div className={styles.btnWrap}>
              <ButtonRES
                onClick={handlePayment}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={"Payment"}
              />
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={payments}
            loading={isLoadingTablePayment}
            rowKey={(record) => record.table_id}
            pagination={false}
            rowSelection={{
              selectedRowKeys: selectedRows.map((record) => record.table_id),
              onChange: (selectedRowKeys, selectedRows) => {
                setSelectedRows(selectedRows);
              },
            }}
          />
        </div>
      </div>

      <ModalShowListFood
        isModalOpen={visibleModalShowListFood}
        configModal={{
          title: "List Food",
        }}
        onClose={handleModalClose}
        selectedTableIds={selectedTableIds}
      />
    </MainLayout>
  );
}

export default Payment;
