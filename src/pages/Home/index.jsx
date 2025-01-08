import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import { Col, Row, Table, DatePicker, Button } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getTotalOder, getFoodBestSeller, getRevenueByTime } from "api/Home";
import { getListEmployee } from "api/employee";
import { getListCustomer } from "api/customer";

const { RangePicker } = DatePicker;

function Home() {
  const dispatch = useDispatch();

  // State selectors
  const {
    totalEmployee,
    totalCustomer,
    totalOrder,
    bestSeller,
    isLoadingTableBestSeller,
    RevenueByTimeRange: revenueByTime,
  } = useSelector((state) => ({
    totalEmployee: state.employee.totalEmployee,
    totalCustomer: state.customer.totalCustomer,
    totalOrder: state.home.totalOrder,
    bestSeller: state.home.bestSeller,
    isLoadingTableBestSeller: state.home.isLoadingTableBestSeller,
    RevenueByTimeRange: state.home.RevenueByTimeRange,
  }));

  const [dateRange, setDateRange] = useState([]);

  // Initial data fetching
  useEffect(() => {
    dispatch(getListEmployee());
    dispatch(getListCustomer());
    dispatch(getTotalOder());
    dispatch(getFoodBestSeller());
  }, [dispatch]);

  // Handle date range changes
  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      setDateRange(dates);
    }
  };

  // Call API to get revenue data based on date range
  const loadRevenueData = () => {
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      dispatch(
        getRevenueByTime({
          startDate: startDate.format("YYYY-MM-DD"),
          endDate: endDate.format("YYYY-MM-DD"),
        })
      );
    } else {
      alert("Please select a date range first");
    }
  };

  // Prepare data for chart - convert total_revenue to a number
  const processedRevenueData = Array.isArray(revenueByTime)
    ? revenueByTime.map((item) => ({
        ...item,
        total_revenue: Number(item.total_revenue), // convert string to number
      }))
    : [];

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.quantity - b.quantity,
    },
  ];
  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <MainLayout>
      <div className={styles.dashboardWrap}>
        {/* Overview Section */}
        <div className={styles.overviewWrap}>
          <Row gutter={20}>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>Total Users</div>
                      <div className={styles.numberWrap}>{totalEmployee}</div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${styles.iconWrap} ${styles.iconUser}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 60 48"
                        width="60"
                        height="48"
                      >
                        <path
                          fill="currentColor"
                          d="M29.99 30c5.382 0 9.666-4.366 9.666-9.75s-4.364-9.75-9.666-9.75c-5.382 0-9.666 4.366-9.666 9.75C20.24 25.632 24.608 30 29.99 30zm0-15c2.892 0 5.246 2.354 5.246 5.25s-2.358 5.25-5.246 5.25-5.25-2.354-5.25-5.25S27.094 15 29.99 15zM48 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM34.678 33h-9.356C17.962 33 12 38.596 12 45.496 12 46.884 13.19 48 14.662 48h30.674c1.472 0 2.662-1.116 2.662-2.504 0-6.9-5.962-12.496-13.322-12.496zM16.696 43.5c.982-3.446 4.44-6 8.544-6h9.438c4.104 0 7.562 2.554 8.544 6H16.696zM51.74 18h-5.798c-1.2 0-2.332.284-3.362.772.056.494.15.972.15 1.478 0 3.16-1.198 6.02-3.108 8.25h18.722c.916 0 1.656-.788 1.656-1.754C60 21.918 56.306 18 51.74 18zm-34.5 2.25c0-.51.092-.996.15-1.492-1.022-.562-2.146-.758-3.336-.758H8.258C3.698 18 0 21.918 0 26.746c0 .966.74 1.754 1.652 1.754h18.704c-1.914-2.232-3.114-5.09-3.114-8.25zM12 15a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>Total Customer</div>
                      <div className={styles.numberWrap}>{totalCustomer}</div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${styles.iconWrap} ${styles.iconChart1}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 60 60"
                        width="60"
                        height="60"
                      >
                        <path
                          fill="currentColor"
                          d="M58.594 10.43c1.617-1.289 1.875-3.656.586-5.273s-3.656-1.875-5.273-.586L37.43 17.754 24.75 8.25a3.748 3.748 0 0 0-4.594.07l-18.75 15C-.211 24.609-.469 26.976.82 28.593s3.656 1.875 5.273.586L22.57 15.995l12.68 9.504a3.748 3.748 0 0 0 4.594-.07l18.75-14.999zM18.75 30v22.5c0 2.074 1.676 3.75 3.75 3.75s3.75-1.676 3.75-3.75V30c0-2.074-1.676-3.75-3.75-3.75s-3.75 1.676-3.75 3.75zm-15 11.25V52.5c0 2.074 1.676 3.75 3.75 3.75s3.75-1.676 3.75-3.75V41.25c0-2.074-1.676-3.75-3.75-3.75s-3.75 1.676-3.75 3.75zm33.75-7.5a3.746 3.746 0 0 0-3.75 3.75v15c0 2.074 1.676 3.75 3.75 3.75s3.75-1.676 3.75-3.75v-15a3.746 3.746 0 0 0-3.75-3.75zM48.75 30v22.5c0 2.074 1.676 3.75 3.75 3.75s3.75-1.676 3.75-3.75V30c0-2.074-1.676-3.75-3.75-3.75s-3.75 1.676-3.75 3.75z"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <div className={styles.itemWrap}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={styles.personalWrap}>
                      <div className={styles.labelWrap}>Total Order</div>
                      <div className={styles.numberWrap}>
                        {totalOrder
                          ? new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(totalOrder)
                          : 0}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={`${styles.iconWrap} ${styles.iconMoney}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 60 53.333"
                        width="60"
                        height="53.333"
                      >
                        <path
                          fill="currentColor"
                          d="M60 6.667H0v40h60v-40zM13.333 40H6.667v-6.667A6.674 6.674 0 0 1 13.334 40zM6.667 20v-6.667h6.667A6.674 6.674 0 0 1 6.667 20zm40 20a6.674 6.674 0 0 1 6.667-6.667V40h-6.667zm6.667-20a6.674 6.674 0 0 1-6.667-6.667h6.667V20zM30 36.667c-5.521 0-10-4.479-10-10s4.479-10 10-10 10 4.479 10 10-4.479 10-10 10z"
                        />
                      </svg>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

          </Row>
        </div>

        {/* Revenue Chart Section */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>Revenue Chart</h3>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "500px",
              marginBottom: "20px",
            }}
          >
            <RangePicker
              onChange={handleDateChange}
              style={{ marginRight: "10px", width: "100px" }} // Điều chỉnh chiều rộng RangePicker
            />
            <Button type="primary" onClick={loadRevenueData}>
              Load Revenue Data
            </Button>
          </div>
          {/* Render biểu đồ cột */}
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={processedRevenueData} // Sử dụng processed data ở đây
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => currencyFormatter.format(value)} // Định dạng giá trị trong tooltip
              />
              <Legend />
              <Bar
                dataKey="total_revenue"
                fill="#1677ff" // Màu của các cột
                label={{
                  position: "top",
                  fill: "#000",
                  fontSize: 14,
                  formatter: (value) => currencyFormatter.format(value), // Định dạng nhãn của các cột
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>



        {/* Best Seller Table Section */}
        <div
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>Best Seller Foods</h3>
          <Table
            columns={columns}
            dataSource={bestSeller}
            rowKey={(record) => record.id}
            pagination={false}
            loading={isLoadingTableBestSeller}
            bordered
            scroll={{ x: 500 }}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
