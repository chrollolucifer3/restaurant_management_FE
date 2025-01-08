import {
    createSlice
  } from "@reduxjs/toolkit";
  
  const menuSlice = createSlice({
    name: 'menu',
    initialState: {
      menus: [],
      isLoadingTableMenu: false,
      paginationListMenu: {
        currentPage: 1,
        perPage: 16,
        totalPage: 1,
        totalRecord: 0,
      },
      visibleModalCreateOrUpdateMenu: false,
      isLoadingBtnCreateOrUpdateMenu: false,
      visitableModalUpdateStatusMenu: false,
      isLoadingBtnUpdateStatusMenu: false,
      visibleModalDeleteMenu: false,
      isLoadingBtnDeleteMenu: false,
  
      errorCreateOrUpdateMenu: {
        name: '',
        price: '',
        description: '',
        category_id: '',
        unit_id: '',
      },
    },
    reducers: {
      setErrorCreateOrUpdateMenu: (state, action) => ({
        ...state,
        errorCreateOrUpdateMenu: action.payload
      }),
      setVisibleModalCreateOrUpdateMenu: (state, action) => ({
        ...state,
        visibleModalCreateOrUpdateMenu: action.payload
      }),
      setVisibleModalDeleteMenu: (state, action) => ({
        ...state,
        visibleModalDeleteMenu: action.payload
      }),
      setVisibleModalUpdateStatusMenu: (state, action) => ({
        ...state,
        visibleModalUpdateStatusMenu: action.payload
      }),
      getList: (state) => ({
        ...state,
        menus: [],
        isLoadingTableMenu: true
      }),
      getListSuccess: (state, action) => ({
        ...state,
        isLoadingTableMenu: false,
        menus: action.payload.metadata.listFoods,
        paginationListMenu: {
          currentPage: action.payload.metadata.page,
          perPage: action.payload.metadata.limit,
          totalPage: action.payload.metadata.totalPage,
          totalRecord: action.payload.metadata.total,
        },
      }),
      getListFail: (state) => ({
        ...state,
        Menus: [],
        isLoadingTableMenu: false
      }),
      createMenu: (state) => ({
        ...state,
        isLoadingBtnCreateOrUpdateMenu: true
      }),
      createMenuSuccess: (state) => ({
        ...state,
        isLoadingBtnCreateOrUpdateMenu: false
      }),
      createMenuFail: (state) => ({
        ...state,
        isLoadingBtnCreateOrUpdateMenu: false
      }),
      updateMenu: (state) => ({
        ...state,
        isLoadingBtnCreateOrUpdateMenu: true
      }),
      updateMenuSuccess: (state) => ({
        ...state,
        isLoadingBtnCreateOrUpdateMenu: false
      }),
      updateMenuFail: (state) => ({
        ...state,
        isLoadingBtnCreateOrUpdateMenu: false
      }),
      deleteMenu: (state) => ({
        ...state,
        isLoadingBtnDeleteMenu: true
      }),
      deleteMenuSuccess: (state) => ({
        ...state,
        isLoadingBtnDeleteMenu: false
      }),
      deleteMenuFail: (state) => ({
        ...state,
        isLoadingBtnDeleteMenu: false
      }),
    }
  })
  
  export const {
    setErrorCreateOrUpdateMenu,
    setVisibleModalDeleteMenu,
    setVisibleModalCreateOrUpdateMenu,
    setVisibleModalUpdateStatusMenu,
    getList,
    getListSuccess,
    getListFail,
    getAllRole,
    getAllRoleSuccess,
    getAllRoleFail,
    createMenu,
    createMenuSuccess,
    createMenuFail,
    updateMenu,
    updateMenuSuccess,
    updateMenuFail,
    deleteMenu,
    deleteMenuSuccess,
    deleteMenuFail,
  } = menuSlice.actions
  
  export default menuSlice.reducer;