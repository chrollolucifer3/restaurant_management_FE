import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/TableCustom";
import InputRES from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { getListBill } from "../../api/bill";
import { InfoCircleOutlined } from "@ant-design/icons";
import ModalOrder from "../../components/UI/ModalOrder"; // Đảm bảo đường dẫn chính xác
import { setVisibleModalDetailOrder } from "../../states/modules/bill"; // Import action setVisibleModalDetailOrder

function Bill() {
  const dispatch = useDispatch();
  // const authUser = useSelector((state) => state.auth.authUser);
  const bills = useSelector((state) => state.bill.bills);
  const isLoadingListBill = useSelector((state) => state.bill.isLoadingListBill);
  const paginationListBill = useSelector((state) => state.bill.paginationListBill);
  const visibleModalDetailOrder = useSelector((state) => state.bill.visibleModalDetailOrder);

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    status: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  const [currentOrderId, setCurrentOrderId] = useState(null); // Lưu id của đơn hàng

  useEffect(() => {
    dispatch(getListBill(dataFilter));
  }, [dataFilter, dispatch]);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerFullName",
      key: "customer_name",
    },
    {
      title: "Customer Phone",
      dataIndex: "customerPhoneNumber",
      key: "customer_phone",
    },
    {
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
      render: (text) => text.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleString("vi-VN"),
      defaultSortOrder: "",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: "80px",
      render: (record) => (
        <div className={styles.btnAction}>
          <div
            onClick={() => handleShowDetailOrder(record.id)}
            className={styles.btnWrap}
            title="Detail"
          >
            <InfoCircleOutlined />
          </div>
        </div>
      ),
    },
  ];

  const data = bills.map((order) => ({
    key: order.id,
    id: order.id,
    total_price: order.total_price,
    createdAt: order.createdAt,
    customerFullName: order.customer.full_name,
    customerPhoneNumber: order.customer.phone_number,
  }));

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  };

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page });
  };

  const onChange = (pagination, filters, sorter) => {
    setDataFilter({
      ...dataFilter,
      order: sorter.order
        ? sorter.order === "descend"
          ? "desc"
          : "asc"
        : null,
      column: sorter.field ? sorter.field : null,
    });
  };

  const handleShowDetailOrder = (orderId) => {
    setCurrentOrderId(orderId); // Lưu id đơn hàng vào state
    dispatch(setVisibleModalDetailOrder(true)); // Hiển thị modal
  };

  const handleCloseModal = () => {
    setCurrentOrderId(null); // Xóa id đơn hàng khi đóng modal
    dispatch(setVisibleModalDetailOrder(false)); // Ẩn modal
  };

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Total records ({paginationListBill.totalRecord})
            </span>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputRES
                placeholder="Search by name"
                value={dataFilter.keySearch}
                onChange={handleSearch}
              />
            </div>
          </div>

          <TableCustom
            loading={isLoadingListBill}
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={paginationListBill}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <ModalOrder
          isModalOpen={visibleModalDetailOrder}
          title="Order Detail"
          onClose={handleCloseModal}
          orderId={currentOrderId } // Truyền id đơn hàng
        />
      </div>
    </MainLayout>
  );
}

export default Bill;
