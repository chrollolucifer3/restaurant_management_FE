import React, { useEffect } from "react";
import { Modal, Empty, Table, Divider, Button } from "antd";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getListFood } from "api/table";
import { handleConfirmPayment } from "api/payment";

function ShowListFood({
  isModalOpen,
  configModal,
  onClose,
  selectedTableIds,
}) {
  const dispatch = useDispatch();
  const listFood = useSelector((state) => state.table?.listFoods || []);

  useEffect(() => {
    if (isModalOpen && selectedTableIds.length > 0) {
      dispatch(getListFood({ listTables: selectedTableIds }));
    }
  }, [isModalOpen, selectedTableIds, dispatch]);

  const totalPrice = listFood.reduce((total, food) => {
    if (food.price && food.quantity) {
      return total + (food.price * food.quantity);
    }
    return total;
  }, 0);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price ? `${price.toLocaleString()} VND` : "N/A",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record) =>
        record.price && record.quantity
          ? `${(record.price * record.quantity).toLocaleString()} VND`
          : "N/A",
    },
  ];

  const data = listFood.map((food) => ({
    key: food.id,
    name: food.name,
    quantity: food.quantity,
    price: food.price,
    totalPrice: food.price * food.quantity,
  }));

  const handlePayment = () => {
    const payload = {
      listTables: selectedTableIds,
    };
    dispatch(handleConfirmPayment(payload));
    onClose(); 
  };

  return (
    <Modal
      title={configModal.title}
      open={isModalOpen}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          onClick={handlePayment}
          disabled={listFood.length === 0}
        >
          Payment
        </Button>,
      ]}
      width={600}
    >
      {listFood.length > 0 ? (
        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
            size="small"
          />
          <Divider />
          <div
            style={{ textAlign: "right", fontWeight: "bold", fontSize: "16px" }}
          >
            Total: {totalPrice.toLocaleString()} VND
          </div>
        </div>
      ) : (
        <Empty description="No food available for the selected tables" />
      )}
    </Modal>
  );
}

ShowListFood.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedTableIds: PropTypes.array.isRequired,
};

ShowListFood.defaultProps = {
  isModalOpen: false,
  configModal: { title: "List Food" },
};

export default ShowListFood;
