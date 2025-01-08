import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Modal, Button, List, InputNumber } from "antd";
import { getListMenu } from "api/menu";
import styles from "./styles.module.scss";
import InputRES from "components/UI/Input";

import {
  handleConfirmOrder,
  getListFood,
  updateListFoodOrder,
} from "api/table";
import FoodList from "components/UI/FoodList";

Order.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  orders: PropTypes.array,
  onOrderUpdate: PropTypes.func,
  table: PropTypes.object, // Thêm prop table để nhận thông tin bàn
};

Order.defaultProps = {
  isModalOpen: false,
  configModal: {
    title: "Create Order",
  },
  orders: [],
  onOrderUpdate: () => {},
  table: null,
};

function Order({
  isModalOpen,
  configModal,
  onClose,
  // orders,
  onOrderUpdate,
  table,
}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const addItem = (item) => {
    const existingItem = selectedItems.find(
      (selected) => selected.id === item.id
    );
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((selected) =>
          selected.id === item.id
            ? { ...selected, quantity: selected.quantity + 1 }
            : selected
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      setSelectedItems(selectedItems.filter((item) => item.id !== id));
    } else {
      setSelectedItems(
        selectedItems.map((item) =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return selectedItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  };

  const handleConfirm = async () => {
    const payload = {
      tableId: table.id,
      listFood: selectedItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await dispatch(handleConfirmOrder(payload));
      onOrderUpdate(selectedItems); // Cập nhật danh sách order
      onClose(); // Đóng modal sau khi xác nhận
    } catch (error) {
      console.error("Failed to confirm order:", error);
    }
  };
  const handleUpdate = async () => {
    // Đảm bảo selectedItems là một mảng và có giá trị hợp lệ
    if (!Array.isArray(selectedItems) || selectedItems.length === 0) {
      console.error("Selected items must be a non-empty array");
      return;
    }

    // Kiểm tra xem mỗi item trong selectedItems có chứa id và quantity hợp lệ không
    const isValidItems = selectedItems.every(
      (item) =>
        item.id && typeof item.quantity === "number" && item.quantity > 0
    );
    if (!isValidItems) {
      console.error(
        "Each item must have a valid id and quantity (greater than 0)"
      );
      return;
    }

    // Tạo payload với danh sách món ăn hợp lệ
    const payload = [
      {
        tableId: table.id,
        listFoods: selectedItems.map((item) => ({
          id: String(item.id), // Chuyển id thành chuỗi
          quantity: String(item.quantity), // Chuyển quantity thành chuỗi
        })),
      },
    ];

    try {
      // Gửi payload đến API hoặc redux action
      await dispatch(updateListFoodOrder(payload));
      // Cập nhật danh sách order
      onOrderUpdate(selectedItems);
      // Đóng modal sau khi xác nhận
      onClose();
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  const dispatch = useDispatch();
  const foods = useSelector((state) => state.menu.menus);
  const listFood = useSelector((state) => state.table.listFoods);

  useEffect(() => {
    if (table && table.id) {
      const listTables = [{ id: table.id }];
      dispatch(getListFood({ listTables }));
    }
  }, [table, dispatch]);

  // Đồng bộ listFood vào selectedItems khi modal mở
  useEffect(() => {
    if (isModalOpen && listFood?.length > 0) {
      // Lọc các mục hợp lệ, loại bỏ các mục có id hoặc quantity là null
      const itemsWithQuantity = listFood
        .filter((item) => item.id && item.name && item.price) // Lọc những món có id, name, price hợp lệ
        .map((item) => ({
          ...item,
          quantity: item.quantity,
        }));
  
      setSelectedItems(itemsWithQuantity); // Cập nhật selectedItems với danh sách hợp lệ
    }
  }, [isModalOpen, listFood]);

  const paginationListMenu = useSelector(
    (state) => state.menu.paginationListMenu
  );

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

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  };

  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    status: "",
    perPage: 12,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getListMenu(dataFilter));
  }, [dataFilter, dispatch]);

  return (
    <Modal
      title={`${configModal.title} - Table: ${
        table ? table.number : "Unknown"
      }`}
      open={isModalOpen}
      onCancel={onClose}
      width={1200}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="action"
          type="primary"
          onClick={listFood.every(item => item.id !== null && item.name !== null && item.quantity !== null) ? handleUpdate : handleConfirm}
>
  {listFood.every(item => item.id !== null && item.name !== null && item.quantity !== null) ? "Update" : "Confirm"}
        </Button>,
      ]}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Danh sách món ăn */}
        <div style={{ flex: 6 }}>
          <h3>Menu</h3>
          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputRES
                placeholder="Search by name"
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <FoodList
            dataSource={foods}
            rowKey={(menu) => menu.id}
            pagination={paginationListMenu}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
            onSelectItem={addItem}
          />
        </div>

        {/* Danh sách món đã chọn */}
        <div style={{ flex: 4 }}>
          {table && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "16px" }}>
                <strong>Table:</strong> {table.number}, <strong>Seats:</strong>{" "}
                {table.seat_number}
              </p>
            </div>
          )}
          <h3>Selected Items</h3>
          <List
            dataSource={selectedItems}
            renderItem={(item) => (
              <List.Item key={item.id} className="selectedItem">
                <div className="itemName">{item.name}</div>
                <div className="itemQuantity">
                  <InputNumber
                    min={0}
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value || 0)}
                  />
                </div>
                <div className="itemTotal">
                  {new Intl.NumberFormat("vi-VN").format(
                    item.quantity * item.price
                  )}{" "}
                  VND
                </div>
              </List.Item>
            )}
          />

          <div
            style={{
              marginTop: "20px",
              textAlign: "right",
              fontWeight: "bold",
            }}
          >
            Total Price:{" "}
            {new Intl.NumberFormat("vi-VN").format(getTotalPrice())} VND
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default Order;
