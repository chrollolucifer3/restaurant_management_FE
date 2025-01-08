import {
  createSlice
} from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    value: 'Set value',
    totalOrder: 0,
    bestSeller: [],
    RevenueByTimeRange: [],
    isLoadingTableBestSeller: false,
  },
  reducers: {
    setValue: (state, action) => ({
      ...state,
      value: action.payload
    }),
    getTotalOrder: (state) => ({
      ...state,
      totalOrder: 0
    }),
    getTotalOrderSuccess: (state, action) => ({
      ...state,
      totalOrder: action.payload.metadata.revenue
    }),
    getTotalOrderFail: (state) => ({
      ...state,
      totalOrder: 0
    }),
    getBestSeller: (state) => ({
      ...state,
      bestSeller: [],
      isLoadingTableBestSeller: true
    }),
    getBestSellerSuccess: (state, action) => ({
      ...state,
      bestSeller: action.payload.metadata,
      isLoadingTableBestSeller: false
    }),
    getBestSellerFail: (state) => ({
      ...state,
      bestSeller: [],
      isLoadingTableBestSeller: false
    }),
    getRevenueByTimeRange: (state) => ({
      ...state,
      RevenueByTimeRange: [],
    }),
    getRevenueByTimeRangeSuccess: (state, action) => ({
      ...state,
      RevenueByTimeRange: action.payload.metadata.revenue,
    }),
    getRevenueByTimeRangeFail: (state) => ({
      ...state,
      RevenueByTimeRange: [],
    }),
  }
})

export const {
  setValue,
  getTotalOrder,
  getTotalOrderSuccess,
  getTotalOrderFail,
  getBestSeller, getBestSellerSuccess, getBestSellerFail,
  getRevenueByTimeRange, getRevenueByTimeRangeSuccess, getRevenueByTimeRangeFail
} = homeSlice.actions

export default homeSlice.reducer;