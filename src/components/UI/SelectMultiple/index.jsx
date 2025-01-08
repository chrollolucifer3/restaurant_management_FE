import React from "react";
import PropTypes from "prop-types";
import { Select } from "antd";
import styles from "./styles.module.scss";
// Đảm bảo bạn đã tạo SCSS hoặc CSS cho component này.

const { Option } = Select;

const SelectMultiple = ({
  value,
  options,
  onChange,
  onBlur,
  placeholder,
  disabled,
  error,
  isShowError,
}) => {
  const handleChange = (selectedValues) => {
    onChange(selectedValues); // Gọi hàm onChange với giá trị mới
  };

  return (
    <div className={styles.selectWrap}>
      <Select
        mode="multiple"
        className={`${error ? "input-select-error-custom" : ""}`} // Thêm class nếu có lỗi
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        allowClear
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
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

SelectMultiple.propTypes = {
  value: PropTypes.array.isRequired, // Giá trị của các tùy chọn được chọn
  options: PropTypes.array.isRequired, // Các tùy chọn để chọn
  onChange: PropTypes.func.isRequired, // Hàm gọi khi giá trị thay đổi
  onBlur: PropTypes.func.isRequired, // Hàm gọi khi mất focus
  error: PropTypes.string, // Thông báo lỗi nếu có
  isShowError: PropTypes.bool, // Điều khiển việc hiển thị thông báo lỗi
  placeholder: PropTypes.string, // Placeholder khi chưa chọn gì
  disabled: PropTypes.bool, // Điều khiển xem select có disabled hay không
};

SelectMultiple.defaultProps = {
  error: "",
  isShowError: true,
  placeholder: "Select options",
  disabled: false,
};

export default SelectMultiple;
