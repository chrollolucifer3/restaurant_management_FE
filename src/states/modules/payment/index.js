import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    payments: [], // Danh sách các thanh toán
    bills: [], // Thông tin hóa đơn
    isLoadingTablePayment: false, // Trạng thái loading cho bảng thanh toán
    isLoadingBtnPayment: false, // Trạng thái loading cho nút thanh toán
    visibleModalShowListFood: false, // Trạng thái hiển thị modal danh sách món ăn
    isPaymentSuccess: false, // Trạng thái thanh toán thành công
    selectedTableIds: [], // Danh sách các ID bàn đã được chọn cho thanh toán
  },
  reducers: {
    setVisibleModalShowListFood: (state, action) => {
      state.visibleModalShowListFood = action.payload;
    },
    getList: (state) => {
      state.payments = [];
      state.isLoadingTablePayment = true;
    },
    getListSuccess: (state, action) => {
      state.isLoadingTablePayment = false;
      state.payments = action.payload.metadata.listCustomize || [];
    },
    getListFail: (state) => {
      state.payments = [];
      state.isLoadingTablePayment = false;
    },
    confirmPayment: (state) => {
      state.bills = [];
      state.isLoadingBtnPayment = true;
      state.isPaymentSuccess = false;
    },
    confirmPaymentSuccess: (state, action) => {
      state.isLoadingBtnPayment = false;
      state.bills = action.payload.metadata || [];
      state.isPaymentSuccess = true;
    },
    confirmPaymentFail: (state) => {
      state.bills = [];
      state.isLoadingBtnPayment = false;
      state.isPaymentSuccess = false;
    },
    setSelectedTableIds: (state, action) => {
      state.selectedTableIds = action.payload;
    },
    setPaymentSuccess: (state, action) => {
      state.isPaymentSuccess = action.payload;
    },
    setBills: (state, action) => {
      state.bills = action.payload; // Reset bills về giá trị mới
    },
    resetPaymentState: (state) => {
      // Reset lại toàn bộ trạng thái thanh toán
      state.payments = [];
      state.bills = [];
      state.selectedTableIds = [];
      state.isLoadingTablePayment = false;
      state.isLoadingBtnPayment = false;
      state.visibleModalShowListFood = false;
      state.isPaymentSuccess = false;
    },
  },
});

export const {
  getList,
  getListSuccess,
  getListFail,
  setVisibleModalShowListFood,
  confirmPayment,
  confirmPaymentSuccess,
  confirmPaymentFail,
  setSelectedTableIds,
  resetPaymentState,
  setPaymentSuccess,
  setBills,
} = paymentSlice.actions;

export default paymentSlice.reducer;
