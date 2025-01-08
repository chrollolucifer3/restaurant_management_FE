import {
  createSlice
} from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: 'table',
  initialState: {
    tables: [],
    listFoods: [],
    isLoadingTableTable: false,
    paginationListTable: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    visibleModalCreateOrUpdateBookingTable: false,
    visibleModalShowOrder: false,
    visibleModalShowReceiveTable: false,
    visibleModalCreateOrUpdateTable: false,
    isLoadingBtnCreateOrUpdateTable: false,
    visitableModalUpdateStatusTable: false,
    visibleModalCancelBookingTable: false,
    isLoadingBtnUpdateStatusTable: false,
    visibleModalDeleteTable: false,
    isLoadingBtnDeleteTable: false,
    isLoadingBtnCreateOrUpdateBookingTable: false,
    isLoadingBtnCancelBookingTable: false,
    isLoadingBtnReceiveBookingTable: false,
    isLoadingBtnShowOrder: false,
    isLoadingBtnConfirmOrder: false,
    isLoadingListOrder: false,
    isLoadingBtnUpdateListOrder: false,
    errorCreateOrUpdateTable: {

    },
    errorCreateBookingTable: {
      listTable: '',
      customer_name : '',
      phone_number : '',
      type_booking : '',
      time_reserved : '',
    },
    errorUpdateOrder: {

    },
  },
  reducers: {
    setErrorCreateOrUpdateTable: (state, action) => ({
      ...state,
      errorCreateOrUpdateTable: action.payload
    }),
    setErrorCreateOrUpdateBookingTable: (state, action) => ({
      ...state,
      errorCreateBookingTable: action.payload
    }),
    setVisibleModalCreateOrUpdateTable: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateTable: action.payload
    }),
    setVisibleModalCreateOrUpdateBookingTable: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateBookingTable: action.payload
    }),
    setVisibleModalCancelBookingTable: (state, action) => ({
      ...state,
      visibleModalCancelBookingTable: action.payload
    }),
    setVisibleModalReceiveBookingTable: (state, action) => ({
      ...state,
      visibleModalShowReceiveTable: action.payload
    }),
    setVisibleModalDeleteTable: (state, action) => ({
      ...state,
      visibleModalDeleteTable: action.payload
    }),
    setVisibleModalUpdateStatusTable: (state, action) => ({
      ...state,
      visibleModalUpdateStatusTable: action.payload
    }),
    setVisibleModalShowOrder: (state, action) => ({
      ...state,
      visibleModalShowOrder: action.payload
    }),
    getList: (state) => ({
      ...state,
      tables: [],
      isLoadingTableTable: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableTable: false,
      tables: action.payload.metadata.listTables,
      paginationListTable: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      Tables: [],
      isLoadingTableTable: false
    }),
    createTable: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTable: true
    }),
    createTableSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTable: false
    }),
    createTableFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTable: false
    }),
    updateTable: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTable: true
    }),
    updateTableSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTable: false
    }),
    updateTableFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateTable: false
    }),
    deleteTable: (state) => ({
      ...state,
      isLoadingBtnDeleteTable: true
    }),
    deleteTableSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteTable: false
    }),
    deleteTableFail: (state) => ({
      ...state,
      isLoadingBtnDeleteTable: false
    }),
    createBookingTable: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBookingTable: true
    }),
    createBookingTableSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBookingTable: false
    }),
    createBookingTableFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBookingTable: false
    }),
    updateBookingTable: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBookingTable: true
    }),
    updateBookingTableSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBookingTable: false
    }),
    updateBookingTableFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateBookingTable: false
    }),
    cancelBookingTable: (state) => ({
      ...state,
      isLoadingBtnCancelBookingTable: true
    }),
    cancelBookingTableSuccess: (state) => ({
      ...state,
      isLoadingBtnCancelBookingTable: false
    }),
    cancelBookingTableFail: (state) => ({
      ...state,
      isLoadingBtnCancelBookingTable: false
    }),
    receiveBookingTable: (state) => ({
      ...state,
      isLoadingBtnReceiveBookingTable: true
    }),
    receiveBookingTableSuccess: (state) => ({
      ...state,
      isLoadingBtnReceiveBookingTable: false
    }),
    receiveBookingTableFail: (state) => ({
      ...state,
      isLoadingBtnReceiveBookingTable: false
    }),
    confirmOrder: (state) => ({
      ...state,
      isLoadingBtnConfirmOrder: true
    }),
    confirmOrderSuccess: (state) => ({
      ...state,
      isLoadingBtnConfirmOrder: false
    }),
    confirmOrderFail: (state) => ({
      ...state,
      isLoadingBtnConfirmOrder: false
    }),
    getListOrder: (state) => ({
      ...state,
      listFoods: [],
      isLoadingListOrder: true
    }),
    getListOrderSuccess: (state, action) => {
      const listFoods = action.payload.metadata
        ? action.payload.metadata
            .map((item) => item.listFoods)  // Lấy danh sách listFoods từ tất cả các phần tử
            .flat() // Gộp tất cả các mảng thành một mảng duy nhất
        : [];
    
      // Gộp các phần tử có id trùng nhau và cộng quantity
      const mergedFoods = listFoods.reduce((acc, food) => {
        const existingFood = acc.find(item => item.id === food.id);
        if (existingFood) {
          existingFood.quantity += food.quantity; // Cộng quantity nếu trùng id
        } else {
          acc.push({ ...food }); // Nếu chưa tồn tại, thêm mới
        }
        return acc;
      }, []);
    
      return {
        ...state,
        listFoods: mergedFoods,
        isLoadingListOrder: false,
      };
    },
  
    getListOrderFail: (state) => ({
      ...state,
      listFoods: [],
      isLoadingListOrder: false
    }),
    updateListOrder: (state) => ({  
      ...state,
      isLoadingBtnUpdateListOrder: true
    }),
    updateListOrderSuccess: (state) => ({
      ...state,
      isLoadingBtnUpdateListOrder: false
    }),
    updateListOrderFail: (state) => ({
      ...state,
      isLoadingBtnUpdateListOrder: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateTable,
  setVisibleModalDeleteTable,
  setVisibleModalCreateOrUpdateTable,
  setVisibleModalUpdateStatusTable,
  setVisibleModalCreateOrUpdateBookingTable,
  setErrorCreateOrUpdateBookingTable,
  setVisibleModalCancelBookingTable,
  setVisibleModalReceiveBookingTable,
  getList,
  getListSuccess,
  getListFail,
  getAllRole,
  getAllRoleSuccess,
  getAllRoleFail,
  createTable,
  createTableSuccess,
  createTableFail,
  updateTable,
  updateTableSuccess,
  updateTableFail,
  deleteTable,
  deleteTableSuccess,
  deleteTableFail,
  createBookingTable, createBookingTableSuccess, createBookingTableFail,
  updateBookingTable, updateBookingTableSuccess, updateBookingTableFail,
  cancelBookingTable, cancelBookingTableSuccess, cancelBookingTableFail,
  receiveBookingTable, receiveBookingTableSuccess, receiveBookingTableFail,
  setVisibleModalShowOrder,
  confirmOrder,
  confirmOrderSuccess,
  confirmOrderFail,
  getListOrder, getListOrderSuccess, getListOrderFail,
  updateListOrder, updateListOrderSuccess, updateListOrderFail
} = tableSlice.actions

export default tableSlice.reducer;