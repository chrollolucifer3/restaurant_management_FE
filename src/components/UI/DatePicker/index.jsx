import React from "react";
import { DatePicker } from "antd";
import PropTypes from "prop-types";
import moment from "moment"; // Import thư viện moment để chuyển đổi giá trị
import styles from "./styles.module.scss";

const DatePickerCustom = ({
  value,
  onChange,
  onBlur,
  error,
  isShowError,
  placeholder,
}) => {
  const handleChange = (date, dateString) => {
    onChange(dateString); // Gọi hàm onChange với giá trị thời gian (chuỗi)
  };

  // Chuyển đổi value thành đối tượng moment nếu không phải là moment
  const momentValue = value ? moment(value) : null;

  return (
    <div className={styles.inputWrapper}>

      <DatePicker
        style={{ width: "100%" }}
        showTime
        value={momentValue}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
      />
      {error && isShowError && (
        <span
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#EB3B5B",
          }}
        >
          {error}
        </span> // Hiển thị lỗi nếu có
      )}
    </div>
  );
};

DatePickerCustom.propTypes = {
  value: PropTypes.string.isRequired, // Giá trị thời gian đã chọn
  onChange: PropTypes.func.isRequired, // Hàm gọi khi giá trị thay đổi
  onBlur: PropTypes.func.isRequired, // Hàm gọi khi mất focus
  error: PropTypes.string, // Thông báo lỗi nếu có
  isShowError: PropTypes.bool, // Điều khiển việc hiển thị thông báo lỗi
  placeholder: PropTypes.string, // Placeholder khi chưa chọn gì
};

DatePickerCustom.defaultProps = {
  error: "",
  isShowError: true,
  placeholder: "Select reserved time",
};

export default DatePickerCustom;
