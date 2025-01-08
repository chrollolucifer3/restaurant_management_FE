import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: 'discount',
  initialState: {
    discounts: [],
    isLoadingTableDiscount: false,
    paginationListDiscount: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    visibleModalCreateOrUpdateDiscount: false,
    isLoadingBtnCreateOrUpdateDiscount: false,
    visitableModalUpdateStatusDiscount: false,
    isLoadingBtnUpdateStatusDiscount: false,
    visibleModalDeleteDiscount: false,
    isLoadingBtnDeleteDiscount: false,
    
    errorCreateOrUpdateDiscount: {
      code: "",
      description: "",
      discount_type: "",
      discount_amount: "",
      min_order_value: "",
      start_date: null,
      end_date: null,
      is_anniversary: 0,
      is_loyal_customer: 0,
      total_money_spent: "",
    },
  },
  reducers: {
    setErrorCreateOrUpdateDiscount: (state, action) => ({
      ...state,
      errorCreateOrUpdateDiscount: action.payload
    }),
    setVisibleModalCreateOrUpdateDiscount: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateDiscount: action.payload
    }),
    setVisibleModalDeleteDiscount: (state, action) => ({
      ...state,
      visibleModalDeleteDiscount: action.payload
    }),
    setVisibleModalUpdateStatusDiscount: (state, action) => ({
      ...state,
      visibleModalUpdateStatusDiscount: action.payload
    }),
    getList: (state) => ({
      ...state,
      discounts: [],
      isLoadingTableDiscount: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableDiscount: false,
      discounts: action.payload.metadata.listDiscounts,
      paginationListDiscount: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      discounts: [],
      isLoadingTableDiscount: false
    }),
    createDiscount: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateDiscount: true
    }),
    createDiscountSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateDiscount: false
    }),
    createDiscountFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateDiscount: false
    }),
    updateDiscount: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateDiscount: true
    }),
    updateDiscountSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateDiscount: false
    }),
    updateDiscountFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateDiscount: false
    }),
    deleteDiscount: (state) => ({
      ...state,
      isLoadingBtnDeleteDiscount: true
    }),
    deleteDiscountSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteDiscount: false
    }),
    deleteDiscountFail: (state) => ({
      ...state,
      isLoadingBtnDeleteDiscount: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateDiscount,
  setVisibleModalDeleteDiscount,
  setVisibleModalCreateOrUpdateDiscount,
  setVisibleModalUpdateStatusDiscount,
  getList, getListSuccess, getListFail,
  createDiscount, createDiscountSuccess, createDiscountFail,
  updateDiscount, updateDiscountSuccess, updateDiscountFail,
  deleteDiscount, deleteDiscountSuccess, deleteDiscountFail,
} = discountSlice.actions

export default discountSlice.reducer;
