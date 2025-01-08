import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "bill",
  initialState: {
    bills: [], // Danh sách hóa đơn
    details: "", // Chi tiết hóa đơn
    isLoadingListBill: false,
    paginationListBill: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    visibleModalDetailOrder: false, // Modal chi tiết đơn hàng
    isPaymentSuccess: false, // Trạng thái thanh toán
  },
  reducers: {
    // Lấy danh sách hóa đơn
    getList: (state) => ({
      ...state,
      bills: [],
      isLoadingListBill: true,
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingListBill: false,
      bills: action.payload.metadata.listOrders,
      paginationListBill: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      bills: [],
      isLoadingListBill: false,
    }),

    // Hiển thị/ẩn modal chi tiết đơn hàng
    setVisibleModalDetailOrder: (state, action) => ({
      ...state,
      visibleModalDetailOrder: action.payload,
    }),

    // Lấy chi tiết hóa đơn
    getDetailBill: (state) => ({
      ...state,
      details: "",
    }),
    getDetailBillSuccess: (state, action) => ({
      ...state,
      details: action.payload.metadata,
    }),
    getDetailBillFail: (state) => ({
      ...state,
      details: "",
    }),

    // Thêm reducer mới để reset hóa đơn và trạng thái thanh toán
    setBills: (state, action) => ({
      ...state,
      bills: action.payload,
    }),
    setPaymentSuccess: (state, action) => ({
      ...state,
      isPaymentSuccess: action.payload,
    }),
  },
});

export const {
  getList,
  getListSuccess,
  getListFail,
  setVisibleModalDetailOrder,
  getDetailBill,
  getDetailBillSuccess,
  getDetailBillFail,
  setBills, // Action reset bills
  setPaymentSuccess, // Action reset trạng thái thanh toán
} = billSlice.actions;

export default billSlice.reducer;
