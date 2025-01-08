import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import InputRES from "../../../../components/UI/Input";
import ButtonRES from "../../../../components/UI/Button";
import _ from "lodash";
import { isValidate } from "../../../../utils/validate";
import { handleCheckValidateConfirm } from "../../../../utils/helper";
import ModalGeneral from "../../../../components/UI/Modal/ModalGeneral";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  setErrorCreateOrUpdateTable,
  setVisibleModalCreateOrUpdateTable,
} from "../../../../states/modules/table";
import { handleCreateTable, handleUpdateTable } from "../../../../api/table";

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
  let { table, configModal } = props;
  const [dataCreateOrUpdate, setDataCreateOrUpdate] = useState({});
  const visibleModalCreateOrUpdateTable = useSelector(
    (state) => state.table.visibleModalCreateOrUpdateTable
  );
  const isLoadingBtnCreateOrUpdateTable = useSelector(
    (state) => state.table.isLoadingBtnCreateOrUpdateTable
  );
  const errorCreateOrUpdateTable = useSelector(
    (state) => state.table.errorCreateOrUpdateTable
  );
  const dispatch = useDispatch();

  useEffect(() => {
    handleReloadData();
  }, [visibleModalCreateOrUpdateTable]);

  useEffect(() => {
    dispatch(
      setErrorCreateOrUpdateTable({
        number: "",
        seat_number: "",
      })
    );
  }, [dataCreateOrUpdate, dispatch]);

  useEffect(() => {
    setDataCreateOrUpdate({
      number: table.number,
      seat_number: table.seat_number,
    });
  }, [table]);

  const handleReloadData = () => {
    setDataCreateOrUpdate({
      number: "",
      seat_number: "",
    });
  };

  const handleChangeInput = (valueInput, type) => {
    let value = valueInput.target.value;

    let data = _.cloneDeep(dataCreateOrUpdate); // Clone để không thay đổi trực tiếp dữ liệu cũ
    data[type] = value; // Cập nhật giá trị

    setDataCreateOrUpdate(data); // Cập nhật state mới
  };

  const validateBlur = (type) => {
    let validate = isValidate(
      dataCreateOrUpdate,
      type,
      errorCreateOrUpdateTable
    );
    dispatch(setErrorCreateOrUpdateTable(validate.error));
    return validate.isError;
  };

  const handleConfirmCreateOrUpdateTable = () => {
    let dataToSend = {
      number: dataCreateOrUpdate.number,
      seat_number: dataCreateOrUpdate.seat_number,
    };

    const validate = handleCheckValidateConfirm(
      dataToSend,
      errorCreateOrUpdateTable
    );
    dispatch(setErrorCreateOrUpdateTable(validate.dataError));

    if (!validate.isError) {
      if (configModal.type === "CREATE") {
        dispatch(handleCreateTable(dataToSend)); // Gửi dữ liệu JSON
      } else {
        dispatch(handleUpdateTable(dataToSend, table.id)); // Gửi dữ liệu JSON
      }
    }
  };

  return (
    <ModalGeneral
      isModalOpen={visibleModalCreateOrUpdateTable}
      onClose={() => dispatch(setVisibleModalCreateOrUpdateTable(false))}
      configModal={configModal}
    >
      <div className={styles.mainModalWrap}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Number *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter number..."}
            onChange={(e) => handleChangeInput(e, "number")}
            onBlur={() => validateBlur("number")}
            value={dataCreateOrUpdate.number}
            error={errorCreateOrUpdateTable.number}
          />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>Seat Number *</div>
          <InputRES
            type={"text"}
            placeholder={"Enter Seat Number..."}
            onChange={(e) => handleChangeInput(e, "seat_number")}
            onBlur={() => validateBlur("seat_number")}
            value={dataCreateOrUpdate.seat_number}
            error={errorCreateOrUpdateTable.seat_number}
          />
        </div>

        <div className={styles.btnWrap}>
          <ButtonRES
            textBtn={"Save"}
            loading={isLoadingBtnCreateOrUpdateTable}
            onClick={() => handleConfirmCreateOrUpdateTable()}
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
