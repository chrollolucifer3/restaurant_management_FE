import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/TableCustom";
import InputRES from "../../components/UI/Input";
import ButtonRES from "../../components/UI/Button";
import CreateOrUpdate from "./components/CreateOrUpdate";
import BookingTable from "./components/bookingTable";
import Order from "./components/order";
import { useDispatch, useSelector } from "react-redux";
import { getListTable } from "../../api/table";
import { Tag } from "antd";

// import {  DeleteOutlined } from "@ant-design/icons";
// import _ from "lodash";
import {
  setVisibleModalCancelBookingTable,
  setVisibleModalReceiveBookingTable,
} from "../../states/modules/table";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import {
  setVisibleModalCreateOrUpdateBookingTable,
  setVisibleModalCreateOrUpdateTable,
  setVisibleModalShowOrder,
} from "../../states/modules/table";
import {
  handleCancelBookingTable,
  handleReceiveBookingTable,
} from "../../api/table";

function Table() {
  // const authUser = useSelector((state) => state.auth.authUser);
  const dispatch = useDispatch();
  const tables = useSelector((state) => state.table.tables);
  const isLoadingTableTable = useSelector(
    (state) => state.table.isLoadingTableTable
  );
  const paginationListTable = useSelector(
    (state) => state.table.paginationListTable
  );

  const visibleModalCancelBookingTable = useSelector(
    (state) => state.table.visibleModalCancelBookingTable
  );

  const visibleModalReceiveBookingTable = useSelector(
    (state) => state.table.visibleModalShowReceiveTable
  );

  const visibleModalShowOrder = useSelector(
    (state) => state.table.visibleModalShowOrder
  );

  const [configModal, setConfigModal] = useState({
    title: "Create table",
    type: "CREATE",
  });
  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    status: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getListTable(dataFilter));
  }, [dataFilter, dispatch]);

  const columns = [
    {
      title: "Table Number",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Seat Number",
      dataIndex: "seat_number",
      key: "seat_number",
    },
    {
      title: "Customers",
      children: [
        {
          title: "Full Name",
          dataIndex: "listCustomers",
          key: "full_name",
          render: (listCustomers) =>
            listCustomers.length > 0
              ? listCustomers.map((customer) => (
                  <div
                    key={customer.customerId}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {customer.full_name}
                  </div>
                ))
              : "",
        },
        {
          title: "Phone Number",
          dataIndex: "listCustomers",
          key: "phone_number",
          render: (listCustomers) =>
            listCustomers.length > 0
              ? listCustomers.map((customer) => (
                  <div
                    key={customer.customerId}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {customer.phone_number}
                  </div>
                ))
              : "",
        },
        {
          title: "Status",
          dataIndex: "listCustomers",
          key: "status",
          render: (listCustomers) =>
            listCustomers.length > 0 ? (
              listCustomers.map((customer) => (
                <div
                  key={customer.customerId}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {customer.status === "occupied" ? (
                    <Tag color="red">Occupied</Tag>
                  ) : (
                    <Tag color="blue">Reserved</Tag>
                  )}
                </div>
              ))
            ) : (
              <Tag color="green">Available</Tag>
            ),
        },
        {
          title: "Reserved Time",
          dataIndex: "listCustomers",
          key: "time_reserved",
          render: (listCustomers) =>
            listCustomers.length > 0
              ? listCustomers.map((customer) => (
                  <div
                    key={customer.customerId}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    {customer.time_reserved}
                  </div>
                ))
              : "",
        },
        {
          title: "Action",
          dataIndex: "listCustomers",
          key: "action",
          width: "150px",
          render: (listCustomers, table) =>
            listCustomers.length > 0
              ? listCustomers.map((customer) => (
                  <div
                    key={customer.customerId}
                    style={{
                      display: "flex", // Dùng Flexbox để căn chỉnh các nút thẳng hàng
                      justifyContent: "center", // Căn các nút cách đều trong một hàng
                      alignItems: "center", // Căn các nút theo chiều dọc
                      padding: "10px",
                      marginBottom: "10px",
                      width: "100%", // Đảm bảo chiều rộng của hàng
                      boxSizing: "border-box", // Đảm bảo padding không làm lệch các cột
                    }}
                  >
                    {/* Nút Cancel */}
                    {customer.status !== "occupied" && (
                      <button
                        onClick={() =>
                          handleShowCancel(customer.table_customer_id)
                        }
                        style={{
                          background: "#ff4d4f",
                          color: "white",
                          border: "none",
                          marginRight: "10px",
                          padding: "5px 10px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Cancel
                      </button>
                    )}

                    {/* Nút Receive */}
                    {customer.status !== "occupied" && (
                      <button
                        onClick={() =>
                          handleShowReceiveTable(customer.table_customer_id)
                        }
                        style={{
                          background: "#0bbc64",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Receive
                      </button>
                    )}

                    {/* Nút Order */}
                    {customer.status === "occupied" && (
                      <button
                        onClick={() => handleShowOrder(table)}
                        style={{
                          background: "#1677ff",
                          color: "white",
                          border: "none",
                          padding: "5px 10px",
                          cursor: "pointer",
                          borderRadius: "4px",
                        }}
                      >
                        Order
                      </button>
                    )}
                  </div>
                ))
              : "",
        },
      ],
    },
  ];

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
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

  const [selectedId, setSelectedId] = useState(null);

  const handleShowCancel = (id) => {
    setSelectedId(id);
    dispatch(setVisibleModalCancelBookingTable(true));
  };

  const [selectedTable, setSelectedTable] = useState(null);

  const handleShowOrder = (table) => {
    setSelectedTable(table);
    dispatch(setVisibleModalShowOrder(true));
  };

  const handleConfirmCancel = () => {
    if (selectedId) {
      const payload = {
        listTableCustomerId: [{ id: String(selectedId) }], // Định dạng payload
      };
      dispatch(handleCancelBookingTable(payload)); // Gửi payload
    }
  };

  const handleShowReceiveTable = (id) => {
    setSelectedId(id);
    dispatch(setVisibleModalReceiveBookingTable(true));
  };

  const handleConfirmReceiveTable = () => {
    if (selectedId) {
      const payload = {
        listTableCustomerId: [{ id: String(selectedId) }], // Định dạng payload
      };
      dispatch(handleReceiveBookingTable(payload)); // Gửi payload
    }
  };

  const HandleBooking = () => {
    dispatch(setVisibleModalCreateOrUpdateBookingTable(true));
    setConfigModal({
      title: "Booking table",
      type: "CREATE",
    });
  };

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateTable(true));
    setConfigModal({
      title: "Create table",
      type: "CREATE",
    });
  };

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Total records ({paginationListTable.totalRecord})
            </span>
            <div className={styles.btnWrap}>
              <ButtonRES
                onClick={HandleBooking}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={"Booking"}
              />
            </div>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputRES
                placeholder="Search by name"
                value={dataFilter.keySearch}
                onChange={handleSearch}
              />
            </div>

            <div className={styles.btnWrap}>
              <ButtonRES
                onClick={handleCreate}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={"+ Create"}
              />
            </div>
          </div>

          {/* Table chính */}
          <TableCustom
            loading={isLoadingTableTable}
            columns={columns}
            dataSource={tables}
            rowKey={(record) => record.id}
            pagination={paginationListTable}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate table={tables} configModal={configModal} />
        <BookingTable tables={tables} configModal={configModal} />
        <Order
          isModalOpen={visibleModalShowOrder}
          configModal={{ title: "Order Details" }}
          onClose={() => dispatch(setVisibleModalShowOrder(false))}
          table={selectedTable}
        />

        <ModalConfirm
          isModalOpen={visibleModalCancelBookingTable}
          title={`Do you want cancel?`}
          textBtnConfirm="Delete"
          description={`Are you sure you want to cancel? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalCancelBookingTable(false))}
          onConfirm={() => handleConfirmCancel()}
        />

        <ModalConfirm
          isModalOpen={visibleModalReceiveBookingTable}
          title={`Do you want ?`}
          textBtnConfirm="Receive"
          description={`Are you sure you want to ? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalReceiveBookingTable(false))}
          onConfirm={() => handleConfirmReceiveTable()}
        />
      </div>
    </MainLayout>
  );
}

export default Table;
