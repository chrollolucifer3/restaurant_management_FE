import React from "react";
import PropTypes from "prop-types";
import { List } from "antd";
import styles from "./styles.module.scss";
import nodataImg from "assets/images/user/nodata.jpg";
import { Pagination } from "antd";

FoodList.propTypes = {
  dataSource: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  onSelectItem: PropTypes.func.isRequired,
};

FoodList.defaultProps = {
  dataSource: [],
  loading: false,
};

function FoodList({
  dataSource,
  loading,
  onSelectItem,
  pagination,
  onChangeCurrentPage,
}) {
  return (
    <div className={styles.foodListWrap}>
      <List
        dataSource={dataSource}
        loading={loading}
        pagination={false}
        grid={{ gutter: 16, column: 6 }}
        renderItem={(item) => (
          <List.Item>
            <div className={styles.foodCard}>
              <img
                src={item.image_url || nodataImg}
                alt={item.name}
                className={styles.foodImage}
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <div className={styles.foodInfo}>
                <h4 className={styles.foodName}>{item.name}</h4>
                <p className={styles.foodPrice}>
                  {new Intl.NumberFormat("vi-VN").format(item.price)} đ
                </p>
                <span className={styles.foodButton} onClick={() => onSelectItem(item)}>Select</span>
              </div>
            </div>
          </List.Item>
        )}
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
          pageSize={pagination.perPage}
          onChange={onChangeCurrentPage}
        />
      </div>
    </div>
  );
}

export default FoodList;
