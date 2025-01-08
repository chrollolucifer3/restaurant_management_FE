import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import SelectCustom from "components/UI/Select";
import { DatePicker, Space } from "antd";
import { Radio } from "antd";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateDiscount,
  setVisibleModalCreateOrUpdateDiscount,
} from "../../../../states/modules/discount";
import {
  handleCreateDiscount,
  handleUpdateDiscount,
} from "../../../../api/discount";
import moment from "moment";

CreateOrUpdate.prototype = {
  isModalOpen: PropTypes.bool.isRequired,
  configModal: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};

CreateOrUpdate.defaultProps = {
  isModalOpen: false,
  textBtnConfirm: "OK",
  configModal: {
    title: "Title",
    type: "CREATE",
  },
};

function CreateOrUpdate(props) {
  let { discount, configModal } = props;
  const { RangePicker } = DatePicker;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({});
  const visibleModalCreateOrUpdateDiscount = useSelector(
    (state) => state.discount.visibleModalCreateOrUpdateDiscount
  );
  const isLoadingBtnCreateOrUpdateDiscount = useSelector(
    (state) => state.discount.isLoadingBtnCreateOrUpdateDiscount
  );
  const errorCreateOrUpdateDiscount = useSelector(
    (state) => state.discount.errorCreateOrUpdateDiscount
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateDiscount]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateDiscount({
        code: "",
        description: "",
        discount_type: "",
        discount_amount: "",
        min_order_value: "",
        start_date: "",
        end_date: "",
        is_anniversary: "",
        is_loyalty_customer: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
      code: discount.code,
      description: discount.description,
      discount_type: discount.discount_type,
      discount_amount: discount.discount_amount,
      min_order_value: discount.min_order_value,
      start_date: "",
      end_date: "",
      is_anniversary: discount.is_anniversary,
      is_loyalty_customer: discount.is_loyalty_customer,
    });
  }, [discount]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      code: "",
      description: "",
      discount_type: "",
      discount_amount: "",
      min_order_value: "",
      start_date: null,
      end_date: null,
      is_anniversary: 0,
      is_loyalty_customer: 0,
      total_money_spent: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {
    let data = _.cloneDeep(dataCreateOrUpdate); // Clone dữ liệu cũ

    // Kiểm tra trường hợp start_date
    if (type === "start_date") {
      if (valueInput && valueInput.length === 2) {
        data["start_date"] = valueInput[0]?.format("MM-DD-YYYY") || null;
        data["end_date"] = valueInput[1]?.format("MM-DD-YYYY") || null;
      } else {
        data["start_date"] = null;
        data["end_date"] = null;
      }
    } else if (type === "is_anniversary" || type === "is_loyalty_customer") {
      // Chuyển giá trị thành 1 hoặc 0
      data[type] = valueInput === 1 ? 1 : 0;
    } else if (type === "discount_type") {
      data[type] = valueInput; // Gán giá trị cho discount_type
    } else {
      // Lấy giá trị từ input thông thường
      data[type] = valueInput.target ? valueInput.target.value : valueInput;
    }

    // Cập nhật lại dataCreateOrUpdate
    setDataCreateOrUpdate(data);
};


  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateDiscount
    );
    dispatch(setErrorCreateOrUpdateDiscount(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateDiscount = () => {
    let dataToSend = {
      description: dataCreateOrUpdate.description,
      discount_type: dataCreateOrUpdate.discount_type,
      discount_amount: dataCreateOrUpdate.discount_amount,
      min_order_value: dataCreateOrUpdate.min_order_value,
      start_date: dataCreateOrUpdate.start_date,
      end_date: dataCreateOrUpdate.end_date,
      is_anniversary: dataCreateOrUpdate.is_anniversary,
      is_loyalty_customer: dataCreateOrUpdate.is_loyalty_customer,
      total_money_spent: dataCreateOrUpdate.total_money_spent,
    };
    if (configModal.type === "CREATE") {
      dataToSend.code = dataCreateOrUpdate.code;
    }
    if (!configModal.type === "UPDATE") {
      // Loại bỏ các trường không cần thiết trong update
      delete dataToSend.code;
    }

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateDiscount
    );
    dispatch(setErrorCreateOrUpdateDiscount(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateDiscount(dataToSend)); // Gửi dữ liệu JSON
      } else {
        dispatch(handleUpdateDiscount(dataToSend, discount.id)); // Gửi dữ liệu JSON
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateDiscount}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateDiscount(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        {configModal.type === "CREATE" && (
          <div className={styles.inputWrapper}>
            <div className={styles.label}>Code *</div>
            <InputRES
              type={"text"}
              placeholder={"Enter code..."}
              onChange={(e) => handleChangeInput(e, "code")}
              onBlur={() => validateBlur("code")}
              value={dataCreateOrUpdate.code}
              error={errorCreateOrUpdateDiscount.code}
            />
          </div>
        )}
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Description *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter description..."}
            onChange={(e) => handleChangeInput(e, "description")}
            onBlur={() => validateBlur("description")}
            value={dataCreateOrUpdate.description}
            error={errorCreateOrUpdateDiscount.description}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Discount amount *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter discount amount..."}
            onChange={(e) => handleChangeInput(e, "discount_amount")}
            onBlur={() => validateBlur("discount_amount")}
            value={dataCreateOrUpdate.discount_amount}
            error={errorCreateOrUpdateDiscount.discount_amount}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Discount Type *</div>
          <SelectCustom
            onChange={(e) => handleChangeInput(e, "discount_type")}
            value={dataCreateOrUpdate.discount_type}
            options={[
              // Tạo mảng options
              { value: "percentage", label: "PERCENTAGE" },
              { value: "amount", label: "AMOUNT" },
            ]}
            onBlur={() => validateBlur("discount_type")}
            error={errorCreateOrUpdateDiscount.discount_type}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Min order value *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter min order value..."}
            onChange={(e) => handleChangeInput(e, "min_order_value")}
            onBlur={() => validateBlur("min_order_value")}
            value={dataCreateOrUpdate.min_order_value}
            error={errorCreateOrUpdateDiscount.min_order_value}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Start and End Date *</div>
          <Space direction="vertical">
            <RangePicker
              onChange={(value) => handleChangeInput(value, "start_date")}
              onBlur={() => validateBlur("start_date")}
              value={
                dataCreateOrUpdate.start_date && dataCreateOrUpdate.end_date
                  ? [
                      moment(dataCreateOrUpdate.start_date, "MM-DD-YYYY"),
                      moment(dataCreateOrUpdate.end_date, "MM-DD-YYYY"),
                    ]
                  : null
              }
            />
          </Space>
        </div>

        <div className={styles.checkboxWrapper}>
          <div className={styles.label}>Is loyalty customer? *</div>
          <Radio.Group
            onChange={(e) =>
              handleChangeInput(e.target.value, "is_loyalty_customer")
            }
            value={dataCreateOrUpdate.is_loyalty_customer === 1 ? 1 : 0}
          >
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </div>
        <div className={styles.checkboxWrapper}>
          <div className={styles.label}>Is anniversary? *</div>
          <Radio.Group
            onChange={(e) => handleChangeInput(e.target.value, "is_anniversary")}
            value={dataCreateOrUpdate.is_anniversary === 1 ? 1 : 0}
          >
            <Radio value={1}>Yes</Radio>
            <Radio value={0}>No</Radio>
          </Radio.Group>
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Total money spent *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter total money spent..."}
            onChange={(e) => handleChangeInput(e, "total_money_spent")}
            onBlur={() => validateBlur("total_money_spent")}
            value={dataCreateOrUpdate.total_money_spent}
            error={errorCreateOrUpdateDiscount.total_money_spent}
          />
        </div>
        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateDiscount}
            onClick={() => handleConfirmCreateOrUpdateDiscount()}
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

export default CreateOrUpdate;