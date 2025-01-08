import callApi from "api/callApi";
import {
    getTotalOrder,
    getTotalOrderSuccess,
    getTotalOrderFail,
    getBestSeller,
    getBestSellerSuccess,
    getBestSellerFail,
    getRevenueByTimeRange,
    getRevenueByTimeRangeSuccess,
    getRevenueByTimeRangeFail


} from "../../states/modules/home";

export const getTotalOder = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `api/v1/statistics/getRevenueCommon`,
        actionTypes: [getTotalOrder, getTotalOrderSuccess, getTotalOrderFail],
        variables: {},
        dispatch,
        getState
    })
}

export const getFoodBestSeller = () => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `api/v1/statistics/statisticFoodBestSeller`,
        actionTypes: [getBestSeller, getBestSellerSuccess, getBestSellerFail],
        variables: {},
        dispatch,
        getState
    })
}

export const getRevenueByTime = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `api/v1/statistics/getRevenueByTimeRange`,
        actionTypes: [getRevenueByTimeRange, getRevenueByTimeRangeSuccess, getRevenueByTimeRangeFail],
        variables: data,
        dispatch,
        getState
    })
}