import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import SelectCustom from "components/UI/Select";
import SelectMultiple from "components/UI/SelectMultiple";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateBookingTable,
  setVisibleModalCreateOrUpdateBookingTable,
} from "../../../../states/modules/table";
import { handleCreateBookingTable } from "../../../../api/table";
import DatePickerCustom from "components/UI/DatePicker";
import _ from "lodash";

BookingTable.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  tables: PropTypes.array,
};

BookingTable.defaultProps = {
  isModalOpen: false,
  configModal: {
    title: "Create Booking",
  },
  tables: [],
};

function BookingTable(props) {
  const { configModal, tables } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({
    listTable: [],
    customer_name: "",
    phone_number: "",
    type_booking: "",
    time_reserved: null,
  });
  const errorCreateOrUpdateBookingTable = useSelector(
    (state) => state.table.errorCreateBookingTable
  );
  const isLoadingBtnCreateOrUpdateBookingTable = useSelector(
    (state) => state.table.isLoadingBtnCreateOrUpdateBookingTable
  );
  const visibleModalCreateOrUpdateBookingTable = useSelector(
    (state) => state.table.visibleModalCreateOrUpdateBookingTable
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (visibleModalCreateOrUpdateBookingTable) {
      handleReloadData();
    }
  }, [visibleModalCreateOrUpdateBookingTable]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      listTable: [],
      customer_name: "",
      phone_number: "",
      type_booking: "",
      time_reserved: null,
    });
  };

  const handleChangeInput = (valueInput, type) => {
    const updatedData = _.cloneDeep(dataCreateOrUpdate);

    if (type === "listTable") {
      updatedData[type] = valueInput;
    } else {
      updatedData[type] = valueInput.target
        ? valueInput.target.value
        : valueInput;
    }

    setDataCreateOrUpdate(updatedData);
  };

  const validateBlur = (type) => {
    const validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateBookingTable
    );
    dispatch(setErrorCreateOrUpdateBookingTable(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateBookingTable = () => {
    const dataToSend = {
      listTable: dataCreateOrUpdate.listTable.map((id) => ({
        id: id.toString(),
      })),
      customer_name: dataCreateOrUpdate.customer_name,
      phone_number: dataCreateOrUpdate.phone_number,
      type_booking: dataCreateOrUpdate.type_booking,
      time_reserved: dataCreateOrUpdate.time_reserved,
    };

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateBookingTable
    );
    dispatch(setErrorCreateOrUpdateBookingTable(validate.dataError));

    if (!validate.isError) {
      dispatch(handleCreateBookingTable(dataToSend));
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateBookingTable}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateBookingTable(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        {/* Chọn bàn */}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Select Table *</div>
          <SelectMultiple
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select tables"
            options={tables.map((t) => ({ label: t.number, value: t.id }))}
            onChange={(value) => handleChangeInput(value, "listTable")}
            value={dataCreateOrUpdate.listTable}
            error={errorCreateOrUpdateBookingTable.listTable || ""}
            onBlur={() => validateBlur("listTable")}
          />
        </div>
        {/* Tên khách hàng */}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Customer Name *</div>
          <InputRES
            type="text"
            placeholder="Enter customer name..."
            onChange={(e) => handleChangeInput(e, "customer_name")}
            onBlur={() => validateBlur("customer_name")}
            value={dataCreateOrUpdate.customer_name}
            error={errorCreateOrUpdateBookingTable.customer_name}
          />
        </div>
        {/* Số điện thoại */}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Phone Number *</div>
          <InputRES
            type="text"
            placeholder="Enter phone number..."
            onChange={(e) => handleChangeInput(e, "phone_number")}
            onBlur={() => validateBlur("phone_number")}
            value={dataCreateOrUpdate.phone_number}
            error={errorCreateOrUpdateBookingTable.phone_number}
          />
        </div>
        {/* Loại đặt chỗ */}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Booking Type *</div>
          <SelectCustom
            style={{ width: "100%" }}
            placeholder="Select booking type"
            options={[
              { label: "DIRECT", value: "direct" },
              { label: "REMOTE", value: "remote" },
            ]}
            onChange={(e) => handleChangeInput(e, "type_booking")}
            onBlur={() => validateBlur("type_booking")}
            value={dataCreateOrUpdate.type_booking}
            error={errorCreateOrUpdateBookingTable.type_booking}
          />
        </div>
        {/* Thời gian đặt */}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Reserved Time *</div>
          <DatePickerCustom
            value={dataCreateOrUpdate.time_reserved}
            onChange={(e) => handleChangeInput(e, "time_reserved")}
            onBlur={() => validateBlur("time_reserved")}
            error={errorCreateOrUpdateBookingTable.time_reserved}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateBookingTable}
            onClick={handleConfirmCreateBookingTable}
            disable={false}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </div>
      </div>
    </ModalGeneral>
  );
}

export default BookingTable;
