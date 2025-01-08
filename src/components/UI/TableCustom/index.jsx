import React from "react";
import styles from "./styles.module.scss";
import "./styles.scss";
import { Pagination, Table } from "antd";
import PropTypes from "prop-types";

const TableCustom = (props) => {
  const {
    columns,
    dataSource,
    loading,
    rowKey,
    pagination,
    onChangeCurrentPage,
    onChange,
    expandedRowRender,
  } = props;

  return (
    <div className={styles.tableWrap}>
      <Table
        className={`table-custom ${styles.table}`}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={false} // Tắt phân trang mặc định của Ant Design Table
        onChange={onChange}
        rowKey={rowKey}
        expandable={expandedRowRender ? { expandedRowRender } : undefined} // Chỉ thêm expandable nếu có expandedRowRender
      />

      <div className={styles.paginationWrap}>
        <span className={styles.textPagination}>
          <span>
            Showing {pagination.perPage * (pagination.currentPage - 1) + 1} to
          </span>
          <span>
            {" "}
            {pagination.totalRecord >
            pagination.perPage * pagination.currentPage
              ? pagination.perPage * pagination.currentPage
              : pagination.totalRecord}
          </span>
          <span> of {pagination.totalRecord} entries</span>
        </span>

        <Pagination
          current={pagination.currentPage}
          total={pagination.totalRecord}
          pageSize={pagination.perPage ? pagination.perPage : 10}
          onChange={onChangeCurrentPage}
        />
      </div>
    </div>
  );
};

TableCustom.propTypes = {
  columns: PropTypes.array.isRequired, // Các cột của bảng
  dataSource: PropTypes.array.isRequired, // Dữ liệu hiển thị
  loading: PropTypes.bool, // Trạng thái loading của bảng
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), // Khóa định danh cho từng dòng
  onChange: PropTypes.func, // Hàm xử lý thay đổi bảng
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    perPage: PropTypes.number,
    totalRecord: PropTypes.number,
  }), // Dữ liệu phân trang
  onChangeCurrentPage: PropTypes.func, // Hàm xử lý khi chuyển trang
  expandedRowRender: PropTypes.func, // Hàm để render bảng con nếu có
};

TableCustom.defaultProps = {
  columns: [],
  dataSource: [],
  loading: false,
  rowKey: "id",
  onChange: () => {},
  pagination: {
    currentPage: 1,
    perPage: 10,
    totalRecord: 0,
  },
  onChangeCurrentPage: () => {},
  expandedRowRender: null,
};

export default TableCustom;
