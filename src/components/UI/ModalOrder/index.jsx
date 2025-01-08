import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, List, Avatar, Descriptions } from "antd";
import PropTypes from "prop-types";
import { getDetailBillById } from "../../../api/bill";
import styles from "./styles.module.scss";

function ModalOrder({ isModalOpen, title, onClose, orderId }) {
  const details = useSelector((state) => state.bill.details); // Dữ liệu chi tiết hóa đơn từ Redux
  const dispatch = useDispatch();

  useEffect(() => {
    if (isModalOpen && orderId) {
      dispatch(getDetailBillById(orderId)); // Gọi API lấy chi tiết hóa đơn
    }
  }, [isModalOpen, dispatch, orderId]);

  return (
    <Modal 
      open={isModalOpen} 
      footer={null} 
      closable={true} 
      onCancel={onClose}
      width={800}
    >
      <h2>{title}</h2>

      {details ? (
        <div className={styles.modalContent}>
          {/* Thông tin khách hàng */}
          <Descriptions title="Customer Information" bordered>
            <Descriptions.Item label="Full Name" span={3}>
              {details.customer?.full_name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Phone Number" span={3}>
              {details.customer?.phone_number || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Total Price" span={3}>
              {details.total_price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Descriptions.Item>
            <Descriptions.Item label="Created At" span={3}>
              {new Date(details.createdAt).toLocaleString("vi-VN")}
            </Descriptions.Item>
          </Descriptions>

          {/* Danh sách món ăn */}
          <h3 style={{ marginTop: "20px" }}>Ordered Foods</h3>
          <List
            itemLayout="horizontal"
            dataSource={details.listFoods}
            renderItem={(food) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={food.image_url} />}
                  title={food.name}
                  description={`Quantity: ${food.quantity} x ${food.price.toLocaleString(
                    "vi-VN",
                    { style: "currency", currency: "VND" }
                  )} = ${food.subTotal.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}`}
                />
                <div>{food.description}</div>
              </List.Item>
            )}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
}

ModalOrder.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  orderId: PropTypes.number,
};

ModalOrder.defaultProps = {
    isModalOpen: false,
    title: "Order Detail",
    orderId: null,
    };

export default ModalOrder;
