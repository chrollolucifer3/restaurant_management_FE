import callApi from "../callApi";
import {
    getList,
    getListSuccess,
    getListFail,
    getDetailBill,
    getDetailBillSuccess,
    getDetailBillFail

} from "../../states/modules/bill";


export const getListBill = (dataFilter = {
    perPage: 10,
    page: 1
}) => async (dispatch, getState) => {

    let path = `api/v1/orders?limit=${dataFilter.perPage}&page=${dataFilter.page}`;

    if (dataFilter.keySearch) {
        path += `&customerName=${dataFilter.keySearch}`;
    }

    if (dataFilter.order && dataFilter.column) {
        path += `&orderBy=${dataFilter.order}&sortBy=${dataFilter.column}`;
      }

    return callApi({
        method: 'get',
        apiPath: path,
        actionTypes: [getList, getListSuccess, getListFail],
        variables: {},
        dispatch,
        getState
    })
}

export const getDetailBillById = (id) => async (dispatch, getState) => {
    return callApi({
        method: 'get',
        apiPath: `api/v1/orders/${id}`,
        actionTypes: [getDetailBill, getDetailBillSuccess, getDetailBillFail],
        variables: {},
        dispatch,
        getState
    })
}