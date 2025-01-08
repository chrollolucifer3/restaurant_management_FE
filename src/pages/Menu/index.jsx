import React, { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import styles from "./styles.module.scss";
// import TableCustom from "../../components/UI/Table";
import InputRES from "../../components/UI/Input";
import ButtonRES from "../../components/UI/Button";
import ListRES from "components/UI/List";
// import SwitchRES from "../../components/UI/Switch";
// import { FormOutlined, DeleteOutlined, CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import { FormOutlined, DeleteOutlined } from "@ant-design/icons";

// import { Tag } from "antd";
// import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import CreateOrUpdate from "./components/CreateOrUpdate";
import ModalConfirm from "../../components/UI/Modal/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  getListMenu,
  handleDeleteMenu,
} from "../../api/menu";
import {
  setVisibleModalCreateOrUpdateMenu,
  setVisibleModalDeleteMenu,
} from "../../states/modules/menu";
import _ from "lodash";


function Menu() {
  // const authUser = useSelector((state) => state.auth.authUser);


  const dispatch = useDispatch();

  const menus = useSelector((state) => state.menu.menus);
  // console.log("menus", menus);
  
  const isLoadingTableMenu = useSelector(
    (state) => state.menu.isLoadingTableMenu
  );
  const paginationListMenu = useSelector(
    (state) => state.menu.paginationListMenu
  );
  const visibleModalDeleteMenu = useSelector(
    (state) => state.menu.visibleModalDeleteMenu
  );

  const [menu, setMenu] = useState({});
  const [configModal, setConfigModal] = useState({
    title: "Create Food",
    type: "CREATE",
  });
  const [dataFilter, setDataFilter] = useState({
    keySearch: "",
    status: "",
    perPage: 16,
    page: 1,
    order: null,
    column: null,
  });

  useEffect(() => {
    dispatch(getListMenu(dataFilter));
  }, [dataFilter, dispatch]);

  const handleCreate = () => {
    dispatch(setVisibleModalCreateOrUpdateMenu(true));
    setConfigModal({
      title: "Create menu",
      type: "CREATE",
    });
  };

  const handleEdit = (menu) => {
    let menuSelect = _.cloneDeep(menu);
    setMenu(menuSelect);
    dispatch(setVisibleModalCreateOrUpdateMenu(true));
    setConfigModal({
      title: "Update menu",
      type: "UPDATE",
    });
  };

  const handleShowConfirmDelete = (menu) => {
    let menuSelect = _.cloneDeep(menu);
    setMenu(menuSelect);
    dispatch(setVisibleModalDeleteMenu(true));
  };

  const handleConfirmDeleteMenu = () => {
    dispatch(handleDeleteMenu(menu.id));
  };

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
              Total records ({paginationListMenu.totalRecord})
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

          <ListRES 
            dataSource={menus}
            loading={isLoadingTableMenu}
            rowKey={(menu) => menu.id}
            pagination={paginationListMenu}
            onChangeCurrentPage={changeCurrentPage}
            onChange={onChange}
            handleEdit={handleEdit} // Truyền hàm handleEdit
            handleShowConfirmDelete={handleShowConfirmDelete} // Truyền hàm handleShowConfirmDelete
            grid={{
              gutter: 16,
              xs: 3,
              sm: 4,
              md: 4,
              lg: 5,
              xl: 5,
              xxl: 8,
            }}
          />
        </div>

        <CreateOrUpdate menu={menu} configModal={configModal} />

        <ModalConfirm
          isModalOpen={visibleModalDeleteMenu}
          title={`Do you want delete ${menu.name}?`}
          textBtnConfirm="Delete"
          description={`Are you sure you want to delete ${menu.name}? Your action can not be undone.`}
          onClose={() => dispatch(setVisibleModalDeleteMenu(false))}
          onConfirm={() => handleConfirmDeleteMenu()}
        />
      </div>
    </MainLayout>
  );
}

export default Menu;
