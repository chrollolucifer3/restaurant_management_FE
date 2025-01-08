import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
import TableCustom from "../../components/UI/Table";
import InputRES from "../../components/UI/Input";
import ButtonRES from "../../components/UI/Button";
import { FormOutlined } from "@ant-design/icons";
import CreateOrUpdate from "./components/CreateOrUpdate";
// import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  getListDiscount,
  // handleDeleteDiscount,
} from "../../api/discount";
import {
  setVisibleModalCreateOrUpdateDiscount,
  // setVisibleModalDeleteDiscount,
} from "../../states/modules/discount";
import _ from "lodash";
// import moment from 'moment';




function Discount() {
  const authUser = useSelector((state) => state.auth.authUser);
  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (text, record) => <span> {record.code}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => <span>{record.description}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Discount amount",
      dataIndex: "discount_amount",
      key: "discount_amount",
      render: (text, record) => <span>{record.discount_amount.toLocaleString('vi-VN')}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Discount type",
      dataIndex: "discount_type",
      key: "discount_type",
      render: (text, record) => <span>{record.discount_type}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Min order",
      dataIndex: "min_order_value",
      key: "min_order_value",
      render: (text, record) => <span>{record.min_order_value.toLocaleString('vi-VN')}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Start date",
      dataIndex: "start_date",
      key: "start_date",
      render: (text, record) => <span>{record.start_date}</span>,
      defaultSortOrder: "",
    },
    {
      title: "End date",
      dataIndex: "end_date",
      key: "end_date",
      render: (text, record) => <span>{record.end_date}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Total money spent",
      dataIndex: "total_money_spent",
      key: "total_money_spent",
      render: (text, record) => <span>{record.total_money_spent.toLocaleString('vi-VN')}</span>,
      defaultSortOrder: "",
    },
    {
      title: "Actions",
      key: "action",
      fixed: "right",
      align: "center",
      width: "80px",
      render: (text, record) => (
        <>
          {(authUser.roleName !== "ADMIN" && authUser.roleName !== "MANAGER" ) ? (
            <div className={styles.btnAction}>
              <div
                onClick={() => handleEdit(record)}
                className={styles.btnWrap}
                title="Update"
              >
                <FormOutlined />
              </div>
              {/* <div
                onClick={() => handleShowConfirmDelete(record)}
                className={styles.btnWrap}
                title="Delete"
              >
                <DeleteOutlined />
              </div> */}
            </div>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  const dispatch = useDispatch();

  const discounts = useSelector((state) => state.discount.discounts);
  const isLoadingTableDiscount = useSelector(
    (state) => state.discount.isLoadingTableDiscount
  );
  const paginationListDiscount = useSelector(
    (state) => state.discount.paginationListDiscount
  );
  // const visibleModalDeleteDiscount = useSelector(
  //   (state) => state.discount.visibleModalDeleteDiscount
  // );

  const [discount, setDiscount] = useState({});
  const [configModal, setConfigModal] = useState({
    title: "Create Discount",
    type: "CREATE",
  });
  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    status: "",
    perPage: 10,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getListDiscount(dataFilter));
  }, [dataFilter, dispatch]);

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateDiscount(true));
    setConfigModal({
      title: "Create Discount",
      type: "CREATE",
    });
  };

  const handleEdit = (discount) => {
    let discountSelect = _.cloneDeep(discount);
    setDiscount(discountSelect);
    dispatch(setVisibleModalCreateOrUpdateDiscount(true));
    setConfigModal({
      title: "Update Discount",
      type: "UPDATE",
    });
  };

  // const handleShowConfirmDelete = (discount) => {
  //   let discountSelect = _.cloneDeep(discount);
  //   setDiscount(discountSelect);
  //   dispatch(setVisibleModalDeleteDiscount(true));
  // };

  // const handleConfirmDeleteDiscount = () => {
  //   dispatch(handleDeleteDiscount(discount.id));
  // };

  const changeCurrentPage = (page) => {
    setDataFilter({ ...dataFilter, page: page });
  };

  const handleSearch = (e) => {
    setDataFilter({ ...dataFilter, keySearch: e.target.value });
  };

  const onChange = (pagination, filters, sorter) => {
    setDataFilter({
      ...dataFilter,
      order: sorter.order
        ? sorter.order === "descend"
          ? "desc"
          : "asc"
        : null,
      column: sorter.field ? sorter.field : null,
    });
  };

  return (
    <MainLayout>
      <div className={styles.userManagementWrap}>
        <div className={styles.mainWrap}>
          <div className={styles.headerMainWrap}>
            <span className={styles.title}>
              Total records ({paginationListDiscount.totalRecord})
            </span>
          </div>

          <div className={styles.boxFilterWrap}>
            <div className={styles.inputWrap}>
              <InputRES
                placeholder="Search by name"
                value={dataFilter.keySearch}
                onChange={(e) => handleSearch(e)}
              />
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M11.78 9.97 9.75 7.94c.473-.788.75-1.707.75-2.69A5.256 5.256 0 0 0 5.25 0 5.256 5.256 0 0 0 0 5.25a5.256 5.256 0 0 0 5.25 5.25c.984 0 1.902-.277 2.69-.75l2.03 2.03a.748.748 0 0 0 1.06 0l.75-.75a.749.749 0 0 0 0-1.06ZM5.25 9a3.75 3.75 0 1 1 0-7.5 3.75 3.75 0 0 1 0 7.5Z"
                    fill="#3D4667"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path fill="#fff" d="M0 0h12v12H0z" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className={styles.btnWrap}>
              <ButtonRES
                onClick={() => handleCreate()}
                style={{
                  minWidth: "80px",
                  margin: "0",
                  border: "none",
                  padding: "8px 12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textBtn={"+ Create"}
              ></ButtonRES>
            </div>
          </div>

          <TableCustom
            loading={isLoadingTableDiscount}
            columns={columns}
            dataSource={discounts}
            rowKey={(record) => record.id}
            pagination={paginationListDiscount}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
          />
        </div>

        <CreateOrUpdate discount={discount} configModal={configModal} />

        {/* <ModalConfirm
          isModalOpen={visibleModalDeleteDiscount}
          title={`Do you want delete the discount with code ${discount.code}?`}
          textBtnConfirm="Delete"
          description={`Are you sure you want to delete the discount with code ${discount.code}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteDiscount(false))}
          onConfirm={() => handleConfirmDeleteDiscount()}
        /> */}
      </div>
    </MainLayout>
  );
}

export default Discount;
